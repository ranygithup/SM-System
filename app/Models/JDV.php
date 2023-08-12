<?php

namespace App\Models;

class JDV
{
    static function result($data){
        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    static function depend($row,$text){
        if($row){
            return response()->json([
                'status' => 200,
                'message' => $text
            ]);
        }
    }

    static function error($status,$error){
        return response()->json([
            'status' => $status,
            'error_message' => $error
        ]);
    }
}