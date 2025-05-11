<?php

namespace App\Http\Controllers;

use App\Http\Resources\TimeLogResource;
use App\Models\TimeLog;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class TimeLogController extends Controller
{

    public function registerTimeINO(User $user)
    {
        $now = Carbon::now()->setMicrosecond(0);
        $lastTimeLog = TimeLog::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->first();
        if ($lastTimeLog != null && $lastTimeLog->entry_time != null && $lastTimeLog->exit_time == null) {
            $lastTimeLog->exit_time = $now;
            $lastTimeLog->work_type = 'at_office';
            $lastTimeLog->save();
        } else {
            TimeLog::create([
                'user_id' => $user->id,
                'entry_time' => $now,
                'work_type' => 'at_office',
                'altered' => 0
            ]);
        }
        $lastTimeLog = TimeLog::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->first();
        $data = [
            "success" => true,
            "timeLog" => $lastTimeLog,
            "user" => $user
        ];
        $json = json_encode($data);
        header('Content-Type: application/json');
        header('Content-Length: ' . strlen($json));
        header('Connection: close');

        echo $json;
        flush();
        exit;
    }
    /**
     * Display a listing of the resource.
     */


    //  public function demonstration()
    // {
    //     $timeLog = TimeLog::with('user')->get();
    //     //^ Esto devuelve el usuario completo también

    //     return response()->json($timeLog);
    // }
    public function index()
    //Para permitir la vista distinta de admin y users, esta programado de forma que se cargan todos los registros pero se muestran solo los que tienen el user id==card[user id] por asi decirlo, si es admin, se desactiva la condición
    {
        $user = Auth::user();
        $success = session('success');
        if ((!$lastTimeLog = session('lastTimeLog')) && ($success == null)) {
            $lastTimeLog = TimeLog::where('user_id', $user->id)
                ->orderBy('id', 'desc')
                ->first();
            $success = " ";
        }


        $query = TimeLog::query();

        match ($user->role) {
            "user" => $query->where("user_id", "like", $user->id),
            default => ""
        };

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");
        //^Para el orden de registros


        if (request("entry_time")) {
            $query->whereDate("entry_time", request("entry_time"));
        }
        if (request("exit_time")) {
            $query->whereDate("exit_time", request("exit_time"));
        }
        if (request("altered")) {
            $query->where("altered", request("altered"));
        }
        if (request("id")) {
            $query->where("id", request("id"));
        }
        if (request("work_type")) {
            $query->where("work_type", request("work_type"));
        }

        if (request('user_id')) {
            $query->whereHas('user', function ($q): void {
                $q->where('name', 'like',  '%' . request('user_id') . '%');
            });
        }

        $timeLogs = $query->with('user')->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1); // Devuelve todos los registros
        return inertia('TimeLog/Index', [
            'timeLogs' => $timeLogs,
            'queryParams' => request()->query() ?: null,
            'success' => $success,
            'lastTimeLog' => $lastTimeLog,
            // 'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    //Similar al de arduino solo que para web
    public function store(User $user) {}

    /**
     * Store a newly created resource in storage.
     */

    public function create()
    {
        $user = Auth::user();
        $now = Carbon::now()->setMicrosecond(0);

        $lastTimeLog = TimeLog::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->first();

        if ($lastTimeLog && $lastTimeLog->entry_time && !$lastTimeLog->exit_time) {
            $lastTimeLog->exit_time = $now;
            $lastTimeLog->work_type = 'home_office';
            $lastTimeLog->save();
            $success = "Registro guardado con éxito bajo el id: " . $lastTimeLog->id;
        } else {
            $lastTimeLog = TimeLog::create([
                'user_id' => $user->id,
                'entry_time' => $now,
                'work_type' => 'home_office',
                'altered' => 0
            ]);
            $success = "Registro comenzado con éxito";
        }

        $queryParams = request()->query();

        $lastTimeLog = TimeLog::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->first();

        // return Inertia::render('TimeLog/Index', [ //TODO: Inertia() usar
        //     'lastTimeLog' => $lastTimeLog,
        //     'success' => $success,
        //     'timeLogs' => $timeLogs,
        //     'queryParams' => $queryParams
        // ]);
        return redirect()->route('timeLog.index')
            ->with(compact('success'))
            ->with(compact('lastTimeLog'));
    }




    /**
     * Display the specified resource.
     */
    public function show(TimeLog $timeLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TimeLog $timeLog)
    {
        return inertia("TimeLog/Edit", [
            'timeLog' => new TimeLogResource($timeLog)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TimeLog $timeLog)
    {
        $data = $request->validate([
            // Add your validation rules here
            'entry_time' => 'required|date',
            'exit_time' => 'nullable|date|after_or_equal:entry_time',

        ]);
        $data['updated_by'] = Auth::id();
        $data['altered'] = 1;

        $timeLog->update($data);

        return to_route('timeLog.index')
            ->with('success', "El registro de id:" . $timeLog->id . " ha sido modificado con éxito");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeLog $timeLog)
    {
        $id = $timeLog->id;
        $timeLog->delete();
        return to_route('timeLog.index')
            ->with('success', value: "El registro de id: " . $id . " ha sido eliminado exitosamente ");
    }
}
