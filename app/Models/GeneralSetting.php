<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;

class GeneralSetting
{
    function getLevelByDepartment($req){
        $id = $req->department_id;
        $rows = DB::table('level')->where('department_id',$id)->selectRaw('id,name')->get();
        return JDV::result($rows);
    }
}