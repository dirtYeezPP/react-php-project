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

