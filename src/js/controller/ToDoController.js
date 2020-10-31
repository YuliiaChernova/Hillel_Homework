class ToDoController {
    constructor(){
        this.$container = $('.container')

        this.listView = new ToDoListView({
            onToggle: (id) => this.onToggle(id),
            onDelete: (id) => this.onDelete(id),
        });

        this.formView = new ToDoFormView({
            onAdd: (task) => this.onAdd(task),
        });

        this.$container.append(this.listView.$el);

        this.collection = new ToDoCollection();
        this.collection.getData()
            .then(()=> {
                this.listView.render(this.collection.list)
            });
    }
    
    onToggle(id){
        this.collection.toggle(id)
            .then(()=> this.listView.render(this.collection.list))
    }

    onDelete(id){
        this.collection.delete(id)
            .then(() => this.listView.render(this.collection.list));
    }

    onAdd(task){
        //console.log('controller get', task);
        this.collection.addTask(task)
            .then(()=> this.listView.render(this.collection.list));

    }
 }