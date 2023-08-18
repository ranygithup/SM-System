<?php

namespace App\Models;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class UserLogin{
    function login($req){
        $req->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $req->only('name','password');

        $token = Auth::attempt($credentials);
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ],401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    function register($req){
        $req->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password)
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 200,
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'access_token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    function logout(){
        Auth::logout();
        return response()->json([
            'status' => 200,
            'message' => 'Successfully logged out',
        ]);
    }

    function refresh(){
        return response()->json([
            'status' => 200,
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer'
            ]
        ]);
    }

    function dashboard($req){
        $req->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);
        $credentials = $req->only('name','password');

        $token = Auth::attempt($credentials);
        if(!$token){
            if(Session::has('_token')){
                Session::remove('_token');
            }
            return redirect('/');
        }

        $user = Auth::user();
        $req->session()->put([
            'user' => $user,
            '_token' => $token
        ]);
        return redirect()->route('school');
    }
}