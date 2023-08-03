<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class MainProgram
{
    protected $tbl = 'main_program';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:255',
            'department_id' => 'required|numeric'
        ];

        $validator = Validator::make($data, $rules);

        if($validator->fails())
        {
            return response()->json([
                'status' => 404,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            try{
                if($data['id'] > 0){
                    DB::table($this->tbl)->where('id',$data['id'])->update([
                        'name' => $data['name'],
                        'department_id' => $data['department_id']
                    ]);
                }
                else{
                    DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'department_id' => $data['department_id']
                    ]);
                }

                return response()->json([
                    'status' => 200,
                    'data' => "Main Program Added"
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
        $rows = DB::table($this->tbl.' as m')->join('department as d','m.department_id','=','d.id')->selectRaw('m.id,m.name,d.name as department,m.created_at')->get();

        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,department_id,created_at')->get()->first();

        return response()->json([
            'status' => 200,
            'data' => $row
        ]);
    }

    function delete($id){
        DB::table($this->tbl)->where('id',$id)->delete();
        
        return response()->json([
            'status' => 200,
            'data' => 'Delete Successfully!'
        ]);
    }
}