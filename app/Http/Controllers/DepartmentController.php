<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\Department;

class DepartmentController extends Controller
{
    function save(Request $req)
    {
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:255',
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
            try
            {
                $department = new Department();
                $department->name = $data['name'];
                $department->save();
                return response()->json([
                    'status' => 200,
                    'data' => "Department Added"
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

    function list(){
        $rows = DB::select('SELECT * FROM department');
        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }

    function delete(Request $req){
        $row = DB::delete('DELETE FROM department WHERE id = ?',[$req->id]);
        if($row){
            return response()->json([
                'status' => 200,
                'message' => 'Deleted Successfully!'
            ]);
        }
    }
}