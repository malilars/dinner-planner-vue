<template>
  <div class="Dishes">
    <div class="row">
      <div class="col-md-12">
        <h3>FIND A DISH</h3>
        <div class="form-inline">
          <div class="form-group">
            <input placeholder="Enter Keywords" type="text" class="form-control" v-model="query" />
          </div>             
          <div class="form-group">
            <select class="form-control" v-model="type">
                <option value="starter">Starter</option>
                <option value="main course">Main course</option>
                <option value="dessert">Dessert</option>
                <option value="antipasti">Antipasti</option>
                <option value="snack">Snack</option>
                <option value="appetizer">Appetizer</option>
                <option value="fingerfood">Fingerfood</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
          </div>
          <button class="btn btn-primary" @click="getDishes()">
              Search
          </button>
        </div>
      </div>
    </div>

    <h3>Dishes</h3>
    
    <em v-if='status === "LOADING"'>Loading...</em>
    
    <b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>
    
    <div v-else class="row">
      <div class="col-md-3" v-for="dish in dishes" :id="dish.id" :key="dish.id">
        <router-link :to="{ path: '/dish-detail/' + dish.id }">
          <div class="thumbnail dish-thumbnail">
            <img class="img-responsive" 
              :src="dish.image" />
            <div class="caption">
              <p>{{ dish.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property, 
  // we can import the model instance directly
  import { modelInstance } from "../data/DinnerModel";

  export default {
    // this methods is called by Vue lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      this.getDishes();
    },
    data() {
      return {
        status: 'LOADING',
        dishes: [],
        query: '',
        type: 'starter'
      }
    },
    methods: {
      getDishes: function() {
        this.status = 'LOADING';
        return modelInstance.getAllDishes(this.query, this.type).then(dishes => {
          this.status = 'LOADED'
          this.dishes = dishes.results
        }).catch(() => {
          this.status = 'ERROR'
        });
      }
    }
  }
</script>

<style scoped>
  .dish-thumbnail {
    height: 280px;
  }
</style>
