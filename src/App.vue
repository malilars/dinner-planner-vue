<template>
  <div id="app" class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron">
                <h1 class="text-center">Dinner Planner</h1>
            </div>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
