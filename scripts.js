document.addEventListener("DOMContentLoaded", function () {
    // Photo Slideshow
    const photoSlideshowContainer = document.querySelector('.photo-slideshow-container');
    const photoPath = "content/Photos/";
    const totalPhotos = 21; // Number of photos
    const photos = [];

    for (let i = 1; i <= totalPhotos; i++) {
        photos.push(`${photoPath}image${i}.jpg`);
    }

    // Generate photo slides
    photos.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo Slide ${index + 1}`;
        slide.appendChild(img);
        photoSlideshowContainer.appendChild(slide);
    });

    // Video Slideshow
    const videoSlideshowContainer = document.querySelector('.video-slideshow-container');
    const videoPath = "content/Videos/";
    const totalVideos = 20; // Number of videos
    const videos = [];

    for (let i = 1; i <= totalVideos; i++) {
        videos.push(`${videoPath}video${i}.mp4`);
    }

    // Generate video slides
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

    // Slideshow logic
    let currentPhotoIndex = 0;
    let currentVideoIndex = 0;
    const photoSlides = document.querySelectorAll('.photo-slideshow-container .slide');
    const videoSlides = document.querySelectorAll('.video-slideshow-container .slide');

    // Initialize the first slides
    showSlides(0, 'photo');
    showSlides(0, 'video');

    function plusSlides(n, type) {
        if (type === 'photo') {
            currentPhotoIndex += n;
            if (currentPhotoIndex >= photoSlides.length) { currentPhotoIndex = 0; }
            if (currentPhotoIndex < 0) { currentPhotoIndex = photoSlides.length - 1; }
            showSlides(currentPhotoIndex, 'photo');
        } else if (type === 'video') {
            currentVideoIndex += n;
            if (currentVideoIndex >= videoSlides.length) { currentVideoIndex = 0; }
            if (currentVideoIndex < 0) { currentVideoIndex = videoSlides.length - 1; }
            showSlides(currentVideoIndex, 'video');
        }
    }

    function showSlides(index, type) {
        if (type === 'photo') {
            photoSlides.forEach(slide => slide.style.display = "none");
            photoSlides[index].style.display = "block";
        } else if (type === 'video') {
            videoSlides.forEach(slide => {
                slide.style.display = "none";
                const videoElement = slide.querySelector('video');
                if (videoElement) {
                    videoElement.pause(); // Pause all videos that are not active
                }
            });
            videoSlides[index].style.display = "block";
        }
    }

    // Event listeners for navigation buttons
    document.querySelector('.prev-photo').addEventListener('click', () => plusSlides(-1, 'photo'));
    document.querySelector('.next-photo').addEventListener('click', () => plusSlides(1, 'photo'));
    document.querySelector('.prev-video').addEventListener('click', () => plusSlides(-1, 'video'));
    document.querySelector('.next-video').addEventListener('click', () => plusSlides(1, 'video'));


    const totalGalleryPhotos = 26;
    // Handling the View All Photos and Videos Pages
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

    if (document.querySelector('.video-gallery')) {
        const videoGallery = document.querySelector('.video-gallery');
        for (let i = 1; i <= totalVideos; i++) {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('gallery-video');

            const video = document.createElement('video');
            video.controls = true;

            const source = document.createElement('source');
            source.src = `${videoPath}video${i}.mov`;
            source.type = "video/mp4";

            video.appendChild(source);
            videoContainer.appendChild(video);
            videoGallery.appendChild(videoContainer);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show'); 
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    document.getElementById("bookingForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let name = document.getElementById("name").value;
        let contact = document.getElementById("contact").value;
        let dateValue = document.getElementById("date").value;
        let details = document.getElementById("details").value;
        
        let dateObj = new Date(dateValue);
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth() + 1; // JS months are 0-based
        let day = dateObj.getDate();
    
        let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSeD7TMXGDoQPvF8X4W1lKZ9YUqSyWWI8j_ZaNHysKAMvdrT7Q/formResponse";
        
        let formData = new FormData();
        formData.append('entry.860149035', name);
        formData.append('entry.822860986', contact);
        formData.append('entry.1153792034_year', year);
        formData.append('entry.1153792034_month', month);
        formData.append('entry.1153792034_day', day); 
        formData.append('entry.1550844614', details);
        
        fetch(googleFormURL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        })
        .then(() => {
            alert("Your booking has been submitted!");
            document.getElementById("bookingForm").reset();
        })
        .catch((error) => console.error("Error:", error));
    });
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}