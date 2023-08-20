<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GeneralSetting;

class GeneralSettingController extends Controller
{
    function __construct(){
        $this->middleware('auth:api');
    }
    
    function getLevelByDepartment(Request $req){
        $level = new GeneralSetting();
        return $level->getLevelByDepartment($req);
    }
}