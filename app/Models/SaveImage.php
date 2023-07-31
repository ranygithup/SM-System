<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;

class SaveImage
{
    static function saveImage($dir, $base64){
        $image_parts = explode(";base64,", $base64);
        $image_type = explode("/", $image_parts[0])[1];
        $image_base64 = base64_decode($image_parts[1]);
        $image_name = time().'.'.$image_type;
        $path = $dir.'/'.$image_name;
        Storage::disk('local_public')->put($path, $image_base64);
    }

    static function deleteImage($dir, $filename){
        $path = $dir.'/'.$filename;
        Storage::disk('local_public')->delete($path);
    }
}