<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Certificate;

class CertificateController extends Controller
{
    function save(Request $req){
        $certificate = new Certificate();
        return $certificate->save($req->all());
    }

    function list(){
        $certificate = new Certificate();
        return $certificate->list();
    }
}