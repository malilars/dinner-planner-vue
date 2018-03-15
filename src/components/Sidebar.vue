<template>
  <div class="sidebar">
    <h2>My Dinner</h2>
    <hr/>
    <div class="form-group">
      <label>Number of People</label>
      <input :value="numberOfGuests" @input="onDidChangeNumberOfGuests" 
        @change="onDidChangeNumberOfGuests" class="form-control" type="number"/>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Dish Name</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dish in menu" :key="dish.id">
          <td @click="remove(dish.id)">&#10005; {{ dish.title }}</td>
          <td>{{totalDishPrice(dish)}}</td>  
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td>SEK {{ totalMenuPrice }}</td>
        </tr>
      </tfoot>
    </table>
    <router-link to="/dinner-overview">
      <button id= "confirm-dinner-button" class="btn btn-success btn-block" :disabled="menu.length == 0">Confirm dinner</button>
    </router-link>
    <p>
      <br/>
      Total number of guests: {{ numberOfGuests }}
    </p>
  </div>
</template>

<script>
  export default {
    props: ['model'],
    // this methods is called by React lifecycle when the 
    // component is created that's a good place to setup model observer
    created() {
      this.model.addObserver(this)
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      this.model.removeObserver(this)
    },

    // we define and initalise the data we want to use and modify in the component
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: this.model.getFullMenu(),
        totalMenuPrice: this.model.getTotalMenuPrice()
      }
    },

    methods: {
      // in our update function we modify the the property of 
      // the compoented which will cause the component to re-render
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests();
        this.menu = this.model.getFullMenu();
        this.totalMenuPrice = this.model.getTotalMenuPrice()
      },

      remove(id) {
        this.model.removeDishFromMenu(id);
      },

      // our handler for the input's on change event
      onDidChangeNumberOfGuests(e) {
        this.model.setNumberOfGuests(+e.target.value)
      },

      totalDishPrice(dish) {
        //should return from model. This is just a dummy.
        return this.model.getTotalDishPrice(dish);
      }
    }
  }
</script>
