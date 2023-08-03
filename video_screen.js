let apiKey = "AIzaSyB4H8Ifok75zK6w6zP0lIQv3bCycVksrzA   ";
let baseURL = "https://www.googleapis.com/youtube/v3";
const videoId = JSON.parse(localStorage.getItem('videoID'));
console.log(videoId);
async function fetchDetails(id){
    let url =`${baseURL}/videos?key=${apiKey}&id=${id}&part=snippet,statistics`;
    let response = await fetch(url,{method:"GET"});
    let result = await response.json();

    return result;
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


const detailScreen = document.getElementById("detailScreen");

async function getInfo(){
        
    const data = await fetchDetails(videoId);
    console.log(data);
    const views = nFormatter(data.items[0].statistics.viewCount);
    const likes = nFormatter(data.items[0].statistics.likeCount);

     detailScreen.innerHTML=
     ` <div id="video-player">
     <div>
         <img src="https://i.ytimg.com/vi/ER9SspLe4Hg/hqdefault.jpg" width="100%">
     </div>
   </div>
   <div id="title">
    <p>JavaScript Tutorials for Beginners in Hindi</p>
    <div id="content">
      <div id="views">
         <p>views</p>
         <p>.</p>
         <p>Oct 8,2021</p>
      </div>

      <div id="likes">
         <div id="like">
             <span class="material-symbols-outlined">
                 thumb_up
                 </span>
                 <p>25.7K</p>
                 </div>

                 <div id="download">
                 <span class="material-symbols-outlined">
                     download
                 </span>
                 <p>Download</p>
                 </div>
      </div>
    </div> 

   </div>
   <div id="channel-info">

     <div id="container1">
         <div id="right">
       <div id="channel-logo">
         <img src="https://i.ytimg.com/vi/ER9SspLe4Hg/mqdefault.jpg">
       </div>
       <div id="info">
           <p>Code With Harry</p>
           <p style="font-family:'Poppins', sans-serif; color: lightgray;">1.2M Subscribers</p>
       </div>
       </div>

       <div id="btn">
         <button style="background-color: rgb(208, 16, 16); border:none">SUBSCRIBE</button>
      </div>
     </div>
       
     <div id="description">
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At nam repellat vitae fugiat vel, cumque eligendi quos, numquam aliquam cum eaque ipsum, quas nostrum fugit? Doloribus voluptate a error vero! Voluptatum tenetur ipsum fugiat quae ad, eveniet ut esse doloremque quo cupiditate obcaecati illum vitae sunt. Voluptatum minima fugit suscipit.</p>
     </div>
     
   </div>

   
   <div id="comments"></div>`
}

getInfo();