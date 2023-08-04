<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class Department
{
  protected $tbl = 'department';
  
  function save($data){
    $rules = [
      'id' => 'numeric',
      'name' => 'required|string|min:3|max:255'
    ];

    $validator = Validator::make($data, $rules);

    if($validator->fails()){
      return response()->json([
        'status' => 404,
        'error_message' => $validator->messages()
      ]);
    }
    else{
      try{
        if($data['id'] > 0){
          DB::table($this->tbl)->where('id',$data['id'])->update([
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
          'data' => 'Department Added'
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