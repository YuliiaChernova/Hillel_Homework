const ALBUM_CLASS = 'album';

const albumTemplate = document.getElementById('albumTemplate').innerHTML;
const photoTemplate = document.getElementById('photoTemplate').innerHTML;

const albumsContainer = document.getElementById('albums-container');
const photosContainer = document.getElementById('photos-container');

let albumsList = [];
let photosList = [];

albumsContainer.addEventListener('click', onAlbumsContainerClick);

function onAlbumsContainerClick(event) {
    if(event.target.classList.contains(ALBUM_CLASS)) {
        clearphotosContainer();
        showAlbumPhotos(event.target);
    }
}

function showAlbumPhotos(el) {
    const albumId = +el.dataset.albumId;
    getPhotos(albumId);
}


function getAlbums() {
    fetch('https://jsonplaceholder.typicode.com/albums')
        .then((response) => response.json())
        .then((data) => (albumsList = data))
        .then(showPhotosFirstTime)
        .then(renderAllAlbums);
}

function showPhotosFirstTime() {
    getPhotos(albumsList[0].id);
}

function getPhotos(id) {
    fetch('https://jsonplaceholder.typicode.com/photos?albumId='+id)
        .then((response) => response.json())
        .then((data) => (photosList = data))
        .then(renderAllPhotos);
}

function renderOneAlbum(album) {
    const htmlAlbum = albumTemplate.replace('{{album-title}}', album.title)
                                   .replace('{{album-id}}', album.id);
    albumsContainer.insertAdjacentHTML('beforeend', htmlAlbum);
}

function renderAllAlbums() {
    albumsList.forEach(album => renderOneAlbum(album));
}

function renderOnePhoto(photo) {
    const htmlPhoto = photoTemplate.replace('{{photo-url}}', photo.url)
                                   .replace('{{photo-title}}', photo.title);

    photosContainer.insertAdjacentHTML('beforeend', htmlPhoto);
}

function renderAllPhotos() {
    photosList.forEach(photo => renderOnePhoto(photo));
}

function clearphotosContainer() {
    photosContainer.innerHTML = '';
}

getAlbums();