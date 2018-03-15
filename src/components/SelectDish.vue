<template>
  <div class="select-dish">
    <!-- We pass the model as property to the Sidebar component -->
    <div class="row">
      <div class="col-md-3">
        <sidebar :model="this.model"/>
      </div>
      <div class="col-md-9">
        <dishes :model="this.model"/>
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
      'sidebar': Sidebar,
      'dishes': Dishes,
    }
  }
</script>
