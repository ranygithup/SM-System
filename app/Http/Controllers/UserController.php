<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserLogin;

class UserController extends Controller
{
    function __construct(){
        $this->middleware('auth:api', [
            'except' => ['login','register','dashboard']
        ]);
    }

    function login(Request $req){
        $user = new UserLogin();
        return $user->login($req);
    }

    function dashboard(Request $req){
        $user = new UserLogin();
        return $user->dashboard($req);
    }
}