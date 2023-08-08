<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UniformTeacher;

class UniformTeacherController extends Controller
{
    function save(Request $req){
        $uniformTeacher = new UniformTeacher();
        return $uniformTeacher->save($req->all());
    }

    function list(){
        $uniformTeacher = new UniformTeacher();
        return $uniformTeacher->list();
    }

    function details(Request $req){
        $uniformTeacher = new UniformTeacher();
        return $uniformTeacher->details($req->id);
    }

    function delete(Request $req){
        $uniformTeacher = new UniformTeacher();
        return $uniformTeacher->delete($req->id);
    }
}