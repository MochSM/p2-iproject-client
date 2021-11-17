// import mapboxDirection from '@/apis/mapbox';
import axios from '@/apis/server';

export default {
  state: {
    pickupLocation: '',
    destinationLocation: '',
    distance: 0,
    duration: 0,
    price: 0,
    center: [],
    pickup: [],
    destination: [],
  },
  mutations: {
    SET_PICKUP(state, payload) {
      state.pickup = payload;
    },
    SET_PICKUP_LOCATION(state, payload) {
      state.pickupLocation = payload;
    },
    SET_DESTINATION(state, payload) {
      state.destination = payload;
    },
    SET_DESTINATION_LOCATION(state, payload) {
      state.destinationLocation = payload;
    },
  },
  actions: {
    addTrip(contexts, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'trip',
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
          data: payload,
        })
          .then(({ data }) => {
            console.log(data, 'success dari store');
            resolve({
              message: 'Success place trip',
              data,
            });
          })
          .catch(({ response }) => {
            console.log(response, 'errorr dari store');
            reject(response);
          });
      });
    },
  },
  getters: {
    getMap(state) {
      return state.map;
    },
    getPickup(state) {
      return state.pickup;
    },
    getPickupLocation(state) {
      return state.pickupLocation;
    },
    getDestinationLocation(state) {
      return state.destinationLocation;
    },
    getDestination(state) {
      return state.destination;
    },
  },
};
