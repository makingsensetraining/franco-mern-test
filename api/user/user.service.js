import User from "./user.schema";
import auth0 from "auth0";

class UserService {
  constructor() {
    this.mgmtClient = new auth0.ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.NIC_CLIENTID,
      clientSecret: process.env.NIC_CLIENT_SECRET,
      scope: "read:users update:users delete:users"
    });
  }

  findAll(cb) {
    User.find()
      .then(users => cb(null, users))
      .catch(err => cb("Unable to retrieve users."));
  }

  findById(id, cb) {
    User.findById(id)
      .then(user => cb(null, user))
      .catch(err => cb("Unable to find user."));
  }

  update(id, data, cb) {
    delete data.id;

    // remove password field if it's empty
    data.password || delete data.password;

    User.findByIdAndUpdate(id, { $set: data })
      .then(user => {
        if (!user) return cb(`The user doesn't exist.`);
        cb(null, user);
      })
      .catch(err => cb(err));
  }

  /**
   *
   * @param id
   * @returns {Promise}
   */
  delete(id) {
    return this.mgmtClient.deleteUser({id: 'auth0|' + id});
  }
}

export default new UserService();
