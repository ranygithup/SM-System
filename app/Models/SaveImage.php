<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;

class SaveImage
{
    static function saveImage($dir, $base64){
        $image_parts = explode(";base64,", $base64);
        $image_type = explode("/", $image_parts[0])[1];
        $image_base64 = base64_decode($image_parts[1]);
        $image_name = time().uniqid().'.'.$image_type;
        $path = $dir.'/'.$image_name;
        Storage::disk('local_public')->put($path, $image_base64);
        return $image_name;
    }

    static function deleteImage($dir, $filename){
        $path = $dir.'/'.$filename;
        return Storage::disk('local_public')->delete($path);
    }

    static function getImage($dir,$filename){
        $path = asset(Storage::url($dir.'/'.$filename));
        return $path;
    }
}