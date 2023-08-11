<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function(){
    return view('index');
});

Route::get('/school',[UserController::class,'dashboard']);
Route::post('/processLogin',[UserController::class,'registration'])->name('login');