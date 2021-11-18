<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <map-box></map-box>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import MapBox from '../components/MapBox.vue';

export default {
  name: 'Home',
  components: {
    MapBox,
  },
};
</script>

<style>
.home {
  min-height: 100vh;
}
</style>
