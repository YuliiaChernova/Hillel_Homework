class ToDoListView {
    constructor(config) {

        this.$el = this.initView();
        this.config = config;
    }

    initView() {
        return $(`<div id="task-list"></div>`)
            .on('click', '.task-item', (e) => this.onItemClick(e))
            .on('click', '.delete-btn', (e) => this.onDeleteBtnClick(e))
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

    onItemClick(e) {
        const id = $(e.target).data('todoId');
        this.config.onToggle(id);
    }

    onDeleteBtnClick(e) {
        e.stopPropagation()
        const id = $(e.target).closest('.task-item').data('todoId');
        this.config.onDelete(id);
    }
}