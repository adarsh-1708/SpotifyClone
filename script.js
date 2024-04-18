console.log("Lets write some javascript");
let currentsong=new Audio();

function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

async function getSongs()
{
let a=await fetch("http://127.0.0.1:5500/song/");
let res=await a.text();
console.log(res);

let div=document.createElement("div");
div.innerHTML=res;
let as=div.getElementsByTagName("a");
console.log(as);

let songs=[]

for(let i =0;i<as.length;i++){
const element=as[i];
if(element.href.endsWith(".mp3")){
songs.push(element.href);
}
}
console.log(songs);
return songs;
}

const playmusic=(track)=>{
currentsong.src="/song/"+track+"(PagalWorld).mp3";
currentsong.play();
play1.src="pause.svg"
document.querySelector(".songinfo").innerHTML=track;
document.querySelector(".songtime").innerHTML=currentsong.currentTime +" / "+currentsong.duration;
}



async function main()
{
    
let song=await getSongs();
console.log(song);

let songul=document.querySelector(".songs").getElementsByTagName("ul")[0];
for(const songs of song)
{
    songul.innerHTML=songul.innerHTML + `<li><img class="invert" src="music.png" alt="music" >
    <div class="info">
       <div>${songs.split("/song/")[1].replace("(PagalWorld).mp3","")}</div>
       <div>Adarsh</div>
    </div>

    <img class="invert" id="play" src="play.png" alt="play">

</li>`;
}

Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e=>{
    console.log(e);
    e.addEventListener("click",element=>{
        
        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
})


play1.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play();
        play1.src="pause.svg";
    }
    else{
        currentsong.pause();
        play1.src="play.png";    
    }
})


//  time update event

currentsong.addEventListener("timeupdate",()=>{
    document.querySelector(".songtime").innerHTML=formatTime(currentsong.currentTime)+" / "+formatTime(currentsong.duration);
   
})

// previous song 
previous.addEventListener("click",()=>{
    
})


}
main();
