// Common functions for movie pages
function playMovie(movieKey) {
    const movie = movieData[movieKey];
    if (movie && movies[movieKey]) {
        const video = document.querySelector('.trailer .video');
        const trailer = document.querySelector('.trailer');
        
        if (video && trailer) {
            video.src = movies[movieKey];
            video.querySelectorAll('track').forEach(track => track.remove());
            
            if (subtitles[movieKey]) {
                const track = document.createElement("track");
                track.kind = "subtitles";
                track.label = "Bahasa Indonesia";
                track.srclang = "id";
                track.src = subtitles[movieKey];
                track.default = true;
                video.appendChild(track);
            }
            
            video.load();
            trailer.classList.add('active');
            video.play();
        }
    }
}

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
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function closeVideo() {
    const trailer = document.querySelector('.trailer');
    const video = document.querySelector('.trailer .video');
    
    if (trailer && video) {
        trailer.classList.remove('active');
        video.pause();
        video.currentTime = 0;
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});