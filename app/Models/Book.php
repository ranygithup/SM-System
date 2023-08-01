<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'book';
    protected $fillable = [
        'name',
        'description',
        'program_id',
        'department_id',
        'photo_file_name'
    ];
}