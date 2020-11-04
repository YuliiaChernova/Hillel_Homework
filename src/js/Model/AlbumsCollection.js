import {ALBUMS_URL} from '../config.js'

export default class AlbumsCollection {
    constructor() {
        this.albumsList = [];
    }

    getAlbums() {
        return fetch(ALBUMS_URL)
            .then((response) => response.json())
            .then((data) => this.albumsList = data);
    }
}