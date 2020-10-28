const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';

const API = {
    getPhotos: () => {
        return fetch(PHOTOS_URL).then((response) => response.json());
    }
};