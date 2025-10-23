function toggleVideo(selectedMode = "trailer") {
  const trailer = document.querySelector('.trailer');
  const video = trailer?.querySelector('.video');

  if (!trailer || !video) return;

  mode = selectedMode;
  trailer.classList.toggle('active');

  if (trailer.classList.contains('active')) {
    const src = mode === "movie" ? movies[currentMovie] : trailers[currentMovie];
    video.pause();

    // Hapus SEMUA track lama
    video.querySelectorAll('track').forEach(track => track.remove());

    video.src = src || "";
    video.currentTime = 0;

    // Tambahkan track subtitle baru jika mode movie
    if (mode === "movie" && subtitles[currentMovie]) {
      const track = document.createElement("track");
      track.kind = "subtitles";
      track.label = "Bahasa Indonesia";
      track.srclang = "id";
      track.src = subtitles[currentMovie];
      track.default = true;
      video.appendChild(track);
    }

    // Pastikan browser memuat ulang track
    video.load();
    video.play();
  } else {
    video.pause();
    video.currentTime = 0;
    video.removeAttribute("src");
    video.querySelectorAll('track').forEach(track => track.remove());
  }
}

// ===========================
//  Data Source - DIPERBAIKI
// ===========================
const trailers = {
  seven: "./assets/Trailer/seven_trailer.mp4",
  the_godfather: "./assets/Trailer/the_godfather_trailer.mp4",
  whiplash: "./assets/Trailer/whiplash_trailer.mp4", // DITAMBAHKAN
  pulp_fiction: "./assets/Trailer/pulp_fiction_trailer.mp4",
  american_history_x: "./assets/Trailer/american_history_x_trailer.mp4",
  ne_zha: "./assets/Trailer/ne_zha_trailer.mp4",
  frozen: "./assets/Trailer/frozen_trailer.mp4",
  toy_story: "./assets/Trailer/toy_story_trailer.mp4",
};

const movies = {
  seven: "./assets/Movies/Seven_movie.mkv",
  the_godfather: "./assets/Movies/The_Godfather_movie.mkv",
  whiplash: "./assets/Movies/Whiplash_movie.mkv", // DITAMBAHKAN
  pulp_fiction: "./assets/Movies/Pulp_Fiction_movie.mkv",
  american_history_x: "./assets/Movies/American_History_X_movie.mkv",
  ne_zha: "./assets/Movies/Ne_Zha_movie.mkv",
  frozen: "./assets/Movies/Frozen_movie.mkv",
  toy_story: "./assets/Movies/Toy_Story_movie.mkv",
};

const subtitles = {
  seven: "./assets/Subtitles/seven_id_subtitle.vtt",
  the_godfather: "./assets/Subtitles/the_godfather_id_subtitle.vtt",
  whiplash: "./assets/Subtitles/whiplash_id_subtitle.vtt", // DITAMBAHKAN
  pulp_fiction: "./assets/Subtitles/pulp_fiction_id_subtitle.vtt",
  american_history_x: "./assets/Subtitles/american_history_x_id_subtitle.vtt",
  ne_zha: "./assets/Subtitles/ne_zha_id_subtitle.vtt",
  frozen: "./assets/Subtitles/frozen_id_subtitle.vtt",
  toy_story: "./assets/Subtitles/toy_story_id_subtitle.vtt",
};

