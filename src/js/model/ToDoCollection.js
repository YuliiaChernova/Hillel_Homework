class ToDoCollection {
    constructor() {
        console.log('collection created');

        this.list = [];
    }

    getData() {
        return fetch(TODOS_URL)
                .then((result) => result.json())
                .then((data) => this.list = data);
    }
}