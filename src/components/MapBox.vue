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
import { mapGetters, mapActions } from 'vuex';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxDirection, mapboxGeocoding } from '../apis/mapbox';

export default {
  name: 'MapBox',
  data() {
    return {
      distance: 0,
      duration: 0,
      price: 0,
      center: [],
      map: {},
    };
  },
  computed: {
    ...mapGetters(['getPickup', 'getPickupLocation', 'getDestination', 'getDestinationLocation']),
  },
  created() {
    this.access_token = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  },
  mounted() {
    this.center = this.center.length > 1 ? this.center : [107.67389, -6.91333];
    this.createMap();
  },
  methods: {
    ...mapActions(['addTrip']),
    async makeTrip() {
      try {
        // if (this.$store.state.login.isAuthenticated) {
        console.log('clicked make trip');
        const payload = {
          pickup: this.getPickup,
          pickupLocation: this.getPickupLocation,
          destination: this.getDestination,
          destinationLocation: this.getDestinationLocation,
        };
        const response = await this.addTrip(payload);
        this.$toast.success(response);
        // } else {
        //   this.$router.push('/login').catch(() => {});
        // }
      } catch ({ data }) {
        this.$toast.error(data);
      }
    },
    showPosition(position) {
      const cordinates = [position.coords.longitude, position.coords.latitude];
      if (cordinates) {
        this.center = cordinates;
      } else {
        this.center = [107.67389, -6.91333];
      }
      console.log(cordinates);
    },
    async createMap() {
      try {
        mapboxgl.accessToken = this.access_token;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: this.center,
          zoom: 13,
          minZoom: 12,
        });

        // Add geolocate control to the map.
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          showAccuracyCircle: false,
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction
          // the device is heading.
          showUserHeading: true,
        });
        //
        this.map.addControl(geolocate, 'bottom-right');
        this.map.on('load', () => {
          geolocate.trigger();
          //! set pickup maybe.
        });
        // ? SAVE FOR LATER
        // geolocate.on('geolocate', () => {
        //   console.log(geolocate, 'A geolocate event has occurred.');
        // });

        // Add zoom and rotation controls to the map.
        this.map.addControl(new mapboxgl.NavigationControl({
          showCompass: false,
        }), 'bottom-right');

        // disable map zoom when using scroll
        // this.map.scrollZoom.disable();

        // geocoder and marker for Pickup.
        const geocoderDefault = {
          accessToken: this.access_token,
          mapboxgl,
          marker: false,
          countries: 'id',
          language: 'id',
        };
        const pickupGeocoder = new MapboxGeocoder({
          ...geocoderDefault,
          proximity: {
            latitude: this.getDestination[0],
            longitude: this.getDestination[1],
          },
          placeholder: 'Search for a pick-up',
        });
        const pickupMarker = new mapboxgl.Marker({
          draggable: true,
          color: '#D80739',
        });
        this.map.addControl(pickupGeocoder, 'top-left');
        pickupGeocoder.on('result', (e) => {
          pickupMarker
            .remove()
            .setLngLat(e.result.center)
            .addTo(this.map);
          // this.pickup = e.result.center;
          this.$store.commit('SET_PICKUP', e.result.center);
          if (this.getPickup.length > 1 && this.getDestination.length > 1) this.getDirection();
        });
        pickupMarker.on('dragend', (ev) => {
          // this.pickup = Object.values(ev.target.getLngLat());
          this.$store.commit('SET_PICKUP', Object.values(ev.target.getLngLat()));
          if (this.getPickup.length > 1 && this.getDestination.length > 1) this.getDirection();
        });
        /**
         * SET OF DESTINATION GEOCODER AND MARKER
        */
        const destinationGeocoder = new MapboxGeocoder({
          ...geocoderDefault,
          proximity: {
            latitude: this.getPickup[0],
            longitude: this.getPickup[1],
          },
          placeholder: 'Search for a destination',
        });
        this.map.addControl(destinationGeocoder, 'top-left');
        const destinationMarker = new mapboxgl.Marker({
          draggable: true,
          color: '#D80739',
        });
        destinationGeocoder.on('result', (e) => {
          destinationMarker
            .remove()
            .setLngLat(e.result.center)
            .addTo(this.map);
          // this.destination = e.result.center;
          this.$store.commit('SET_DESTINATION', e.result.center);
          if (this.getPickup.length > 1 && this.getDestination.length > 1) this.getDirection();
        });
        destinationMarker.on('dragend', (ev) => {
          // !PR kalo kekejar
          destinationGeocoder.setPlaceholder('Search for a destinationSearch for a destinationSearch for a destination'); // untuk set input.
          // this.destination = Object.values(ev.target.getLngLat());
          this.$store.commit('SET_DESTINATION', Object.values(ev.target.getLngLat()));
          if (this.getPickup.length > 1 && this.getDestination.length > 1) this.getDirection();
        });
        //
        /**
         * When user random click, will set as pickup first.
         * then second click set as destination.
         */
        this.map.on('click', (ee) => {
          if (this.getPickup.length < 2) {
            pickupMarker
              .remove()
              .setLngLat(Object.values(ee.lngLat))
              .addTo(this.map);
            this.$store.commit('SET_PICKUP', Object.values(ee.lngLat));
            //! PR: cari destination, lalu inject ke search bar.
          } else if (this.getDestination.length < 2) {
            destinationMarker
              .remove()
              .setLngLat(Object.values(ee.lngLat))
              .addTo(this.map);
            this.$store.commit('SET_DESTINATION', Object.values(ee.lngLat));
          }
          if (this.getPickup.length > 1 && this.getDestination.length > 1) this.getDirection();
        });
      } catch (err) {
        console.log('map error', err);
      }
    },
    async getLocation() {
      try {
        const pickup = await mapboxGeocoding({
          url: `${this.getPickup.join(',')}.json`,
        });
        const destination = await mapboxGeocoding({
          url: `${this.getDestination.join(',')}.json`,
        });
        console.log();
        this.$store.commit('SET_PICKUP_LOCATION', pickup.data.features[0].place_name.split(',').splice(0, 2).join(','));
        this.$store.commit('SET_DESTINATION_LOCATION', destination.data.features[0].place_name.split(',').splice(0, 2).join(','));
      } catch (err) {
        console.log(err);
      }
    },
    async getDirection() {
      try {
        const response = await mapboxDirection({
          url: `${this.getPickup.join(',')};${this.getDestination.join(',')}`,
        });
        // remove resources if exist
        if (this.map.getSource('route')) {
          this.map
            .removeLayer('route')
            .removeSource('route');
        }
        const geoJson = {
          type: 'Feature',
          properties: {},
          geometry: response.data.routes[0].geometry,
        };
        this.map.addSource('route', {
          type: 'geojson',
          data: geoJson,
        });
        // kemudian menambah layer dengan sumber data dari route
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 8,
          },
        });
        this.getLocation();
        // manual calculation
        this.distance = (+response.data.routes[0].distance / 1000).toFixed(0);
        const duration = new Date((+response.data.routes[0].duration * 1000));
        this.duration = duration.toISOString().split('T')[1].slice(0, 5); // .toISOString().split('T')[1].splice(0);
        this.price = (this.distance * 1000 + 10000).toFixed(0).slice(0, -3) * 1000;

        const { coordinates } = geoJson.geometry;
        const bounds = new mapboxgl.LngLatBounds(
          coordinates[0],
          coordinates[0],
        );
        // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
        coordinates.forEach((el) => {
          bounds.extend(el);
        });
        this.map.fitBounds(bounds, {
          padding: {
            top: 10, bottom: 25, left: 300, right: 5,
          },
        });
      } catch (error) {
        console.log(error.response);
      }
    },
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
