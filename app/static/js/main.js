
const fileInput = document.getElementById('image'); 
const fileLabel = document.getElementById('file-label'); 


fileInput.addEventListener('change', function() {

    if (fileInput.files.length > 0) {
        fileLabel.textContent = fileInput.files[0].name; 
    } else {
        fileLabel.textContent = 'Upload Image'; 
    }
});



function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;


    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const countryInput = document.getElementById('country');

            if (data && data.address && data.address.country) {
                countryInput.value = data.address.country; 
            } else {
                countryInput.value = "Unknown Country"; 
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
        });
}


function showError(error) {
    const countryInput = document.getElementById('country');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            countryInput.value = "Permission Denied";
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            countryInput.value = "Location Unavailable";
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            countryInput.value = "Timeout";
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            countryInput.value = "Unknown Error";
            break;
    }
}

window.onload = getLocation;


function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}

document.getElementById('closePopup').addEventListener('click', closePopup);

function showNewsPreview(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const newsTitle = document.getElementById('newsTitle').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;

    document.getElementById('newsExcerpt').innerText = message.slice(0, 100) + '...';
    document.getElementById('newsTitlePreview').innerText = newsTitle;
    document.getElementById('categoryPreview').innerText = category;
    document.getElementById('authorPreview').innerText = `By ${firstName} ${lastName}`;

    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('uploadedImage');
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
    };
    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    }

    document.querySelector('.news-item').classList.remove('hidden');

    showPopup();
}

document.getElementById('newsForm').addEventListener('submit', showNewsPreview);
;

