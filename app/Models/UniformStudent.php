<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\SaveImage;
use App\Models\JDV;

class UniformStudent
{
    protected $tbl = 'uniform_student';
    protected $dir = 'images';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'sex' => 'required|max:7',
            'description' => 'string|min:3|max:250',
            'photo' => 'string'
        ];

        $validator = Validator::make($data,$rules);

        if($validator->fails()){
            return JDV::error(404,$validator->message());
        }
        else{
            try{
                if($data['id'] > 0){
                    $filename = DB::table($this->tbl)->where('id',$data['id'])->value('photo_file_name');
                    if($filename)
                        $del = SaveImage::deleteImage($this->dir,$filename);

                    if($del){
                        $row = DB::table($this->tbl)->update([
                            'sex' => $data['sex'],
                            'description'=> $data['description'],
                            'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                        ]);

                        return JDV::depend($row,'Uniform Student Updated!');
                    }
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'sex' => $data['sex'],
                        'description'=> $data['description'],
                        'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                    ]);

                    return JDV::depend($row,'Uniform Student Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong!');
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl)->selectRaw('id,sex,description,photo_file_name')->get();
        foreach($rows as &$row){
            $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
            unset($row->photo_file_name);
        }

        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,sex,description,photo_file_name')->first();
        $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
        unset($row->photo_file_name);

        return JDV::result($row);
    }

    function delete($id){
        $filename = DB::table($this->tbl)->where('id',$id)->value('photo_file_name');
        SaveImage::deleteImage($this->dir,$filename);
        $row = DB::table($this->tbl)->where('id',$id)->delete();

        return JDV::depend($row,'Uniform Student Deleted Successfully!');
    }
}