const movieData = {
    seven: {
        title: "Seven",
        year: 1995,
        rating: "18+",
        duration: "2h 7min",
        genre: "Thriller",
        bg: "seven_bg.jpg",
        poster: "./images/poster/seven_poster.jpg",
        searchTerms: ["seven", "7", "se7en", "thriller", "david fincher"]
    },
    the_godfather: {
        title: "The Godfather",
        year: 1972,
        rating: "18+",
        duration: "2h 55min",
        genre: "Crime",
        bg: "the_godfather_bg.jpg",
        poster: "./images/poster/the_godfather_poster.jpg",
        searchTerms: ["godfather", "mafia", "crime", "corleone", "marlon brando"]
    },
    whiplash: { // DITAMBAHKAN - SESUAI DENGAN HTML
        title: "Whiplash",
        year: 2014,
        rating: "16+",
        duration: "1h 46min",
        genre: "Drama",
        bg: "whiplash_bg.jpg",
        poster: "./images/poster/whiplash_poster.jpg",
        searchTerms: ["whiplash", "drama", "music", "drummer", "jazz"]
    },

    frozen: {
        title: "Frozen",
        year: 2013,
        rating: "7+",
        duration: "1h 42min",
        genre: "Adventure",
        bg: "frozen_bg.jpg",
        poster: "./images/poster/frozen_poster.jpg",
        searchTerms: ["frozen", "animation", "adventure", "comedy",]
    },

    toy_story: {
        title: "Toy Story",
        year: 1995,
        rating: "7+",
        duration: "1h 21min",
        genre: "Adventure",
        bg: "toy_story_bg.jpg",
        poster: "./images/poster/toy_story_poster.jpg",
        searchTerms: ["toy story", "animation", "adventure", "comedy",]
    },

    ne_zha: {
        title: "Ne Zha",
        year: 2019,
        rating: "Not Rated",
        duration: "1h 50min",
        genre: "Adventure",
        bg: "ne_zha_bg.jpg",
        poster: "./images/poster/ne_zha_poster.jpg",
        searchTerms: ["ne zha", "nezha", "animation", "chinese", "adventure"]
    },
    pulp_fiction: {
        title: "Pulp Fiction",
        year: 1994,
        rating: "18+",
        duration: "2h 34min",
        genre: "Crime",
        bg: "pulp_fiction_bg.jpg",
        poster: "./images/poster/pulp_fiction_poster.jpg",
        searchTerms: ["pulp fiction", "tarantino", "crime", "john travolta"]
    },
    american_history_x: {
        title: "American History X",
        year: 1998,
        rating: "18+",
        duration: "1h 59min",
        genre: "Drama",
        bg: "american_history_x_bg.jpg",
        poster: "./images/poster/american_history_x_poster.jpg",
        searchTerms: ["american history x", "drama", "racism", "edward norton"]
    }
};

// ===========================
//  Variabel Global
// ===========================
let currentMovie = "seven";
let mode = "trailer"; // default trailer mode


// ===========================
//  Fungsi Pencarian
// ===========================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = searchMovies(searchTerm);
        displaySearchResults(results);
    });
    
    // Tutup hasil pencarian ketika klik di luar
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function searchMovies(searchTerm) {
    const results = [];
    
    Object.keys(movieData).forEach(movieKey => {
        const movie = movieData[movieKey];
        
        // Cek judul film
        if (movie.title.toLowerCase().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek tahun
        if (movie.year.toString().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek genre
        if (movie.genre.toLowerCase().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek search terms
        const hasMatch = movie.searchTerms.some(term => 
            term.toLowerCase().includes(searchTerm)
        );
        
        if (hasMatch) {
            results.push({ ...movie, key: movieKey });
        }
    });
    
    return results;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No movies found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    searchResults.innerHTML = results.map(movie => `
        <div class="search-result-item" onclick="selectMovie('${movie.key}')">
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <span class="movie-title">${movie.title}</span>
                <span class="movie-year">${movie.year} • ${movie.genre}</span>
            </div>
        </div>
    `).join('');
    
    searchResults.classList.add('active');
}

function selectMovie(movieKey) {
    const movie = movieData[movieKey];
    if (movie) {
        changeBg(movie.bg, movieKey);
        
        // Reset pencarian
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').classList.remove('active');
        
        // Scroll ke atas jika perlu
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===========================
//  Inisialisasi saat halaman dimuat
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

function changeBg(bg, title) {
    console.log('changeBg called with:', bg, title);
    
    const banner = document.querySelector('.banner');
    const contents = document.querySelectorAll('.content');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    // Update background
    banner.style.background = `url("./images/background/${bg}") no-repeat center center / cover`;

    // Update konten
    contents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(title)) {
            content.classList.add('active');
            console.log('Activated content:', title);
        }
    });

    // Find the index of the target movie in carousel
    let targetIndex = 0;
    carouselItems.forEach((item, index) => {
        const itemMovie = item.getAttribute('data-movie');
        if (itemMovie === title) {
            targetIndex = index;
            console.log('Found target index:', targetIndex);
        }
    });

    // Use Materialize Carousel API to move to the specific item
    const carouselElem = document.querySelector('.carousel');
    if (carouselElem) {
        const carouselInstance = M.Carousel.getInstance(carouselElem);
        if (carouselInstance) {
            console.log('Moving carousel to index:', targetIndex);
            carouselInstance.set(targetIndex);
        } else {
            console.log('No carousel instance found');
        }
    }

    currentMovie = title;
}

// ===========================
//  My List Functionality - DITAMBAHKAN
// ===========================
function addToList(movieKey) {
    let myList = JSON.parse(localStorage.getItem('myList')) || [];
    
    if (!myList.includes(movieKey)) {
        myList.push(movieKey);
        localStorage.setItem('myList', JSON.stringify(myList));
        
        // Show success message
        showNotification('Movie added to your list!');
    } else {
        showNotification('Movie already in your list!');
    }
}

function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(150%);
        transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===========================
//  Initialize My List functionality for carousel
// ===========================
function initializeMyList() {
    // Add click event to all My List buttons in carousel
    document.addEventListener('click', function(e) {
        if (e.target.closest('.button a') && e.target.closest('.button a').textContent.includes('My List')) {
            e.preventDefault();
            const movieKey = currentMovie; // Use currently selected movie
            addToList(movieKey);
        }
    });
}

// Panggil fungsi ini di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeMyList(); // DITAMBAHKAN
});

