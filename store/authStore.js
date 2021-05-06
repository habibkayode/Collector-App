import { observable, action, decorate } from "mobx";
import { http } from "../utils/axios";
import appStore from "./appStore";

class AuthStore {
  inProgress = false;
  errors = undefined;

  login(payload) {
    this.inProgress = true;
    this.errors = undefined;
    console.log(payload);
    // return http
    //   .post('/collectors/register', payload)
    //   .then(({user}) => {
    //     console.log(user);
    //     appStore.setToken(user.token);
    //   })
    //   .catch(
    //     action((err) => {
    //       this.errors =
    //         err.response && err.response.body && err.response.body.errors;
    //       throw err;
    //     }),
    //   )
    //   .finally(
    //     action(() => {
    //       this.inProgress = false;
    //     }),
    //   );
  }
}

export default decorate(AuthStore, {
  login: action,
  errors: observable,
  inProgress: observable,
});
