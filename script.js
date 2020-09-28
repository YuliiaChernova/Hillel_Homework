const ALBUM_CLASS = 'album';
const PHOTO_CASS = 'photo';

const albumTemplate = document.getElementById('albumTemplate').innerHTML;
const photoTemplate = document.getElementById('photoTemplate').innerHTML;

const albumsContainer = document.getElementById('albums-container');

let albumsList = [];

function getAlbums() {
    fetch('https://jsonplaceholder.typicode.com/albums')
        .then((response) => response.json())
        .then((data) => (albumsList = data));
}

function renderOneAlbum(album) {
    const htmlAlbum = albumTemplate.replace('{{album-title}}', album.title);

    console.log(htmlAlbum);
    albumsContainer.insertAdjacentHTML('beforeend', htmlAlbum);
}

function renderAllAlbums(albums) {
    for (let i = 0; i < albums.length; i++) {
        renderOneAlbum(albums[i]);
    }
}

getAlbums();

renderAllAlbums(albumsList);
