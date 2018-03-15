<template>
<div id="dinner-overview">
            <div class="row">
                <div class="col-md-6">
                    <h1>My Dinner: {{numberOfGuests}} People</h1>
                </div>
                <div class="col-md-6 text-right">
                  <router-link to="/search" class="btn btn-primary">
                  Go Back And Edit Dinner
                  </router-link>                
                </div>
            </div>
            <hr/>
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-3 dish" v-for="dish in menu" :key="dish.id">
                            <img :src="dish.image" class="img img-responsive"/>
                            <p>{{dish.title}}</p>
                            <p>SEK {{dishPrice(dish)}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h3>Total</h3>
                    <p>{{totalPrice}}SEK</p>
                </div>
            </div>

            <hr/>

            <div class="row">
                <div class="col-md-12 text-center">
                <router-link to="/dinner-printout" class="btn btn-success">
                  Print Full Recepie
                </router-link>
                </div>    
            </div>

            <hr/>
        </div>
         
</template>

<script>
  
  export default {
    props: ['model'],
    components: {
    },
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
<style>
  .dish {
    height: 250px;
  }
</style>


