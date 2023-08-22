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
                        'department_id' => $data['department_id']
                    ]);

                    return JDV::depend($row,'Level Updated!');
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'name' => $data['name'],
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
        $rows = DB::table($this->tbl.' as l')->join('department as d','d.id','=','l.department_id')->selectRaw('l.id,l.name,d.name as department,l.updated_at')->get();
        foreach($rows as $row){
            $row->updated_at = explode(' ',$row->updated_at)[0];
        }
        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,department_id')->first();
        return JDV::result($row);
    }

    function delete($id){
        $row = DB::table($this->tbl)->where('id',$id)->delete();
        return JDV::depend($row,'Level Deleted Successfully!');
    }
}