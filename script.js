function Hamburger(size) {
    this.size = size;
    this.price = 0;
    this.calories = 0;

    switch(this.size) {
        case Hamburger.SIZE_SMALL:
            this.price = Hamburger.SIZE_SMALL.price;
            this.calories = Hamburger.SIZE_SMALL.calories;
            break;
        case Hamburger.SIZE_MEDIUM:
            this.price = Hamburger.SIZE_MEDIUM.price;
            this.calories = Hamburger.SIZE_MEDIUM.calories;
            break;
        case Hamburger.SIZE_LARGE:
            this.price = Hamburger.SIZE_LARGE.price;
            this.calories = Hamburger.SIZE_LARGE.calories;
            break;
    }
};

Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20,
};

Hamburger.SIZE_MEDIUM = {
    price: 75,
    calories: 30,
};

Hamburger.SIZE_LARGE = {
    price: 100,
    calories: 40,
};


Hamburger.TOPPING_CHEESE = {
    price: 10,
    calories: 20,
};

Hamburger.TOPPING_SALAD = {
    price: 20,
    calories: 5,
};

Hamburger.TOPPING_POTATO = {
    price: 15,
    calories: 10,
};

Hamburger.TOPPING_SPICE = {
    price: 15,
    calories: 0,
};

Hamburger.TOPPING_MAYO = {
    price: 20,
    calories: 5,
};

Hamburger.prototype.addTopping = function(topping) {
    switch(topping) {
        case Hamburger.TOPPING_CHEESE:
            this.price += Hamburger.TOPPING_CHEESE.price;
            this.calories += Hamburger.TOPPING_CHEESE.calories;
            break;
        case Hamburger.TOPPING_SALAD:
            this.price += Hamburger.TOPPING_SALAD.price;
            this.calories += Hamburger.TOPPING_SALAD.calories;
            break;
        case Hamburger.TOPPING_POTATO:
            this.price += Hamburger.TOPPING_POTATO.price;
            this.calories += Hamburger.TOPPING_POTATO.calories;
            break;
        case Hamburger.TOPPING_SPICE:
            this.price += Hamburger.TOPPING_SPICE.price;
            this.calories += Hamburger.TOPPING_SPICE.calories;
            break;
        case Hamburger.TOPPING_MAYO:
            this.price += Hamburger.TOPPING_MAYO.price;
            this.calories += Hamburger.TOPPING_MAYO.calories;
            break;
    };
    return 'add topping';
};

Hamburger.prototype.getPrice = function() {
    return 'price: ' + this.price;
};

Hamburger.prototype.getCalories = function() {
    return 'calories ' + this.calories;
};



const firstHambuger = new Hamburger();