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
    trips: [],
    geojson: undefined,
  },
  mutations: {
    SET_PRICE(state, payload) {
      state.price = payload;
    },
    SET_DISTANCE(state, payload) {
      state.distance = payload;
    },
    SET_DURATION(state, payload) {
      state.duration = payload;
    },
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
    SET_TRIPS(state, payload) {
      state.trips = payload;
    },
    SET_GEOJSON(state, payload) {
      state.geojson = payload;
    },
  },
  actions: {
    fetchTrips({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'trip',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
          .then(({ data }) => {
            commit('SET_TRIPS', data);
            resolve({
              message: 'Success get trip',
              data,
            });
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    addTrip({ dispatch }, payload) {
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
            dispatch('fetchTrips');
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
    acceptTrip({ commit, dispatch }, id) {
      console.log(id);
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `trip/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            status: 'accepted',
          },
        })
          .then(({ data }) => {
            commit('SET_TRIPS', data);
            dispatch('fetchTrips');
            resolve({
              message: 'Success get trip',
              data,
            });
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    updatePayment({ commit, dispatch }, id) {
      console.log(id);
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `trip/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            status: 'paid',
          },
        })
          .then(({ data }) => {
            commit('SET_TRIPS', data);
            dispatch('fetchTrips');
            resolve({
              message: 'Success get trip',
              data,
            });
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    doneTrip({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `trip/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            status: 'done',
          },
        })
          .then(({ data }) => {
            dispatch('fetchTrips');
            dispatch('resetTrip');
            resolve({
              message: 'Success get trip',
              data,
            });
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    sendPayment({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `payment/${payload.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: payload,
        })
          .then(({ data }) => {
            dispatch('fetchTrips');
            resolve({
              message: 'Success get trip',
              data,
            });
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    resetTrip({ commit }) {
      commit('SET_TRIPS', []);
      commit('SET_PICKUP', []);
      commit('SET_PICKUP_LOCATION', '');
      commit('SET_DESTINATION', []);
      commit('SET_DESTINATION_LOCATION', '');
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
    getTrips(state) {
      return state.trips;
    },
    getGeojson(state) {
      return state.geojson;
    },
    getDistance(state) {
      return state.distance;
    },
    getDuration(state) {
      return state.duration;
    },
    getPrice(state) {
      return state.price;
    },
  },
};
