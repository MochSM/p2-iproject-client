import { io } from 'socket.io-client';
import store from '../store';

class SocketioService {
  socket;

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on('fetch trips', () => {
      console.log('fetch trips triggered');
      // is driver ? .. fetch it.
      // if (localStorage.isDriver) {
      store.dispatch('fetchTrips');
      // }
    });
    this.socket.on('sync pair', (payload) => {
      store.commit('SET_GEOJSON', payload);
    });
  }

  emit(ev, args) {
    this.socket.emit(ev, args);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
