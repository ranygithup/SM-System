<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class Level
{
    protected $tbl = 'level';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:5|max:150',
            'program_id' => 'required|numeric',
            'department_id' => 'required|numeric'
        ];

        $validator = Validator::make($data,$rules);

        if($validator->fails()){
            return response()->json([
                'status' => 200,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            try{
                if($data['id'] > 0){
                    DB::table($this->tbl)->where('id',$data['id'])->update([
                        'name' => $data['name'],
                        'program_id' => $data['program_id'],
                        'department_id' => $data['department_id']
                    ]);
                }
                else{
                    DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'program_id' => $data['program_id'],
                        'department_id' => $data['department_id']
                    ]);
                }

                return response()->json([
                    'status' => 200,
                    'data' => 'Level Added'
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
        $rows = DB::table($this->tbl.' as l')->join('main_program as m','m.id','=','l.program_id')->join('department as d','d.id','=','l.department_id')->selectRaw('l.id,l.name,m.name as program,d.name as department')->get();

        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,program_id,department_id')->first();

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