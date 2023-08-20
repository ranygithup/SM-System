<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeneralSettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\MainProgramController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\UniformStudentController;
use App\Http\Controllers\UniformTeacherController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);

Route::prefix('options')->group(function(){
    Route::post('/level',[GeneralSettingController::class,'getLevelByDepartment']);
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

Route::prefix('service')->group(function(){
    Route::post('/save',[ServicesController::class,'save']);
    Route::post('/list',[ServicesController::class,'list']);
    Route::post('/details',[ServicesController::class,'details']);
    Route::post('/delete',[ServicesController::class,'delete']);
});

Route::prefix('certificate')->group(function(){
    Route::post('/save',[CertificateController::class,'save']);
    Route::post('/list',[CertificateController::class,'list']);
    Route::post('/details',[CertificateController::class,'details']);
    Route::post('/delete',[CertificateController::class,'delete']);
});

Route::prefix('uniform-student')->group(function(){
    Route::post('/save',[UniformStudentController::class,'save']);
    Route::post('/list',[UniformStudentController::class,'list']);
    Route::post('/details',[UniformStudentController::class,'details']);
    Route::post('/delete',[UniformStudentController::class,'delete']);
});

Route::prefix('uniform-teacher')->group(function(){
    Route::post('/save',[UniformTeacherController::class,'save']);
    Route::post('/list',[UniformTeacherController::class,'list']);
    Route::post('/details',[UniformTeacherController::class,'details']);
    Route::post('/delete',[UniformTeacherController::class,'delete']);
});