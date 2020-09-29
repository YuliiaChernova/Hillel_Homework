const ALBUM_CLASS = 'album';
const PHOTO_CASS = 'photo';

const albumTemplate = document.getElementById('albumTemplate').innerHTML;
const photoTemplate = document.getElementById('photoTemplate').innerHTML;

const albumsContainer = document.getElementById('albums-container');
const photosContainer = document.getElementById('photos-container');

let albumsList = [];
let photosList = [];

function getAlbums() {
    fetch('https://jsonplaceholder.typicode.com/albums')
        .then((response) => response.json())
        .then((data) => (albumsList = data))
        .then(renderAllAlbums);
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

getAlbums();
getPhotos(albumsList[0].id);