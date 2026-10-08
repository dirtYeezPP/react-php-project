<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0", true);
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache", true);

session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Lax']);

require_once("router.php");
$myfuckingballs = __DIR__ . '/cats.json';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

App::get("/", function () {
    include("./client/dist/index.html");
});

App::get("/cats", function () use ($myfuckingballs) {
    header('Content-Type: application/json');
    echo file_get_contents($myfuckingballs);
});

App::post("/cats", function () use ($myfuckingballs) {
    $newCat = json_decode(file_get_contents('php://input'), true);

    // Fallback in case the file is empty or broken
    $fileData = file_get_contents($myfuckingballs);
    $cats = $fileData ? json_decode($fileData, true) : [];

    $cats[] = $newCat;
    file_put_contents($myfuckingballs, json_encode($cats, JSON_PRETTY_PRINT));
});

App::put("/cats", function () use ($myfuckingballs) {
    header('Content-Type: application/json');
    $uCat = json_decode(file_get_contents('php://input'), true);
    $id = $uCat['id'];

    $fileData = file_get_contents($myfuckingballs);
    $cats = $fileData ? json_decode($fileData, true) : [];

    $index = -1;  
    foreach($cats as $key=>$cat){
        if($cat['id'] == $id) {
            $index = $key; 
            break; 
        }
    }

    if($index>-1){
        $cats[$index]['toy_number'] = !empty(trim($uCat['toy_number'])) ? $uCat['toy_number'] : $cats[$index]['toy_number'];
        $cats[$index]['color'] = !empty(trim($uCat['color'])) ? $uCat['color'] : $cats[$index]['color'];
        $cats[$index]['toy_type'] = !empty(trim($uCat['toy_type'])) ? $uCat['toy_type'] : $cats[$index]['toy_type'];
        $cats[$index]['publication_year'] = !empty(trim($uCat['publication_year'])) ? $uCat['publication_year'] : $cats[$index]['publication_year'];
        $cats[$index]['generation'] = !empty(trim($uCat['generation'])) ? $uCat['generation'] : $cats[$index]['generation'];
        $cats[$index]['price'] = !empty(trim($uCat['price'])) ? $uCat['price'] : $cats[$index]['price'];

        file_put_contents($myfuckingballs, json_encode($cats, JSON_PRETTY_PRINT));
    }

});

App::delete('/cats/$id', function ($id) use ($myfuckingballs) {
    $cats = json_decode(file_get_contents($myfuckingballs), true);
    $filtCats = array_filter($cats, fn($c) => $c['id'] != $id);
    file_put_contents($myfuckingballs, json_encode(array_values($filtCats), JSON_PRETTY_PRINT)); 
});
