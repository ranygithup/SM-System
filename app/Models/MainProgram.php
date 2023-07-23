<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MainProgram extends Model
{
    protected $table = 'main_program';
    protected $fillable = [
        'name',
        'department_id'
    ];
}