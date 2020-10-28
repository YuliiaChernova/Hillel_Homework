$(() => { 
    const $fotoramaDiv = $('#fotorama').fotorama();
    const fotorama = $fotoramaDiv.data('fotorama');
    let photosList = [];


    API.getPhotos().then((data) => (photosList = data))
                   .then(() => createObjectsArrToAdd(photosList))
                   .then((arrToAdd) => fotorama.load(arrToAdd));

                   
    function createImgObjTemplate(obj) {
        const objToAdd = {
            img: obj.url,
            thumb: obj.thumbnailUrl,
        }

        return objToAdd;
    }

    function createObjectsArrToAdd(arr) {

        let arrToAdd = [];

        for (let i = 0; i < arr.length; i++) {
            arrToAdd.push(createImgObjTemplate(arr[i]));
        }

        return arrToAdd;
    }
});