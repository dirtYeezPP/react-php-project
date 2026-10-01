<?php 
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0", true);
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache", true);

require_once("router.php");

App::get("/", function () {
    include("./client/dist/index.html");
});

App::post("/cat", function(){

}); 

App::put("/cat", function(){

});

App::delete("/cat", function(){

});