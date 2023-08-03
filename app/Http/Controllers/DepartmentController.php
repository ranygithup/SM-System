<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    function save(Request $req)
    {
        $d = new Department();
        return $d->save($req->all());
    }

    function list(){
        $d = new Department();
        return $d->list();
    }

    function delete(Request $req){
        $d = new Department();
        return $d->delete($req->id);
    }

    function details(Request $req){
        $d = new Department();
        return $d->details($req->id);
    }
}