// ===========================
//  Enhanced Search Functionality for All Pages
// ===========================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) {
        console.log('Search elements not found on this page');
        return;
    }
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = searchMovies(searchTerm);
        displaySearchResults(results, searchResults);
    });
    
    // Tutup hasil pencarian ketika klik di luar
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function searchMovies(searchTerm) {
    const results = [];
    const currentPage = getCurrentPage();
    
    Object.keys(movieData).forEach(movieKey => {
        const movie = movieData[movieKey];
        
        // Filter berdasarkan halaman saat ini
        if (!isMovieOnCurrentPage(movieKey, currentPage)) {
            return;
        }
        
        // Cek judul film
        if (movie.title.toLowerCase().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek tahun
        if (movie.year.toString().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek genre
        if (movie.genre.toLowerCase().includes(searchTerm)) {
            results.push({ ...movie, key: movieKey });
            return;
        }
        
        // Cek search terms
        const hasMatch = movie.searchTerms.some(term => 
            term.toLowerCase().includes(searchTerm)
        );
        
        if (hasMatch) {
            results.push({ ...movie, key: movieKey });
        }
    });
    
    return results;
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('Adults.html')) return 'adults';
    if (path.includes('Kids.html')) return 'kids';
    if (path.includes('Trend.html')) return 'trend';
    if (path.includes('My List.html')) return 'mylist';
    return 'home'; // index.html
}

function isMovieOnCurrentPage(movieKey, currentPage) {
    const movie = movieData[movieKey];
    if (!movie) return false;
    
    switch (currentPage) {
        case 'adults':
            // Movies dengan rating 18+ untuk Adults
            return movie.rating === '18+';
        case 'kids':
            // Movies dengan rating cocok untuk kids
            return movie.rating === 'Not Rated' || movie.rating === '16+' || 
                   movie.genre.toLowerCase().includes('animation') ||
                   movie.genre.toLowerCase().includes('adventure');
        case 'trend':
            // Semua movie bisa di trend, tapi kita batasi untuk demo
            return ['whiplash', 'ne_zha', 'seven'].includes(movieKey);
        case 'mylist':
            // Untuk mylist, filter berdasarkan localStorage
            const myList = JSON.parse(localStorage.getItem('myList')) || [];
            return myList.includes(movieKey);
        default:
            // Home page - semua movie
            return true;
    }
}

function displaySearchResults(results, searchResults) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No movies found</div>';
        searchResults.classList.add('active');
        return;
    }
    
    searchResults.innerHTML = results.map(movie => `
        <div class="search-result-item" onclick="handleSearchSelection('${movie.key}')">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <span class="movie-title">${movie.title}</span>
                <span class="movie-year">${movie.year} • ${movie.genre}</span>
            </div>
        </div>
    `).join('');
    
    searchResults.classList.add('active');
}

function handleSearchSelection(movieKey) {
    const currentPage = getCurrentPage();
    const movie = movieData[movieKey];
    
    if (!movie) return;
    
    // Reset pencarian
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').classList.remove('active');
    
    switch (currentPage) {
        case 'home':
            // Di home, change background dan aktifkan content
            changeBg(movie.bg, movieKey);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
            
        case 'adults':
        case 'kids':
        case 'trend':
            // Di halaman kategori, scroll ke movie yang dipilih
            scrollToMovie(movieKey);
            break;
            
        case 'mylist':
            // Di mylist, tetap di halaman yang sama karena sudah filtered
            showNotification(`Viewing ${movie.title}`);
            break;
    }
}

