<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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

            if($data['id'] > 0){
                $id = $data['id'];
                $name = $data['name'];
                $program_id = $data['program_id'];
                $department_id = $data['department_id'];
                $row = DB::update('UPDATE book SET `name`=?,program_id=?,department_id=? WHERE id=?',[$name,$program_id,$department_id,$id]);
            }
            else{}
        }
    }
}