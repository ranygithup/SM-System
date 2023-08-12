<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\JDV;

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

        if($validator->fails()){
            return JDV::error(404,$validator->messages());
        }
        else{
            try{
                if($data['id'] > 0){
                    $row = DB::table($this->tbl)->where('id',$data['id'])->update([
                        'name' => $data['name'],
                        'department_id' => $data['department_id']
                    ]);

                    return JDV::depend($row,'Main Program Updated!');
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'department_id' => $data['department_id']
                    ]);

                    return JDV::depend($row,'Main Program Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong!');
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl.' as m')->join('department as d','m.department_id','=','d.id')->selectRaw('m.id,m.name,d.name as department,m.created_at')->get();

        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,department_id,created_at')->first();

        return JDV::result($row);
    }

    function delete($id){
        $row = DB::table($this->tbl)->where('id',$id)->delete();
        
        return JDV::depend($row,'Main Program Deleted Successfully!');
    }
}