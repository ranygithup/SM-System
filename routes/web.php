<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Session;

Route::get('/', function(){
    return view('index');
});

Route::get('/school',function(){
    if(Session::has('user')){
        return view('master');
    }
    else{
        return redirect('/');
    }
})->name('school');

Route::post('/processLogin',[UserController::class,'dashboard'])->name('processLogin');