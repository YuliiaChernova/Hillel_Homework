class Accordeon {
    static CONTENT_CLASS = 'accordeon-content';
    static TITLE_CLASS = 'accordeon-title';
    static VISIBLE_CLASS = 'accordeon-visible';
    static HIDDEN_CLASS = 'accordeon-hidden';

    constructor(container) {
        this._container = container;
        console.log('Accordeon started');

        this.bindClasses();
        this.bindEventListener();
    }

    bindClasses() {
        const contentElements = this._container.querySelectorAll('.content');

        for (let i = 0; i < contentElements.length; i++) {
            contentElements[i].classList.add(Accordeon.CONTENT_CLASS);
        }

        const titleElements = this._container.querySelectorAll('.title');
        for (let i = 0; i < titleElements.length; i++) {
            titleElements[i].classList.add(Accordeon.TITLE_CLASS);
        }
    }

    bindEventListener() {
        this._container.addEventListener('click', (event) => {
            switch (true) {
                case event.target.parentNode.classList.contains(Accordeon.VISIBLE_CLASS) && 
                     event.target.classList.contains(Accordeon.TITLE_CLASS):
                    this.hideCurrentItem(event.target.parentNode);
                    break;
                case event.target.classList.contains(Accordeon.TITLE_CLASS):
                    this.hideAllItems();
                    this.showCurrentItem(event.target.parentNode);
                    break;
            }
        });
    }

    hideCurrentItem(el) {
        el.classList.remove(Accordeon.VISIBLE_CLASS);
    }

    showCurrentItem(el) {
        el.classList.add(Accordeon.VISIBLE_CLASS); 
    }

    hideAllItems() {
        const items = this._container.querySelectorAll('.item');

        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove(Accordeon.VISIBLE_CLASS);
            items[i].classList.add(Accordeon.HIDDEN_CLASS);
        }
    }
}