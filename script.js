

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDY2NmU4NTM0MzczZTg3NDUyNTgxNDdmODA5OWYwYyIsIm5iZiI6MTcyNzYwMDAxMi44MTY0MTksInN1YiI6IjY2ZjkwZGYwMmM0YmRjOWRiMDVmNjE5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nxvQSldPLZcRuYpPCTjuVoDVEFfbCBiTTBnYvdwvgME'
            }
};
    //fetches movies
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);

        const movies = document.getElementById('movies');
        const movieIndex = [0, 1, 2, 3, 4];

        movieIndex.forEach(index => {
            const movie = response.results[index];
            const movieId = movie.id;
            const posterPath = movie.poster_path;
            const img = `http://image.tmdb.org/t/p/w500${posterPath}`;

            const div = document.createElement('div');
            div.classList.add('movie', index);
            const newMovie = `<img src="${img}" alt="poster" onclick="popupOpen(${movieId})"></img>`;
            div.innerHTML = newMovie;
            movies.append(div);
        });
    })
    .catch(err => console.error(err));

    function popupOpen(movieId) {
    // fetch movie details for the selected movie
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);

            const title = response.original_title;
            const rating = response.vote_average;
            const plot = response.overview;
            const genre = response.genres[0]?.name;
            const status = response.status;

            // update the popup content
            document.getElementById('title').innerHTML = `${title}`;
            document.getElementById('tags').innerHTML = `
                <span id="status">${status}</span>
                <span id="rating">${rating}</span>
                <span id="genre1">${genre}</span>`;
            document.getElementById('plot').innerHTML = `<p id="plot">${plot}</p>`;
        })
        .catch(err => console.error(err));

    // fetch movie images for background
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?include_image_language=en`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const bgPoster = response.posters[5]?.file_path;
            document.getElementById('bg').style.background = `url(http://image.tmdb.org/t/p/w500${bgPoster}) no-repeat center center`;
            document.getElementById('bg').style.backgroundSize = 'cover';
        })
        .catch(err => console.error(err));

    // open the popup
    const popup = document.getElementsByClassName('popup');
    const overlay = document.getElementById('overlay');
    popup[0].classList.add('active');
    overlay.classList.add('active');
    }

    function popupClose() {
    const popup = document.getElementsByClassName('popup');
    const overlay = document.getElementById('overlay');
    popup[0].classList.remove('active');
    overlay.classList.remove('active');
    }

    overlay.addEventListener('click', () => {
    popupClose();
    });

    // shows genres selection menu
    function dropdownShow() {
        document.getElementById("genres").classList.toggle("show");
      }
      
      // filter for movies