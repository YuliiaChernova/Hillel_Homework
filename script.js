$(() => { 
    const $fotoramaDiv = $('#fotorama').fotorama();
    const fotorama = $fotoramaDiv.data('fotorama');

    let albumsList = [];
    let photosList = [];
    let arrToAdd = [];

    init();
    
    function init() {
        getAlbums();
    }

    function getAlbums() {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then((response) => response.json())
            .then((data) => (albumsList = data))
            .then(showPhotos);
    }

    function showPhotos() {
        getPhotos(albumsList[0].id);
    }

    function getPhotos(id) {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId='+id)
            .then((response) => response.json())
            .then((data) => (photosList = data))
            .then(() => createObjectsArrToAdd(photosList))
            .then(() => fotorama.load(arrToAdd));
    }

    function createImgObjTemplate(obj) {
        const objToAdd = {
            img: obj.url,
            thumb: obj.thumbnailUrl,
        }

        return objToAdd;
    }

    function createObjectsArrToAdd(arr) {

        for (let i = 0; i < arr.length; i++) {
            arrToAdd.push(createImgObjTemplate(arr[i]));
        }
    }
});