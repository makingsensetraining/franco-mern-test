import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.set("toJSON", { getters: true, versionKey: false });

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) reject(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
};

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  hashPassword(this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(e => next(e));
});

userSchema.pre("findOneAndUpdate", function(next) {
  const password = this.getUpdate().$set.password;
  if (!password) {
    return next();
  }

  hashPassword(password)
    .then(hash => {
      this.update({}, { password: hash });
      next();
    })
    .catch(e => next(e));
});

const User = mongoose.model("User", userSchema);

export default User;
