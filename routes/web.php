<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Session;

Route::get('/',function(){
    Session::remove('user');
    return view('index');
})->name('login');

Route::get('/school',function(){
    if(Session::has('user')){
        return view('master');
    }
    else{
        Session::remove('user');
        return redirect('/');
    }
})->name('school');

Route::post('/processLogin',[UserController::class,'dashboard'])->name('processLogin');