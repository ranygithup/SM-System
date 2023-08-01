<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\SaveImage;
use App\Models\Book;
use Exception;

class BookController extends Controller
{
    function save(Request $req){
        $rules = [
            'id' => 'numeric',
            'name' => 'required|string|min:4|max:30',
            'description' => 'string|max:250',
            'program_id' => 'required|numeric',
            'department_id' => 'required|numeric',
            'photo' => 'string',
            'created_at' => 'string',
            'updated_at' => 'string'
        ];

        $validator = Validator::make($req->all(),$rules);
        if($validator->fails()){
            return response()->json([
                'status' => 200,
                'error_message' => $validator->messages()
            ]);
        }
        else{
            try{
                $data = $req->input();
                $book = new Book();
                $book->name = $data['name'];
                $book->description = $data['description'];
                $book->program_id = $data['program_id'];
                $book->department_id = $data['department_id'];
                $book->photo_file_name = SaveImage::saveImage('images',$data['photo']);
                unset($data['photo']);
                $book->save();
                
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

    function list(){
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