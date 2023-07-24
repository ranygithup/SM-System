<?php

namespace App\Http\Controllers;

use App\Models\MainProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class MainProgramController extends Controller
{
    function save(Request $req){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:255',
            'department_id' => 'required|numeric',
            'created_at' => 'string',
            'updated_at' => 'string'
        ];

        $validator = Validator::make($req->all(), $rules);

        if($validator->fails())
        {
            return response()->json([
                'status' => 404,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            $data = $req->input();

            if($data['id'] > 0){
                $id = $data['id'];
                $name = $data['name'];
                $department_id = $data['department_id'];

                $row = DB::update('UPDATE main_program SET `name` = ?,department_id = ? WHERE id = ?',[$name, $department_id, $id]);

                if($row){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Updated Successfully!'
                    ]);
                }
            }
            else{
                try
                {
                    $program = new MainProgram();
                    $program->name = $data['name'];
                    $program->department_id = $data['department_id'];
                    $program->save();

                    return response()->json([
                        'status' => 200,
                        'data' => "Main Program Added"
                    ]);
                }
                catch(Exception $e)
                {
                    return response()->json([
                        'status' => 500,
                        'error_message' => 'Something went wrong'
                    ]);
                }
            }
        }
    }

    function list(){
        $rows = DB::table('main_program as m')->join('department as d','m.department_id','=','d.id')->selectRaw('m.id,m.name,d.name as department,m.created_at')->get();
        if($rows){
            return response()->json([
                'status' => 200,
                'data' => $rows
            ]);
        }
    }

    function details(Request $req){
        $id = $req->id;
        $row = DB::table('main_program')->where('id',$id)->selectRaw('id,name,department_id,created_at')->get()->first();

        if($row){
            return response()->json([
                'status' => 200,
                'data' => $row
            ]);
        }
    }

    function delete(Request $req){
        $id = $req->id;

        if($id){
            DB::table('main_program')->where('id',$id)->delete();
            return response()->json([
                'status' => 200,
                'data' => 'Delete Successfully!'
            ]);
        }
    }
}