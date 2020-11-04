import {PHOTOS_URL} from '../config.js'

export default class PhotosCollection {
    constructor() {
        this.photosList = [];
    }

    getPhotos(id) {
        return fetch(PHOTOS_URL + id)
            .then((response) => response.json())
            .then((data) => (this.photosList = data))
    }
}