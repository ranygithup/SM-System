<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\JDV;

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
            return JDV::error(404,$validate->messages());
        }
        else{
            try{
                if($data['id'] > 0){
                    $row = DB::table($this->tbl)->update([
                        'name' => $data['name']
                    ]);

                    return JDV::depend($row,'Service Updated!');
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'name' => $data['name']
                    ]);

                    return JDV::depend($row,'Service Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong');
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
        return JDV::depend($row,'Service Deleted Successfully!');
    }
}