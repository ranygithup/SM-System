<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UniformStudent;

class UniformStudentController extends Controller
{
    function save(Request $req){
        $uniformstudent = new UniformStudent();
        return $uniformstudent->save($req->all());
    }

    function list(){
        $uniformstudent = new UniformStudent();
        return $uniformstudent->list();
    }

    function details(Request $req){
        $uniformstudent = new UniformStudent();
        return $uniformstudent->details($req->id);
    }

    function delete(Request $req){
        $uniformstudent = new UniformStudent();
        return $uniformstudent->delete($req->id);
    }
}