export default class PhotosView {
    constructor() {
        this.$photosList = this.initPhotosList();
    }

    initPhotosList() {
        return $(`<div id="photos-container"></div>`);
    }

    render(list) {
        this.$photosList.html(list.map(this.getPhotosTemplate).join('\n'));
    }

    getPhotosTemplate(photo) {
        return `<img src="${photo.url}" alt="${photo.title}" class="photo">`
    }

}