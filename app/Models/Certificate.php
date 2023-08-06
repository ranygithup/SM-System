<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\DB;

class Certificate
{
    protected $tbl = 'certificate';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:150',
            'description' => 'required|string|min:3|max:250'
        ];

        $validate = Validator::make($data,$rules);
        if($validate->fails()){
            return response()->json([
                'status' => 200,
                'error_message' => $validate->messages()
            ]);
        }
        else{
            try{
                if($data['id'] > 0){
                    DB::table($this->tbl)->update([
                        'name' => $data['name'],
                        'description' => $data['description']
                    ]);
                }
                else{
                    DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'description' => $data['description']
                    ]);
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Certificate Added'
                ]);
            }
            catch(Exception $e){
                return response()->json([
                    'status' => 500,
                    'error_message' => 'Something went wrong'
                ]);
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl)->selectRaw('id,name,description,created_at')->get();
        
        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }
}