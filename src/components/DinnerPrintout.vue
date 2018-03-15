<template>
    <div id="dinner-printout">
        <div class="row">
            <div class="col-md-6">
                <h1>My Dinner: {{numberOfGuests}} people</h1>
            </div>
            <div class="col-md-6 text-right">
                <router-link to="/search" class="btn btn-primary">
                Go Back And Edit Dinner
                </router-link>                 
            </div>
        </div>

        <hr/>

        <div class="row" v-for="dish in menu" :key="dish.id">
            <div class="col-md-2">
                <img :src="dish.image" class="img img-circle img-responsive"/>
            </div>
            <div class="col-md-8">
                <h2>{{ dish.title }}</h2>
                <p>{{ dish.instructions }}</p>
                <hr/>
            </div>
        </div>
    </div>
</template>

<script>
  
  export default {
    props: ['model'],
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: this.model.getFullMenu(),
        totalPrice: this.model.getTotalMenuPrice()
      };
    },
    methods: {      
      dishPrice(dish) {
        return this.model.getTotalDishPrice(dish)
      }
    },
   
  }
</script>

