<template>
  <div class="dish-detail">
    <div class="row">
      <div class="col-md-3">
        <sidebar :model="this.model" />
      </div>
      <div class="col-md-9">
  
        <div id="dish-details">
          <div class="row">
            <div class="col-md-6">
              <h2>{{ dish.title }}</h2>
              <img :src="dish.image" class="img img-responsive" />
              <h4>Preperations</h4>
              <p>{{ dish.instructions }}</p>
              <router-link to="/search" class="btn btn-info">
                &#171; Back to search
              </router-link>
            </div>

            <div class="col-md-6">
              <div class="panel panel-default">
                <div class="panel-heading">Ingredients for {{ numberOfGuests }} people</div>
                <div class="panel-body">
                  <table class="table ingredients-table">
                    <tbody>
                      <tr v-for="ingredient in dish.extendedIngredients" :key="ingredient.id">
                        <td>{{ ((ingredient.amount).toFixed(2) * numberOfGuests) }} {{ ingredient.unit }}</td>
                        <td>{{ ingredient.name }}</td>
                        <td><img :src="ingredient.image" width="40" class="img img-circle img-responsive" /></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan="2">
                          <button @click="addDishToMenu()" class="btn btn-primary">Add to menu</button>
                        </th>
                        <th>SEK {{ Math.round(dish.pricePerServing * numberOfGuests) }}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'
  
  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar
    },
    created() {
      //Add ourselves as an observer
      this.model.addObserver(this);
    },
    data() {
      return {
        dish: {},
        numberOfGuests: this.model.getNumberOfGuests()
      };
    },
    methods: {
      //This will be called from the model when something changes
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests();
      },
      addDishToMenu() {
        this.model.addDishToMenu(this.dish);
      }
    },
    mounted() {
      //Get the this with the id from the route
      this.model.getDish(this.$route.params.id).then(data => {
        this.dish = data;
      });
    },
  }
</script>

<style scoped>
  .ingredients-table td {
    vertical-align: middle;
  }
</style>