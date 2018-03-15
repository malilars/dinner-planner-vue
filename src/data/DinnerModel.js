const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let observers = [];

  this.setNumberOfGuests = function (num) {
    localStorage.setItem("numberOfGuests", num);
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return localStorage.getItem("numberOfGuests");
  };

  //Returns all the dishes on the menu.
	this.getFullMenu = function() {
    var menu = localStorage.getItem('menu');
    
    //When we start, it is empty so then we give an 
    //empty array instead of an empty string.
    if (menu === null)
    {
      return [];
    }

    return JSON.parse(
      menu
    );
	} 

  this.getTotalDishPrice = function(dish) {
		return (Math.round(dish.pricePerServing  * this.getNumberOfGuests()));
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
    var totalPrice = 0;
    //Look into every dish
    this.getFullMenu().forEach((dish) => {
      totalPrice += this.getTotalDishPrice(dish);
    });
    return totalPrice;
	}

	this.removeDishFromMenu = function(id) {
    var filteredDishes = this.getFullMenu().filter(function(dish) {
        //if the id is different than the id we want to remove, keep
        //it in the list but if it is different, we return false to
        return dish.id != id;
    });

    //Store it in local storage
    setMenuInLocalStorage(filteredDishes);
    notifyObservers();
	}

	this.addDishToMenu = function(dish) {
    
    //Get the current dishes from local storage
    var selectedDishes = this.getFullMenu();
    var alreadyExits = false;

    selectedDishes.forEach(function(selectedDish) {
			if (selectedDish.id === dish.id) {
        alreadyExits = true;
			}
    });

    if (alreadyExits)
    {
      return false;
    }

    //
    selectedDishes.push(dish)

    //Store it in local storage
    setMenuInLocalStorage(selectedDishes);
    notifyObservers();
	}

  // API Calls
  this.getDish = function(id) {

    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'
      + id + '/information?includeNutrition=false';

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)

  }

  this.getAllDishes = function (query, type) {
    const url = 
      'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?' +
      'type=' + type +
      '&query=' + query;
    
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // Helper methods
  const setMenuInLocalStorage = function(dishes) {
    localStorage.setItem(
      'menu', 
      JSON.stringify(dishes)
    );
  }

  // API Helper methods
  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern
  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
