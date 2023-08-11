<?php

namespace App\Models;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Exception;

class UserLogin
{
    protected $tbl = 'user';

    function registration($data){
        $rules = [
            'username' => 'required',
            'password' => 'required|min:8|max:20'
        ];

        $validator = Validator::make($data,$rules);

        if($validator->fails()){
            return back()->with('fails',response()->json($validator->messages()));
        }
        else{
            try{
                $row = DB::table($this->tbl)->where('name',$data['username'])->selectRaw('id,name,password')->first();

                if($row){
                    if(Hash::check($data['password'],$row->password)){
                        Session::put('id',$row->id);
                        return redirect('school');
                    }
                    else{
                        return redirect('/');
                    }
                }
                else{
                    return back()->with('fails',response()->json($row))->redirect('/');
                }
            }
            catch(Exception $e){
                return back()->with('fails','Something went wrong');
            }
        }
    }

    function dashboard(){
        $data = [];
        if(Session::has('id')){
            $data = DB::table($this->tbl)->where('id',Session::get('id'))->selectRaw('id,name,password')->first();
        }
        else{
            return redirect('/');
        }
        return view('master',compact('data'));
    }
}