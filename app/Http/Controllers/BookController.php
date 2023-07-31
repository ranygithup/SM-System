<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\SaveImage;

class BookController extends Controller
{
    function save(Request $req){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:4|max:30',
            'description' => 'string|max:250',
            'program_id' => 'required|numeric',
            'department_id' => 'required|numeric',
            'photo' => 'string'
        ];

        $validator = Validator::make($req->all(),$rules);
        if($validator->fails()){
            return response()->json([
                'status' => 200,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            $data = $req->input();
        }
    }
}