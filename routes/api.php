<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\MainProgramController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LevelController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('department')->group(function(){
    Route::post('/save',[DepartmentController::class,'save']);
    Route::post('/list',[DepartmentController::class,'list']);
    Route::post('/delete',[DepartmentController::class,'delete']);
    Route::post('/details',[DepartmentController::class,'details']);
});

Route::prefix('main-program')->group(function(){
    Route::post('/save',[MainProgramController::class,'save']);
    Route::post('/list',[MainProgramController::class,'list']);
    Route::post('/details',[MainProgramController::class,'details']);
    Route::post('/delete',[MainProgramController::class,'delete']);
});

Route::prefix('book')->group(function(){
    Route::post('/save',[BookController::class,'save']);
    Route::post('/list',[BookController::class,'list']);
    Route::post('/details',[BookController::class,'details']);
    Route::post('/delete',[BookController::class,'delete']);
    Route::post('/get-options',[BookController::class,'getOptions']);
});

Route::prefix('level')->group(function(){
    Route::post('/save',[LevelController::class,'save']);
    Route::post('/list',[LevelController::class,'list']);
    Route::post('/details',[LevelController::class,'details']);
    Route::post('/delete',[LevelController::class,'delete']);
});