<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;

class Department
{
    protected $table = '';

    function __construct($tbl)
    {
        $this->table = $tbl;
    }

    function save($req)
    {
        $rules = [
            'name' => 'required|string|min:3|max:255'
        ];

        $validator = Validator::make($req->all(), $rules);

        if($validator->fails())
        {
            return ("Failed");
        }
        else
        {
            $data = $req->input();
            try
            {
                $data['name']->save();
                return ("Insert successfully");
            }
            catch(Exception $e)
            {
                return ("operation failed");
            }
        }
    }
}