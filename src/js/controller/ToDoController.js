class ToDoController {
    constructor(){
        //console.log('controller created');
        this.$container = $('.container')

        this.listView = new ToDoListView();
        this.formView = new ToDoFormView();

        this.$container.append(this.listView.$el);

       // console.log(this.listView);

       this.collection = new ToDoCollection();
       this.collection.getData()
        .then(()=> {
            this.listView.render(this.collection.list)
            //console.log(this.collection.list);
        });
    }
}