<?php

class Res{
    public static function redirect($path){
        header("Location: ".$path); 
    }
}

class Auth{
    public static function authRequired(){
        if(!isset($_SESSION['id'])){
            Res::redirect("/auth/login"); 
        }
    }
}

class Errors{

    const ERRORS = [
        'ERR_MISSING_DATA' => ['status'=>400, 'message'=>'ERR: Missing data.'],
        'ERR_INVALID_DATA' => ['status'=>400, 'message'=>'ERR: Invalid data.'],
        'ERR_LOCKED_OUT'=>['status'=>401, 'message'=>'ERR: Missing authentication'],
        'ERR_INCORRECT_DATA'=>['status'=>401, 'message'=>'ERR: Incorrect data.'],
        'ERR_FORBIDDEN'=>['status'=>403, 'message'=>'ERR: Forbidden'],
        'ERR_NOT_FOUND'=>['status'=>404, 'message'=>'ERR: Requested source missing'],
        'ERR_UPLOAD_FAIL'=>['status'=>422, 'message'=>'ERR: Upload fail.']
    ];
    
    public static function sendErrorPath($errorCode){
        http_response_code(self::ERRORS[$errorCode]['status']);
        echo json_encode([
            'errorPath'=>'/errors' . $errorCode
        ]); 
    }
}