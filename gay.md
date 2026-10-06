# 1 oktober -> separation vclient & server react php 

vite react 

npm create vite@latest 
men var? terminal ctrl Ö

vi är inne i herd katalogen och sen react php men var vill vi skapa client app? i vilken katalog 
i client såklart 
nu har vi redan skapat en som heter client men eftersom vihar en katalog 
cd client 
väl där skriver vi nom 
i project name skriv punkt eftersom annars kan du få path problem, 
så att vi får allting i client liksom. 
Om vi inte har gjort en katalog struktur kan vi ju liksom
skapa ett projekt med project name client -> då skapas ju den katalogen. 

## dist
filerna som är byggda nör aooenb ör föärdiga, 
men vi ska ojbba med server så vi kan ite vänta tills vi 
är färdiga för då kan viinte testa det. 
man kan göra build innan man testar server grejer 
men de jobbigt. 
one time grej konfiguration package.json 


men först include i index.php istället för echo 

vi får problem här redan yes. 
vi har fått html grejen yes de vår react app 
men den verkar inte funka, låt oss kolla på script taggen, 
kan vi komma åt den koden? den letar på fel ställe. 
de ett problem, de enkelt att fixa. 

i dist -> index.html -> ändra i src första ./ assets i båda 
de inte optimalt att ändra nå skapat av en bundler men uhm ja. 

nu funkar det ju med att söka liksom ehhh denhär
inte localhost utan den här react-php.test i url. 


Inga problem rn.... or....
det vi vill är att php servern ska serva på ne route
serva html, den html ska vara i sin tur ha js och css 
och det blir vår react app. de vår enda vy i projektek, 
inte en enda html okej bror client fix all with html idk. 

problemet nu är följande: 
om han nu går in i app.jsx 
och ändrar typ h2 till changed 10.01...
galen ändring. 
då måste han göra ne ny build. men där kraschar ju hela 
bullshitten och ja well..... nu har den ju inte ./client/dist
men inte bara det, den har ändrat namnet av js, css stay same. 

låt oss ändra i css då. 
app.jsx index.css tömma och ja skriv lite wild stuff. 
kör npm run build yes 
hoppas att den inte ändrats åtminstone men.... 
nu har ju båda filerna ändrat namn. 
varje buiuld -> nytt namn på css och js filerna.
bundlern vill skapa en liksom typ historik för at gå til
baka. 

enligt freddy är det bara onda!!! evil!!! 
han antar att det finns någon bra anledning till det. 

dev servern i run dev .> den 
generar js i ramminnet öfr att snabbt hämta det, css också
det läggs i webbläsarens minne ig
och då kan appen köras snabbre. 

vårt mål är att konfigurera vite 
client -> viteconfig -> 
den filen här behvöer vi modifiera 
så att vi får ett statiskt js filnan ich css. 

detta gör han en gång om året och han hittar aldrig
hur man gör liksom 
han måste då konsultera ai för de okej 
eftersom de inte programmering tydligen. de inget
man måste komma ihåg liksom (de måste göras men de inte 
svårt så whatever). 


## vite config 
``` js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```
change that to uhh whatever ai gave him ykwim. 

in terminal 
npm rum build again 
then index.html has app.js and style.css yippie 

kopiera innehpllet i html filen 
sen skapa en static.html 
alltså gg det går ju suveränt för freddy 
gemini gave me this 
``` js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './client/dist/',
  
  build: {
    rollupOptions: {
      output: {
        // Static names for entry JS chunks
        entryFileNames: 'assets/app.js',
        // Static names for dynamically imported code-split chunks
        chunkFileNames: 'assets/style.js',
        // Static names for CSS, images, fonts, etc.
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
```
base is added afterwards 

although it doesnt fix what he wants it to so idk. 
varflr bpda samtidigt? 
build och dev 


5173 kör via php servern den delar ut en byggd fil 
på vanlig search url funkar det inte ja. 

med watch tillägget liksom funkar det där ockspå. 

varför servar php vår html
omvi vill jobba med sessions så måste vi vara 
på samma domän och vi vill gärna junna använda den
inlogg funktionalitet vi vet men vi vill också
vöjra separera klient och server. 

# LITE GENOMÅGN AV FERDDY 
``` php
App::post("/api", function () {
    $postData = json_decode(file_get_contents('php://input'), true);
    $postData['id'] = "s".uniqid();
    header("Content-Type:application/json"); // både i server & klient 
    echo json_encode($postData);
});
```


men skit i detdär 

## gay 

iden är att fetch ska hämtas data en gång från servern
route på servern som hämtar från filen
(inte från json direkt)
servern måste ha en route som delar ut data 
den kan komma varifrån som helst
när vi sen laddar ner det hamnar det i vår lokal state, 
state var. 

i create gör vi fetch med post
data till server
och tanken är att vi bara ska få den ny skapade datan tillbaka
bara efter att vi får svar från servern, att allt har gått bra. 

då kan vi ta den datan och påverka vår state i klient app. 


samma sak med update, put request, 
och samma sak där får vi reda på att objektek har ändrats
och då kan vi göra öndringarna lokala på klienten

