import {observable, action, reaction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AppStore {
  @observable appName = 'Scrapays Collector';
  @observable token = AsyncStorage.getItem('token');

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          AsyncStorage.setItem('token', token);
        } else {
          AsyncStorage.removeItem('token');
        }
      },
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new AppStore();
