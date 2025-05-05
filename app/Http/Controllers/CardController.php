<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\User;
use Illuminate\Http\Request;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function checkINO($hexKey)
    {
        $card = Card::where('key', $hexKey)->first();
        //^Solo me interesa el primero, dado que puede haber varios
        if ($card) {
            $user = User::where('id', $card->user_owner_id)->first();
            // return ["card" => $card, "user" => $user];
            if ($user) {
                if ($user->role == "admin") {
                    return ["success" => true, "adminPermit" => true];
                }
                return app('App\Http\Controllers\TimeLogController')->registerTimeINO($user);
            } else {
                return ["success" => false, "error" => "No se reconoce la tarjeta"];
            }
        } else {
            return ["success" => false, "error" => "No se reconoce la tarjeta"];
        }
    }
    public function registerINO($hexKey)
    { //Jungla de if's
        $card = Card::where('key', $hexKey)->first();
        if ($card) {
            if ($card->user_owner_id != null) {
                $user = User::where('id', $card->user_owner_id)->first();

                if ($user->role == "admin") {
                    return ["success" => true, "adminPermit" => true];
                } else {
                    return ["success" => false, "error" => "Tarjeta ya registrada", "adminPermit" => false];
                }
            }
            else{
                return ["success" => false, "error" => "Tarjeta ya registrada, pero sin usuario", "adminPermit" => false];
            }
        } else {
            $newCard = Card::create([
                'user_owner_id' => null,
                'key' => $hexKey
            ]);

            return response()->json([
                'success' => true,
                'card' => $newCard
            ]);
        }
    }
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
    public function show(Card $card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }
}