samma på delete, få tillbaka true eller false, ingen 
nydata, men state måste ändå ändras. 
är det borta på servern måste det bort fårn klienten as well.

enkelt när man gjort det och har fattat det
men var konsekventa med vad n skickar till klienten
hela tiden skicka json tillbaks till klienten

han ska visa en s.. nej det ska han inte gg 
inte mycket data manipulation i routesen
utan i separat filer liksom
vi ska kunna byta till en klass som jobbar mes myswl 
sen så ha det modulärt okej. 



## ai help....
``` php
// Allow Vite (usually localhost:5173) to communicate with PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit; } // Handles Vite's preflight requests

// READ ALL
App::get("/cats", function(){
    echo file_get_contents('cats.json');
});

// CREATE
App::post("/cats", function(){
    $newCat = json_decode(file_get_contents('php://input'), true);
    $cats = json_decode(file_get_contents('cats.json'), true);
    $cats[] = $newCat;
    file_put_contents('cats.json', json_encode($cats, JSON_PRETTY_PRINT));
});

// DELETE
App::post("/cats/delete", function(){
    $id = $_GET['id'];
    $cats = json_decode(file_get_contents('cats.json'), true);
    $cats = array_filter($cats, fn($c) => $c['id'] != $id);
    // array_values resets the array keys so it saves as a JSON array, not an object
    file_put_contents('cats.json', json_encode(array_values($cats), JSON_PRETTY_PRINT)); 
});

// UPDATE
App::post("/cats/update", function(){
    $updatedCat = json_decode(file_get_contents('php://input'), true);
    $cats = json_decode(file_get_contents('cats.json'), true);
    foreach($cats as &$cat) {
        if($cat['id'] == $updatedCat['id']) {
            $cat = array_merge($cat, $updatedCat);
        }
    }
    file_put_contents('cats.json', json_encode($cats, JSON_PRETTY_PRINT));
});
```


``` jsx 
// app.jsx 
async function getData() {
    const res = await fetch("http://localhost:8000/cats"); // Point to PHP server
    const data = await res.json();
    setProds(_ => data);
  }





  // create.jsx 
  function createProd(event){
        event.preventDefault(); 
        const newProd = {
            id: "s_" + Math.floor(Math.random() * 1000), // Matched your JSON ID format
            toy_number: event.target.toy_number.value,
            color: event.target.color.value,
            toy_type: event.target.toy_type.value,
            publication_year: event.target.publication_year.value,
            generation: event.target.generation.value,
            price: event.target.price.value 
        }

        // Send to PHP
        fetch("http://localhost:8000/cats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProd)
        });

        // Update UI immediately 
        setProds(prev=>[...prev, newProd]); 
    }


    // product.jsx 
    function deleteProd(){
        // Send delete request to PHP
        fetch(`http://localhost:8000/cats/delete?id=${prod.id}`, { method: "POST" });
        // Remove from UI
        setProds(_=>_.filter(p=>p.id!=prod.id));
    }

    function updateProd(event){
        event.preventDefault();

        const id = prod.id 
        const toy_type = event.target.toy_type.value.trim().replaceAll(/\s+/g, "_") || prod.toy_type
        const color = event.target.color.value.trim().replaceAll(/\s+/g, "_") || prod.color 
        const price = event.target.price.value.trim().replaceAll(/\s+/g, "_") || prod.price 

        const newProd = {id, toy_type, color, price};

        // Send update to PHP
        fetch("http://localhost:8000/cats/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProd)
        });

        setProds(_=>_.map(p=>{
            // Fixed bug: spread newProd, not prod
            if(p.id == prod.id) return {...p, ...newProd}; 
            return p; 
        }));
        
        toggleEdit(); // Closes the form automatically after saving
    }


    //3. How to run them togetherBecause client and server are separated, you need two terminals open to run both simultaneously:Terminal 1 (PHP Server): Open a terminal in your root folder (where cats.json and router.php live) and run:php -S localhost:8000Terminal 2 (Vite Server): Open a second terminal, navigate into your client folder, and run:
npm run dev   Now, when you interact with the Vite app in your browser, it will instantly update the UI while successfully saving the changes directly to cats.json behind the scenes.





$jsonFile = __DIR__ . '/cats.json';

// READ
App::get("/cats", function() use ($jsonFile) {
    echo file_get_contents($jsonFile);
});

// CREATE
App::post("/cats", function() use ($jsonFile) {
    $newCat = json_decode(file_get_contents('php://input'), true);
    
    // Fallback in case the file is empty or broken
    $fileData = file_get_contents($jsonFile);
    $cats = $fileData ? json_decode($fileData, true) : [];
    
    $cats[] = $newCat;
    file_put_contents($jsonFile, json_encode($cats, JSON_PRETTY_PRINT));
});


    $postData = json_decode(file_get_contents('php://input'), true);
    $cats = json_decode(file_get_contents('cats.json'), true); 
    $cats[] = $postData; 
    $postData['id'] = "s_".uniqid();
    file_put_contents('cats.json', json_encode($cats, JSON_PRETTY_PRINT ));
    header("Content-Type:application/json"); // både i server & klient 
    echo json_encode($postData);
```