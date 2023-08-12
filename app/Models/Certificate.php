<?php

namespace App\Models;

use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\SaveImage;
use App\Models\JDV;

class Certificate
{
    protected $tbl = 'certificate';
    protected $dir = 'images';

    function save($data){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:3|max:150',
            'description' => 'required|string|min:3|max:250',
            'photo' => 'string'
        ];

        $validate = Validator::make($data,$rules);
        if($validate->fails()){
            return JDV::error(404,$validate->messages());
        }
        else{
            try{
                if($data['id'] > 0){
                    $filename = DB::table($this->tbl)->where('id',$data['id'])->value('photo_file_name');
                    if($filename)
                        $del = SaveImage::deleteImage($this->dir,$filename);

                    if($del){
                        $row = DB::table($this->tbl)->update([
                            'name' => $data['name'],
                            'description' => $data['description'],
                            'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                        ]);

                        return JDV::depend($row,'Certificate Updated!');
                    }
                }
                else{
                    $row = DB::table($this->tbl)->insert([
                        'name' => $data['name'],
                        'description' => $data['description'],
                        'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                    ]);

                    return JDV::depend($row,'Certificate Added!');
                }
            }
            catch(Exception $e){
                return JDV::error(500,'Something went wrong');
            }
        }
    }

    function list(){
        $rows = DB::table($this->tbl)->selectRaw('id,name,description,photo_file_name,created_at')->get();

        foreach($rows as $row){
            $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
            unset($row->photo_file_name);
        }
        
        return JDV::result($rows);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,name,description,photo_file_name')->first();
        $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
        unset($row->photo_file_name);

        return JDV::result($row);
    }

    function delete($id){
        $filename = DB::table($this->tbl)->where('id',$id)->value('photo_file_name');
        SaveImage::deleteImage($this->dir,$filename);
        $row = DB::table($this->tbl)->where('id',$id)->delete();

        return JDV::depend($row,'Certificate Deleted Successfully!');
    }
}