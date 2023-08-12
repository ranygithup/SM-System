<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\JDV;

class Level
{
    protected $tbl = 'level';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:1|max:150',
            'program_id' => 'required|numeric',
            'department_id' => 'required|numeric'
        ];

        $validator = Validator::make($data,$rules);

        if($validator->fails()){
            return JDV::error(404,$validator->messages());
        }
        else{
            try{
                if($data['id'] > 0){
                    $row = DB::table($this->tbl)->where('id',$data['id'])->update([
                        'name' => $data['name'],
                        'program_id' => $data['program_id'],
                        'department_id' => $data['department_id']
                    ]);

                    return JDV::depend($row,'Level Updated!');
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'program_id' => $data['program_id'],
                        'department_id' => $data['department_id']
                    ]);

                    return JDV::depend($row,'Level Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong!');
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl.' as l')->join('main_program as m','m.id','=','l.program_id')->join('department as d','d.id','=','l.department_id')->selectRaw('l.id,l.name,m.name as program,d.name as department')->get();

        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,program_id,department_id')->first();

        return JDV::result($row);
    }

    function delete($id){
        $row = DB::table($this->tbl)->where('id',$id)->delete();
        return JDV::depend($row,'Level Deleted Successfully!');
    }
}