class ToDoFormView {
    constructor(config) {
        this.config = config;
        this.$addBtn = $('#add-btn');
        this.$taskInput = $('#user-task-input');

        this.initForm();
    }

    initForm() {
        this.$addBtn.on("click", (e) => this.onAddBtnClick(e));
    }

    onAddBtnClick() {
        //console.log('add new task');
        
        const task = {
            title: this.$taskInput.val(),
            isDone: false,
        }

        //console.log(task.title);
        this.config.onAdd(task);
    }
}