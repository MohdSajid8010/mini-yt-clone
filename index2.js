const api_key = "AIzaSyDtpxUzB7VGmo5FRZo1jZ_2AZp9SkMawDA";
// const apiKey = "AIzaSyA5SRKyu5w7Y9q7VXeClI9IxhD9m3nP7ao";


async function loadVideoCategories() {

    // let str = "1,2,10,15,17,19,20,22,24,25,26,27,28";
    let str = "1,2,10,15,17,18,19,20,21,22,34,24,25,26,27,28,29,30,31,32,33,35,36,37,38,39,40,41,42,43,44"

    const url = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&key=${api_key}&id=${str}`


    try {
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data.items);
        appendChip(data.items)//arr
        //    await loadVideosBasedOnCategoryId(1);
    } catch (err) {
        alert("err");
    }
}

function appendChip(arr) {
    let chips_containerEl = document.getElementById("chips-container");
    chips_containerEl.innerHTML = "";
    arr.forEach(obj => {
        let title = obj.snippet.title;
        // console.log(title);

        chips_containerEl.innerHTML += `<div class="chip">${title}</div>`;
    });
}

// loadVideoCategories();

let videos_containerEl = document.getElementById("videos-container");

async function loadVideosBasedOnCategoryId(id, searchString = "") {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchString}&type=video&videoCategoryId=${id}&key=${api_key}`;


    try {
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data, data.items);

        videos_containerEl.innerHTML = "";
        for (let val of data.items) {


            let chanetN = val.snippet.channelTitle;
            let imgurl = val.snippet.thumbnails.default.url;
            let title = val.snippet.title;
            let pub_time = val.snippet.publishTime;
            let channel_id = val.snippet.channelId;
            let channel_logo_url = await loadchanneLogo(channel_id);

            let videoi_id = val.id.videoId;
            let viwe_ct = await loadViewCount(videoi_id);

            let time = format_time(pub_time);

            console.log(pub_time);
            console.log(time);



            videos_containerEl.innerHTML += `  <div class="video">
    <img class="thumbnail" src="${imgurl}" alt="">
    <div class="logo-container">
        <img class="logo"
            src="${channel_logo_url}";
            alt="">
        <p class="channel-title">${title}</p>
    </div>
    <div>${chanetN}</div>
    <div class="views-container">
        <p>${viwe_ct}</p>
        <p>${time}</p>
    </div>
</div>`;


        }


    } catch (err) {
        alert("somethimg went wrong");
    }
}

loadVideosBasedOnCategoryId(17);


async function loadchanneLogo(channel_id) {

    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channel_id}&key=${api_key}`);

    const data = await response.json();
    // console.log(data);
    const logoUrl = data.items[0].snippet.thumbnails.default.url;
    // console.log(logoUrl);
    return logoUrl;

}

async function loadViewCount(videoi_id) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoi_id}&key=${api_key}`

    let respose = await fetch(url);
    let data = await respose.json();
    // console.log(data.items[0].statistics.viewCount , typeof(data.items[0].statistics.viewCount));
    let view = data.items[0].statistics.viewCount;
    view = parseInt(view);
    if (view < 1000) {
        return view + " views";
    } else if (view >= 1000 && view < 1000000) {
        view = (view / 1000);
        return view.toFixed(2) + "K views";
    } else {
        view = (view / 1000000);
        return view.toFixed(2) + "M views";
    }
}









let obj = {
    "Film & Animation": 1,
    "Autos & Vehicles": 2,
    "Music": 10,
    "Pets & Animals": 15,
    "Sports": 17,
    "Short Movies": 18,
    "Travel & Events": 19,
    "Gaming": 20,
    "Videoblogging": 21,
    "People & Blogs": 22,
    "Comedy": 34,
    "Entertainment": 24,
    "News & Politics": 25,
    "Howto & Style": 26,
    "Education": 27,
    "Science & Technology": 28,
    "Nonprofits & Activism": 29,
    "Movies": 30,
    "Anime/Animation": 31,
    "Action/Adventure": 32,
    "Classics": 33,
    "Documentary": 35,
    "Drama": 36,
    "Family": 37,
    "Foreign": 38,
    "Horror": 39,
    "Sci-Fi/Fantasy": 40,
    "Thriller": 41,
    "Shorts": 42,
    "Shows": 43,
    "Trailers": 44

}

let chipEls = Array.from(document.getElementsByClassName("chip"));
chipEls.forEach((chip) => {

    chip.addEventListener("click", (e) => {
        console.log(e, e.target.textContent);
        let id = obj[e.target.textContent];
        console.log(id)
        loadVideosBasedOnCategoryId(id);

    })
})


function format_time(pub_time) {
    const diffInMs = new Date() - new Date(pub_time);
    const diffInMin = diffInMs / (1000 * 60);
    const diffInHr = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInMon = diffInMs / (1000 * 60 * 60 * 24 * 30);
    const diffInyear = diffInMs / (1000 * 60 * 60 * 24 * 365);

    if (Math.floor(diffInHr) < 60) {
        Math.floor(diffInHr) + " min ago"
    }
    else if (Math.floor(diffInHr) < 24) {
        return Math.floor(diffInHr) + "h ago";
    }
    else if (Math.floor(diffInDays) < 30) {
        return Math.floor(diffInDays) + "day ago";
    }
    else if (Math.floor(diffInMon) < 12) {
        return Math.floor(diffInMon) + "month ago";
    }
    else if (Math.floor(diffInyear) >= 1) {
        return Math.floor(diffInyear) + "year ago";
    }
}

    // let str="1,2,10,15,17,18,19,20,21,22,34,24,25,26,27,28,29,30,31,32,33,35,36,37,38,39,40,41,42,43,44"
    // console.log(obj["Entertainment"]);
