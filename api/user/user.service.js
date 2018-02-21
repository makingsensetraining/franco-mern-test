import User from "./user.schema";

class UserService {
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

  create(data, cb) {
    let user = new User(data);
    user.save(err => {
      if (err) cb(err);

      cb(null, user);
    });
  }

  update(id, data, cb) {
    delete data.id;

    // remove password field if it's empty
    data.password || delete data.password;

    User.findByIdAndUpdate(id, {$set: data})
      .then(user => {
        if (!user) return cb(`The user doesn't exist.`);
        cb(null, user);
      })
      .catch(err => cb(err));
  }

  delete(id, cb) {
    User.findByIdAndRemove(id, { select: "_id" })
      .then(user => {
        if (!user) return cb(`The user doesn't exist.`);
        cb(null, id);
      })
      .catch(err => cb("Unable to delete user."));
  }
}

export default new UserService();
