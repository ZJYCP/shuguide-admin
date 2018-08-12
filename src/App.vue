<template lang="html">
  <div id="app" v-cloak>
      <router-view></router-view>
</div>
</template>


<script>

import {mapState} from 'vuex'
export default {
  components:{

  },
  methods:{
  },
  computed:mapState(['progress']),

  mounted(){
  }
}
</script>

<style lang="css">

  #app{
    height: 100%;
  }
</style>
