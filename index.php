<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0", true);
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache", true);

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
    // header("http://localhost:5173/cats");
});

App::put("/cats", function () {});

App::delete("/cats", function () {});
