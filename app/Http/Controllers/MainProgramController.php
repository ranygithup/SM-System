<?php

namespace App\Http\Controllers;

use App\Models\MainProgram;
use Illuminate\Http\Request;

class MainProgramController extends Controller
{
    function __construct(){
        $this->middleware('auth:api');
    }
    
    function save(Request $req){
        $m = new MainProgram();
        return $m->save($req->all());
    }

    function list(){
        $m = new MainProgram();
        return $m->list();
    }

    function details(Request $req){
        $m = new MainProgram();
        return $m->details($req->id);
    }

    function delete(Request $req){
        $m = new MainProgram();
        return $m->delete($req->id);
    }
}