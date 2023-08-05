<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Services;

class ServicesController extends Controller
{
    function save(Request $req){
        $service = new Services();
        return $service->save($req->all());
    }

    function list(){
        $service = new Services();
        return $service->list();
    }

    function details(Request $req){
        $service = new Services();
        return $service->details($req->id);
    }

    function delete(Request $req){
        $service = new Services();
        return $service->delete($req->id);
    }
}