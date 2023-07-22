<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    protected $table = 'department';

    function save(Request $req){
        $row = new Department($this->table);
        return $row->save($req);
    }
}