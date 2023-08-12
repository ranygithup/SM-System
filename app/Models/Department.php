<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\JDV;

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
      return JDV::error(400,$validator->messages());
    }
    else{
      try{
        if($data['id'] > 0){
          $row = DB::table($this->tbl)->where('id',$data['id'])->update([
            'name' => $data['name']
          ]);

          return JDV::depend($row,'Department Added!');
        }
        else{
          $row = DB::table($this->tbl)->insert([
            'name' => $data['name']
          ]);
          
          return JDV::depend($row,'Department Updated!');
        }
      }
      catch(Exception $e){
        return JDV::error(500,'Something went wrong!');
      }
    }
  }

  function list(){
    $rows = DB::table($this->tbl)->selectRaw('id,name,created_at')->get();
    return JDV::result($rows);
  }

  function details($id){
    $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name')->first();
    return JDV::result($row);
  }

  function delete($id){
    $row = DB::table($this->tbl)->where('id',$id)->delete();
    return JDV::depend($row,'Department Deleted Successfully!');
  }
}