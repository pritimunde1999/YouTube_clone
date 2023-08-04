document.addEventListener("DOMContentLoaded", function() {

let apiKey = "AIzaSyBV4jxxWaTT2GzW0kHrsxg77jsstUIX8EU";
let baseURL = "https://www.googleapis.com/youtube/v3";

let menu = document.getElementsByClassName("menubar")[0];
let sidebar = document.getElementById("sidebar");
let sidebar2 = document.getElementById("sidebar-2");
let main = document.getElementsByTagName("main")[0];
sidebar.style.display="block"; 


getRandomVideos();

menu.addEventListener("click",()=>{
    if(sidebar.style.display=="block")
    {
        sidebar.style.display="none";
        sidebar2.style.display="block";
        main.style.gridTemplateColumns ="1fr 11fr";
    }
    else{
        sidebar2.style.display="none";
        sidebar.style.display="block";
        main.style.gridTemplateColumns ="1fr 6fr";
    }
});

const searchbtn= document.getElementById("searchbtn");
const searchInput = document.getElementById("s-input");
const cardContainer = document.getElementsByClassName("card-container")[0];

searchbtn.addEventListener("click",()=>{
    let searchString = searchInput.value.trim();
    if(searchString==="")
    {
        return;
    }
    getSearchResults(searchString);
});


async function getRandomVideos(){
    let url =`${baseURL}/search?key=${apiKey}&part=snippet&maxResults=20`;
    let response = await fetch(url,{method:"GET"});
    let result = await response.json();
    dataOnUI(result.items);
}

async function getChannelInfo(id){
   let url =`${baseURL}/channels?key=${apiKey}&part=snippet&,statistics&id=${id}`;
   let response = await fetch(url,{method:"GET"});
     let result = await response.json();
     
     return result;
}

async function getVideoInfo(id){
     let url =`${baseURL}/videos?key=${apiKey}&id=${id}&part=snippet,statistics`;
     let response = await fetch(url,{method:"GET"});
     let result = await response.json();
   
     return result;
}

async function getSearchResults(searchString){
   let url =`${baseURL}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
   let response = await fetch(url,{method:"GET"});
   let result = await response.json();
  // console.log(result);
   dataOnUI(result.items);
   
}

function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}


function dataOnUI(videoList){
       cardContainer.innerHTML="";
       //console.log(videoList);
       
       videoList.forEach(async element => {

         const card = document.createElement("div");
         card.className ="card";
         card.id = `${element.id.videoId}`;
         card.onclick = eval("sendData");
         const data = await getVideoInfo(element.id.videoId);
         //console.log(element.id.videoId);
         const views = data.items[0].statistics.viewCount;
         let viewC = nFormatter(views);
         
         const channelInfo = await getChannelInfo(element.snippet.channelId);
         const channelImg = channelInfo.items[0].snippet.thumbnails.high.url;
        
         card.innerHTML=
         `<div id="thumbnil">
         <img src="${element.snippet.thumbnails.medium.url}"">
         <div id="time">23:45</div>
      </div>
      <div id="info">
       <div id="logo1">
           <img src="${channelImg}">
       </div>
       <div id="otherInfo">
           <p id="discription">${element.snippet.title}</p>
           <p id="title">${element.snippet.channelTitle}</p>
           <div id="cont">
               <p>${viewC}</p>
               <p id="dot">.</p>
               <p>1 week ago</p>
           </div>
       </div>
      </div>`
      cardContainer.appendChild(card);
       });
}

function sendData(){
    
    const videoId = this.id;

    const data ={
        videoId : videoId,
    }

    localStorage.setItem('videoID', JSON.stringify(data));
    window.location.href = 'video_screen.html';
}

const cards = document.getElementsByClassName("card");

Array.from(cards).forEach(card => {
    card.addEventListener("click", function() {
      const cardID = this.id;
    });
  });

});

// {
//     "publishedAt": "2022-07-14T12:51:40Z",
//     "channelId": "UCeVMnSShP_Iviwkknt83cww",
//     "title": "JavaScript Tutorials for Beginners in Hindi",
//     "description": "JavaScript Course in Hindi: This Javascript tutorial in Hindi course is designed for beginners with an aim to take JavaScript/ES6 ...",
//     "thumbnails": {
//         "default": {
//             "url": "https://i.ytimg.com/vi/ER9SspLe4Hg/default.jpg",
//             "width": 120,
//             "height": 90
//         },
//         "medium": {
//             "url": "https://i.ytimg.com/vi/ER9SspLe4Hg/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//         },
//         "high": {
//             "url": "https://i.ytimg.com/vi/ER9SspLe4Hg/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//         }
//     },
//     "channelTitle": "CodeWithHarry",
//     "liveBroadcastContent": "none",
//     "publishTime": "2022-07-14T12:51:40Z"
// }