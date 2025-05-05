<?php

namespace App\Http\Controllers;

use App\Models\TimeLog;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TimeLog $timeLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeLog $timeLog)
    {
        //
    }
}
