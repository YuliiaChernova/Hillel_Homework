import AlbumsView from '../view/AlbumsView';
import PhotosView from '../view/PhotosView';
import AlbumsCollection from '../model/AlbumsCollection';
import PhotosCollection from '../model/PhotosCollection';

export default class GalleryController {
    constructor() {

        this.albumsView = new AlbumsView({
            onAlbum: (id) => this.getAndRenderPhotos(id),
        });
        this.photosView = new PhotosView();

        this.albumsCollection = new AlbumsCollection();
        this.photosCollection = new PhotosCollection();

        $('#gallery-container').append(this.albumsView.$albumsList)
                               .append(this.photosView.$photosList);

        this.albumsCollection.getAlbums()
            .then(() => {
                this.albumsView.render(this.albumsCollection.albumsList)
            })
            .then(()=> {
                this.getAndRenderPhotos(this.albumsCollection.albumsList[0].id)
            })
                /*this.photosCollection.getPhotos(this.albumsCollection.albumsList[0].id)
            .then(() => {
                this.photosView.render(this.photosCollection.photosList)
                })
            })
            */


    }

    getAndRenderPhotos(id) {
        this.photosCollection.getPhotos(id)
            .then(() => {
                this.photosView.render(this.photosCollection.photosList)
            })
    }

    /*onAlbum(id) {
        () => this.getAndRenderPhotos(id)
    */
        /*this.photosCollection.getPhotos(id)
            .then(() => {
                this.photosView.render(this.photosCollection.photosList)
            })
    }*/

}