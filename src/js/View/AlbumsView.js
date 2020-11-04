export default class AlbumsView {
    constructor(config) { 

        this.config = config;
        this.$albumsList = this.initAlbumsList();  
    }

    initAlbumsList() {
        return $(`<div id="albums-container"></div>`)
                    .on('click', '.album', (e) => this.onAlbumClick(e))
    }

    render(list) {
        this.$albumsList.html(list.map(this.getAlbumTemplate).join('\n'));
    }

    getAlbumTemplate(album) {
        return `<div class="album" data-album-id="${album.id}">${album.title}</div>`
    }

    onAlbumClick(e) {
        const id = $(e.target).data('albumId');
        this.config.onAlbum(id);
    }
}