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

    function details(Request $req){
        $certificate = new Certificate();
        return $certificate->details($req->id);
    }

    function delete(Request $req){
        $certificate = new Certificate();
        return $certificate->delete($req->id);
    }
}