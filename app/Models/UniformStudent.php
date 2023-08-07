<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\SaveImage;

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
            return response()->json([
                'status' => 200,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            try{
                if($data['id'] > 0){
                    $filename = DB::table($this->tbl)->where('id',$data['id'])->value('photo_file_name');
                    SaveImage::deleteImage($this->dir,$filename);

                    DB::table($this->tbl)->update([
                        'sex' => $data['sex'],
                        'description'=> $data['description'],
                        'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                    ]);
                }
                else{
                    DB::table($this->tbl)->insert([
                        'sex' => $data['sex'],
                        'description'=> $data['description'],
                        'photo_file_name' => SaveImage::saveImage($this->dir,$data['photo'])
                    ]);
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Uniform Student Added'
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

    function list(){
        $rows = DB::table($this->tbl)->selectRaw('id,sex,description,photo_file_name')->get();
        foreach($rows as &$row){
            $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
            unset($row->photo_file_name);
        }

        return response()->json([
            'status' => 200,
            'data' => $rows
        ]);
    }

    function details($id){
        $row = DB::table($this->tbl)->where('id',$id)->selectRaw('id,sex,description,photo_file_name')->first();
        $row->image_url = SaveImage::getImage($this->dir,$row->photo_file_name);
        unset($row->photo_file_name);

        return response()->json([
            'status' => 200,
            'data' => $row
        ]);
    }

    function delete($id){
        $filename = DB::table($this->tbl)->where('id',$id)->value('photo_file_name');
        SaveImage::deleteImage($this->dir,$filename);
        DB::table($this->tbl)->where('id',$id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Deleted Successfully!'
        ]);
    }
}