<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\User\StoreRequest;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $data= $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::where('email', $data['email'])->first(); //если такой пользователь есть
        if($user) return response(['error'=>'Узер уже есть такой'], 403); //403 ошибка есть такой юзер уже
        $user = User::firstOrCreate([
            'email'=>$data['email']
        ], $data);

        $token = auth()->tokenById($user->id);
        return response(['access_token'=>$token]);
    }
}
