<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class Book{
    protected $tbl = 'book';
    
    static function save($data){
        $rules = [];

        $validator = Validator::make($data,$rules);
        if($validator->fails()){
            return response()->json([
                'status' => 200,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            try{
                if($data['id'] > 0){
                    DB::update('UPDATE book SET ');
                }
                else{
                    $name = $data['name'];
                    $description = $data['description'];
                    $program_id = $data['program_id'];
                    $department_id = $data['department_id'];
                    $photo_file_name = SaveImage::saveImage('images',$data['photo']);
                    unset($data['photo']);
                    DB::insert('INSERT INTO $this->tbl (`name`)');
                }
                
                return response()->json([
                    'status' => 200,
                    'data' => 'Book Added'
                ]);
            }
            catch(Exception $e){
                return response()->json([
                    'status' => 500,
                    'error_message' => 'Something went wrong'
                ]);
            }
        }
    }

    static function list(){
        $rows = DB::table('book as b')->join('main_program as m','m.id','=','b.program_id')->join('department as d','d.id','=','b.department_id')->selectRaw('b.id,b.name,b.description,b.photo_file_name,m.name as program,d.name as department')->get();
        foreach($rows as $row){
            $row->image_url = SaveImage::getImage('images',$row->photo_file_name);
            unset($row->photo_file_name);
        }
        
        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }
}