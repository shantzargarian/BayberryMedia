// Main slideshow logic after DOM is ready
window.addEventListener("DOMContentLoaded", function () {
    // Photo Slideshow Setup
    const photoSlideshowContainer = document.querySelector('.photo-slideshow-container');
    const photoPath = "content/Photos/";
    const totalPhotos = 21;
    const photos = [];
    for (let i = 1; i <= totalPhotos; i++) {
        photos.push(`${photoPath}image${i}.jpg`);
    }
    photos.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo Slide ${index + 1}`;
        slide.appendChild(img);
        photoSlideshowContainer.appendChild(slide);
    });

    // Video Slideshow Setup (manual only)
    const videoSlideshowContainer = document.querySelector('.video-slideshow-container');
    const videoPath = "content/Videos/";
    const totalVideos = 20;
    const videos = [];
    for (let i = 1; i <= totalVideos; i++) {
        videos.push(`${videoPath}video${i}.mp4`);
    }
    videos.forEach((src) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const video = document.createElement('video');
        video.controls = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = "video/mp4";
        video.appendChild(source);
        slide.appendChild(video);
        videoSlideshowContainer.appendChild(slide);
    });

    // Grab all slides and initialize state
    const photoSlides = document.querySelectorAll('.photo-slideshow-container .slide');
    const videoSlides = document.querySelectorAll('.video-slideshow-container .slide');
    let currentPhotoIndex = 0;
    let currentVideoIndex = 0;

    // Photo auto-advance timer (seconds)
    const photoIntervalSec = 5;
    let photoTimer;
    function startPhotoTimer() {
        photoTimer = setInterval(() => plusSlides(1, 'photo'), photoIntervalSec * 1000);
    }
    function resetPhotoTimer() {
        clearInterval(photoTimer);
        startPhotoTimer();
    }

    // Show slide helper
    function showSlides(index, type) {
        if (type === 'photo') {
            photoSlides.forEach((slide, i) => {
                slide.style.display = (i === index) ? 'block' : 'none';
            });
        } else {
            videoSlides.forEach((slide, i) => {
                const vid = slide.querySelector('video');
                if (i === index) {
                    slide.style.display = 'block';
                    vid && vid.play();
                } else {
                    slide.style.display = 'none';
                    vid && vid.pause();
                }
            });
        }
    }

    // Advance slides; reset photo timer on manual nav
    function plusSlides(n, type) {
        if (type === 'photo') {
            currentPhotoIndex = (currentPhotoIndex + n + photoSlides.length) % photoSlides.length;
            showSlides(currentPhotoIndex, 'photo');
            resetPhotoTimer();
        } else {
            currentVideoIndex = (currentVideoIndex + n + videoSlides.length) % videoSlides.length;
            showSlides(currentVideoIndex, 'video');
        }
    }

    // Initialize display and start auto for photos only
    showSlides(0, 'photo');
    showSlides(0, 'video');
    startPhotoTimer();

    // Manual navigation buttons
    document.querySelector('.prev-photo').addEventListener('click', () => plusSlides(-1, 'photo'));
    document.querySelector('.next-photo').addEventListener('click', () => plusSlides(1, 'photo'));
    document.querySelector('.prev-video').addEventListener('click', () => plusSlides(-1, 'video'));
    document.querySelector('.next-video').addEventListener('click', () => plusSlides(1, 'video'));

    // View-All Photo Gallery
    const totalGalleryPhotos = 26;
    if (document.querySelector('.photo-gallery')) {
        const photoGallery = document.querySelector('.photo-gallery');
        for (let i = 1; i <= totalGalleryPhotos; i++) {
            const img = document.createElement('img');
            img.src = `${photoPath}image${i}.jpg`;
            img.alt = `Photo ${i}`;
            img.classList.add('gallery-photo');
            photoGallery.appendChild(img);
        }
    }

    // View-All Video Gallery
    if (document.querySelector('.video-gallery')) {
        const videoGallery = document.querySelector('.video-gallery');
        for (let i = 1; i <= totalVideos; i++) {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('gallery-video');
            const video = document.createElement('video');
            video.controls = true;
            const source = document.createElement('source');
            source.src = `${videoPath}video${i}.mp4`;
            source.type = "video/mp4";
            video.appendChild(source);
            videoContainer.appendChild(video);
            videoGallery.appendChild(videoContainer);
        }
    }

    // Intersection Observer for reveal-on-scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('show', entry.isIntersecting));
    });
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // Booking form submission
    document.getElementById("bookingForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const name    = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const dateVal = document.getElementById("date").value;
        const details = document.getElementById("details").value;
        const dateObj = new Date(dateVal);
        const year  = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day   = dateObj.getDate();
        const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSeD7TMXGDoQPvF8X4W1lKZ9YUqSyWWI8j_ZaNHysKAMvdrT7Q/formResponse";
        const formData = new FormData();
        formData.append('entry.860149035', name);
        formData.append('entry.822860986', contact);
        formData.append('entry.1153792034_year', year);
        formData.append('entry.1153792034_month', month);
        formData.append('entry.1153792034_day', day);
        formData.append('entry.1550844614', details);
        fetch(googleFormURL, { method: "POST", mode: "no-cors", body: formData })
            .then(() => { alert("Your booking has been submitted!"); this.reset(); })
            .catch(error => console.error("Error:", error));
    });
});

// Smooth scroll helper
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element && element.scrollIntoView({ behavior: 'smooth' });
}