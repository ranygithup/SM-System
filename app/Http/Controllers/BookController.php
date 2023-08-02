<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    function save(Request $req){
        return Book::save($req->all());
    }

    function list(){
        return Book::list();
    }
}