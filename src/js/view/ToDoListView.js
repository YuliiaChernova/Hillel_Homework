class ToDoListView {
    constructor() {
        //console.log('list class created');

        this.$el = this.initView;
        //console.log(this.$el);
    }

    initView() {
        return $(`<div id="task-list"></div>`)
    }


    getTodoTemplate(todoItem) {
        return `<div class="task-item ${todoItem.isDone ? 'done' : ''}" data-todo-id="${todoItem.id}">
                    ${todoItem.title}
                    <span class="delete-btn">✘</span>
                </div>`
    }

    render(list){
        this.$el.html(list.map(this.getTodoTemplate).join('\n'));
    }
}