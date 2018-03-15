<template>
  <div class="welcome text-center">
    <p class="text-center">
      {{ msg }}
    </p>
    <router-link to="/search">
      <button class="btn btn-primary">Start planning!</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to the dinner planner! Please enjoy your meal!'
      }
    }
  }
</script>

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>

</style>
