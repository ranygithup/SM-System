<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;

class LevelController extends Controller
{
    function save(Request $req){
        $level = new Level();
        return $level->save($req->all());
    }

    function list(){
        $level = new Level();
        return $level->list();
    }

    function details(Request $req){
        $level = new Level();
        return $level->details($req->id);
    }

    function delete(Request $req){
        $level = new Level();
        return $level->delete($req->id);
    }
}