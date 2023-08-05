<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class Services
{
    protected $tbl = 'service';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:50'
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
                        'name' => $data['name']
                    ]);
                }
                else{
                    DB::table($this->tbl)->insert([
                        'name' => $data['name']
                    ]);
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Service Added'
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
        $rows = DB::table($this->tbl)->selectRaw('id,name,created_at')->get();

        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name')->first();

        return response()->json([
            'status' => 200,
            'data' => $row
        ]);
    }

    function delete($id){
        DB::table($this->tbl)->where('id',$id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Deleted Successfully!'
        ]);
    }
}