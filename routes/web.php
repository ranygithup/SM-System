<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function(){
    return view('index');
});

Route::get('/school',function(){
    return view('master');
})->name('school');

Route::post('/processLogin',[UserController::class,'dashboard'])->name('processLogin');