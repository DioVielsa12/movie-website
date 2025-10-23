function loadMyList() {
    const myList = JSON.parse(localStorage.getItem('myList')) || [];
    const movieList = document.getElementById('movie-list');
    const emptyList = document.getElementById('empty-list');
    
    if (myList.length === 0) {
        movieList.style.display = 'none';
        emptyList.style.display = 'block';
        return;
    }
    
    emptyList.style.display = 'none';
    movieList.style.display = 'grid';
    
    movieList.innerHTML = myList.map(movieKey => {
        const movie = movieData[movieKey];
        if (!movie) return '';
        
        return `
            <div class="movie-card">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div class="movie-overlay">
                        <div class="movie-info">
                            <h4>${movie.title}</h4>
                            <p>${movie.year} • ${movie.duration} • ${movie.genre}</p>
                            <div class="movie-actions">
                                <button class="btn-watch" onclick="playMovie('${movieKey}')">
                                    <i class="fa fa-play"></i> Watch
                                </button>
                                <button class="btn-remove" onclick="removeFromList('${movieKey}')">
                                    <i class="fa fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function removeFromList(movieKey) {
    let myList = JSON.parse(localStorage.getItem('myList')) || [];
    myList = myList.filter(item => item !== movieKey);
    localStorage.setItem('myList', JSON.stringify(myList));
    loadMyList();
    showNotification('Movie removed from your list!');
}

// Add remove button style
const style = document.createElement('style');
style.textContent = `
    .btn-remove {
        padding: 8px 15px;
        border: none;
        border-radius: 4px;
        font-size: 0.9em;
        cursor: pointer;
        transition: background 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
        background: #ff4444;
        color: #fff;
    }
    
    .btn-remove:hover {
        background: #ff6666;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    loadMyList();
    initializeSearch();
});