function scrollToMovie(movieKey) {
    const movieElement = document.querySelector(`[data-movie="${movieKey}"]`);
    if (movieElement) {
        // Scroll ke element dengan smooth behavior
        movieElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
        
        // Tunggu scroll selesai kemudian trigger animasi
        setTimeout(() => {
            highlightMovie(movieElement);
            showSearchSuccess(movieKey);
        }, 500);
        
    } else {
        showNotification('Movie not found on this page');
    }
}

function highlightMovie(element) {
    // Remove existing highlights
    document.querySelectorAll('.search-result-highlight').forEach(el => {
        el.classList.remove(
            'search-result-neon',

        );
    });
    
    // Pilih animasi secara random untuk variasi
    const animations = [
        'search-result-neon',
    ];
    
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    // Add highlight dengan animasi
    element.classList.add('search-result-highlight', randomAnimation, 'search-success-check');
    
    // Add typewriter effect ke title jika ada
    const titleElement = element.querySelector('h4, .movie-title, .trending-info h4');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.classList.add('search-title-reveal');
        titleElement.style.width = '0';
        
        setTimeout(() => {
            titleElement.style.width = 'auto';
            titleElement.classList.remove('search-title-reveal');
        }, 1000);
    }
    
    // Remove highlight setelah animasi selesai
    setTimeout(() => {
        element.classList.remove(
            'search-result-highlight',
            'search-result-flip',
            'search-result-pulse', 
            'search-result-slide',
            'search-result-neon',
            'search-result-shake',
            'search-result-zoom',
            'search-result-float',
            'search-result-confetti',
            'search-success-check'
        );
        
        // Hapus pseudo elements
        if (titleElement) {
            titleElement.style.width = '';
        }
    }, 3000);
}

function showSearchSuccess(movieKey) {
    const movie = movieData[movieKey];
    if (!movie) return;
    
    
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00a085);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 8px 25px rgba(0, 184, 148, 0.4);
        transform: translateX(400px) scale(0.8);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 300px;
        border-left: 4px solid #fff;
    `;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0) scale(1)';
        successDiv.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px) scale(0.8)';
        successDiv.style.opacity = '0';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 500);
    }, 3000);
}

// Enhanced search dengan sound effect (optional)
function playSearchSound() {
    // Create a simple success sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// ===========================
//  Responsive Carousel Initialization
// ===========================
function initializeResponsiveCarousel() {
    const carouselElem = document.querySelector('.carousel');
    if (!carouselElem) return;
    
    // Destroy existing instance jika ada
    const existingInstance = M.Carousel.getInstance(carouselElem);
    if (existingInstance) {
        existingInstance.destroy();
    }
    
    // Options berdasarkan screen size
    const options = {
        duration: 200,
        dist: -50,
        shift: 0,
        padding: 20,
        numVisible: getVisibleItems(),
        indicators: false,
        noWrap: false
    };
    
    // Re-initialize carousel
    M.Carousel.init(carouselElem, options);
    
    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const instance = M.Carousel.getInstance(carouselElem);
            if (instance) {
                instance.destroy();
                M.Carousel.init(carouselElem, {
                    ...options,
                    numVisible: getVisibleItems()
                });
            }
        }, 250);
    });
}

function getVisibleItems() {
    const width = window.innerWidth;
    if (width < 480) return 3;
    if (width < 768) return 4;
    if (width < 992) return 5;
    return 6;
}

// Update changeBg function untuk responsive
function changeBg(bg, title) {
    console.log('changeBg called with:', bg, title);
    
    const banner = document.querySelector('.banner');
    const contents = document.querySelectorAll('.content');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    // Update background dengan responsive consideration
    banner.style.background = `url("./images/background/${bg}") no-repeat center center / cover`;
    banner.style.backgroundAttachment = 'scroll'; // Untuk performa mobile

    // Update konten
    contents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(title)) {
            content.classList.add('active');
            console.log('Activated content:', title);
        }
    });

    // Find the index of the target movie in carousel
    let targetIndex = 0;
    carouselItems.forEach((item, index) => {
        const itemMovie = item.getAttribute('data-movie');
        if (itemMovie === title) {
            targetIndex = index;
            console.log('Found target index:', targetIndex);
        }
    });

    // Use Materialize Carousel API to move to the specific item
    const carouselElem = document.querySelector('.carousel');
    if (carouselElem) {
        const carouselInstance = M.Carousel.getInstance(carouselElem);
        if (carouselInstance) {
            console.log('Moving carousel to index:', targetIndex);
            carouselInstance.set(targetIndex);
        } else {
            console.log('No carousel instance found');
        }
    }

    currentMovie = title;
}