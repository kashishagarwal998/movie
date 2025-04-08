const search = document.querySelector(".get");
const fav = document.querySelector(".fav");
const box = document.querySelector(".box");
const name = document.getElementById("name");
const searchbtn = document.querySelector(".search");
searchbtn.addEventListener("click", () => {
    box.innerHTML = "";

})
search.addEventListener("click", () => {
    box.innerHTML = "";
    getmovies();
})
async function getmovies() {
    let name1 = name.value;
    if (name1 == "") {
        alert("Please enter a movie name");
        return;
    }
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name1}&include_adult=false&language=en-US&page=1`
        , {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDA4ODZjYjU3MWI5NjgyNDg0ZmI5YzQyZDIwZDM1MiIsIm5iZiI6MTc0MzUxNDQ1OS41NDIsInN1YiI6IjY3ZWJlYjViNTFmNjI1NGY3NjhiZmM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHcxq97cqUn77aEOOD-gbZF49MR-lqrC9MbX9Q4zwGg'
            }
        });


    const data = await res.json();
    console.log(data);
    if (data.results.length == 0) {
        alert("No movies found");
        return;
    }

    data.results.forEach((ele) => {
        const div1 = document.createElement("div");

        const img = document.createElement("img");

        img.src = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
        const div2 = document.createElement("div");

        div2.innerHTML = `<h3>${ele.original_title}</h3>
        <p>${ele.overview}</p>
        <p>Release Date: ${ele.release_date}</p>
        <p>Rating: ${ele.vote_average}</p>`;
        const favbtn = document.createElement("button");
        favbtn.innerText = "Add to Favourites";
        const id = ele.id;
        favbtn.onclick = () => addtoFavourites(id, true);
        div1.className = "movie-card";
        img.className = "movie-poster";
        div2.className = "movie-info";
        favbtn.className = "fav-btn";

        div2.append(favbtn);
        div1.append(div2);
        div1.prepend(img);
        box.append(div1);
        name.value = "";
    });

}
async function addtoFavourites(id, isremove) {
    const options = {
        method: 'POST',
        headers: {
            accept: "application/json",
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDA4ODZjYjU3MWI5NjgyNDg0ZmI5YzQyZDIwZDM1MiIsIm5iZiI6MTc0MzUxNDQ1OS41NDIsInN1YiI6IjY3ZWJlYjViNTFmNjI1NGY3NjhiZmM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHcxq97cqUn77aEOOD-gbZF49MR-lqrC9MbX9Q4zwGg',
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: id,
            favorite: isremove
        })

    };

    const res = await fetch('https://api.themoviedb.org/3/account/21916125/favorite', options);
    const data = await res.json();


    if (isremove) {
        alert("Added to favourites");

    } else {
        alert("Removed from favourites");
        getfavourites();
    }
}
fav.addEventListener("click", () => {
    box.innerHTML = "";
    getfavourites();
})
async function getfavourites() {
    const res = await fetch("https://api.themoviedb.org/3/account/21916125/favorite/movies", {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDA4ODZjYjU3MWI5NjgyNDg0ZmI5YzQyZDIwZDM1MiIsIm5iZiI6MTc0MzUxNDQ1OS41NDIsInN1YiI6IjY3ZWJlYjViNTFmNjI1NGY3NjhiZmM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FHcxq97cqUn77aEOOD-gbZF49MR-lqrC9MbX9Q4zwGg'
        }
    });

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
        alert("No favourites found.");
        return;
    }

    data.results.forEach((ele) => {
        const div1 = document.createElement("div");

        const img = document.createElement("img"); 5

        img.src = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
        const div2 = document.createElement("div");

        div2.innerHTML = `<h3>${ele.original_title}</h3>
        <p>${ele.overview}</p>
        <p>Release Date: ${ele.release_date}</p>
        <p>Rating: ${ele.vote_average}</p>`;



        div1.append(div2);
        div1.prepend(img);
        box.append(div1);
        name.value = "";
    });
}
