<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\JDV;
use Exception;

class Book{
    protected $tbl = 'book', $dir = 'images';
    
    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:20',
            'description' => 'string|min:10|max:150',
            'program_id' => 'required|numeric',
            'department_id' =>'required|numeric',
            'photo' => 'string'
        ];

        $validator = Validator::make($data,$rules);
        if($validator->fails()){
            return JDV::error(404,$validator->messages());
        }
        else{
            try{
                if($data['id'] > 0){
                    $file_name = DB::table($this->tbl)->where('id',$data['id'])->value('photo_file_name');
                    if($file_name)
                        $del = SaveImage::deleteImage($this->dir,$file_name);

                    if($del){
                        $row = DB::table($this->tbl)->where('id',$data['id'])->update([
                            "name" => $data['name'],
                            "description" => $data['description'],
                            'program_id' => $data['program_id'],
                            'department_id' => $data['department_id'],
                            'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                        ]);

                        return JDV::depend($row,'Book Updated!');
                    }
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        "name" => $data['name'],
                        "description" => $data['description'],
                        'program_id' => $data['program_id'],
                        'department_id' => $data['department_id'],
                        'photo_file_name' => SaveImage::saveImage('images',$data['photo'])
                    ]);

                    return JDV::depend($row,'Book Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong');
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl.' as b')->join('main_program as m','m.id','=','b.program_id')->join('department as d','d.id','=','b.department_id')->selectRaw('b.id,b.name,b.description,b.photo_file_name,m.name as program,d.name as department')->get();
        foreach($rows as $row){
            $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
            unset($row->photo_file_name);
        }
        
        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,description,program_id,department_id,photo_file_name')->first();
        
        $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
        unset($row->photo_file_name);

        return JDV::result($row);
    }

    function delete($id){
        $file_name = DB::table($this->tbl)->where('id',$id)->value('photo_file_name');
        SaveImage::deleteImage($this->dir,$file_name);
        $row = DB::table($this->tbl)->where('id',$id)->delete();

        return JDV::depend($row,'Book Deleted Successfully!');
    }

    function getOptions(){
        $program = DB::table('main_program')->selectRaw('id,name')->get();
        $department = DB::table('department')->selectRaw('id,name')->get();

        return JDV::result([
            "programs" => $program,
            "departments"=> $department
        ]);
    }
}