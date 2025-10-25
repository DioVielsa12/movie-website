// adults.js - Enhanced version dengan DoodStream
function playMovie(movieKey) {
    const movie = movieData[movieKey];
    if (!movie || !movie.doodstreamId) {
        showNotification('Movie not available for streaming');
        return;
    }

    showDoodStreamPlayer(movie.doodstreamId, movie.title);
}

function showDoodStreamPlayer(doodstreamId, title) {
    const videoHTML = `
        <div class="video-player-overlay" onclick="closeVideoPlayer()">
            <div class="video-player-container" onclick="event.stopPropagation()">
                <div class="video-header">
                    <h3>${title}</h3>
                    <button class="close-btn" onclick="closeVideoPlayer()">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="video-wrapper">
                    <iframe 
                        src="https://doodstream.com/e/${doodstreamId}"
                        frameborder="0" 
                        allowfullscreen
                        allow="autoplay; encrypted-media"
                        scrolling="no"
                    ></iframe>
                </div>
                <div class="video-info">
                    <p>Streaming via DoodStream</p>
                </div>
            </div>
        </div>
    `;
    
    showCustomVideoPlayer(videoHTML);
}

function showCustomVideoPlayer(htmlContent) {
    let videoContainer = document.getElementById('custom-video-player');
    
    if (!videoContainer) {
        videoContainer = document.createElement('div');
        videoContainer.id = 'custom-video-player';
        videoContainer.className = 'custom-video-player';
        document.body.appendChild(videoContainer);
    }
    
    videoContainer.innerHTML = htmlContent;
    videoContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoPlayer() {
    const videoContainer = document.getElementById('custom-video-player');
    if (videoContainer) {
        videoContainer.style.display = 'none';
        videoContainer.innerHTML = '';
    }
    document.body.style.overflow = 'auto';
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeVideoPlayer();
    }
});