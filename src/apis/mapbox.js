const axios = require('axios');

const mapboxDirection = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving/',
  method: 'GET',
  params: {
    overview: 'full',
    geometries: 'geojson',
    access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
  },
});

const mapboxGeocoding = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  method: 'GET',
  params: {
    access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
  },
});

module.exports = { mapboxDirection, mapboxGeocoding };
