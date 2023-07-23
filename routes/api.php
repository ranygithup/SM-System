<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartmentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('department')->group(function(){
    Route::post('/save',[DepartmentController::class,'save']);
    Route::get('/list',[DepartmentController::class,'list']);
    Route::post('/delete',[DepartmentController::class,'delete']);
    Route::post('/details',[DepartmentController::class,'details']);
});