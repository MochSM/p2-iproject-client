<template>
  <div class="d-flex">
    <!-- Map Display here -->
    <div class="map-holder w-100 min-vh-100">
      <div id="map" class="min-vh-100"></div>
    </div>
    <!-- Coordinates Display here -->
    <transition name="fade">
    <div v-if="getPickupLocation && getDestinationLocation"
      class="d-flex position-absolute rounded-1 shadow"
      style="width: 381px; margin: 10px; padding-top: 100px;">
      <div class="card bg-white shadow my-auto w-100">
        <ul class="list-group list-group-flush py-4">
          <li class="list-group-item border mx-3 my-1 rounded">
            <small class="d-block fw-bold">Pickup</small>
            {{ getPickupLocation }}
          </li>
          <li class="list-group-item border mx-3 my-1 rounded">
            <small class="d-block fw-bold">Destination</small>
            {{ getDestinationLocation }}
          </li>
        </ul>
        <div class="card-body border-bottom">
          <div class="row">
            <div class="d-flex gap-2">
              <button class="btn border w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" style="width:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ duration }}
              </button>
              <button class="btn border w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" style="width:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8
                  8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ distance }} km
              </button>
              <button class="btn border w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" style="width:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0
                  00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Rp. {{ price }}
              </button>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 px-3 py-3">
          <button class="btn btn-primary" @click="makeTrip" type="button">Order Trip</button>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MapBox',
  data() {
    return {
      map: {},
    };
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.btn-label {
  position: relative;
  left: -12px;
  display: inline-block;
  padding: 6px 12px;
  background: rgba(0,0,0,0.15);
  border-radius: 3px 0 0 3px;
}
.btn-labeled {
  padding-top: 0;
  padding-bottom: 0;}
.btn {
  margin-bottom: 10px;
}

@media screen and (min-width: 640px) {
  .mapboxgl-ctrl-top-left {
    background-color: #fff;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    border-radius: 0.2rem !important;
    margin: 10px;
    padding: 14px 10px;
  }
  .mapboxgl-ctrl-geocoder {
      width: 360px;
      font-size: 15px;
      line-height: 20px;
      max-width: 360px;
      margin: 0 0 5px !important;
  }
}
</style>
