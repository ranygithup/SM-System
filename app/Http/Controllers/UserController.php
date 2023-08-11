<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLogin;

class UserController extends Controller
{
    function registration(Request $req){
        $user = new UserLogin();
        return $user->registration($req->all());
    }

    function dashboard(){
        $user = new UserLogin();
        return $user->dashboard();
    }
}