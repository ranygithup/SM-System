<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    function __construct(){
        $this->middleware('auth:api');
    }

    function save(Request $req){
        $b = new Book();
        return $b->save($req->all());
    }

    function list(){
        $b = new Book();
        return $b->list();
    }

    function details(Request $req){
        $b = new Book();
        return $b->details($req->id);
    }

    function delete(Request $req){
        $b = new Book();
        return $b->delete($req->id);
    }

    function getOptions(){
        $b = new Book();
        return $b->getOptions();
    }
}