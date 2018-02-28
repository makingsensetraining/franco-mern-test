import UserService from "./user.service";

class UserController {
  findAll(req, res, next) {
    UserService.findAll((err, response) => {
      if (err) return next(err);

      res.status(200).json(response);
    });
  }

  findById(req, res, next) {
    const id = req.params.id;

    UserService.findById(id, (err, response) => {
      if (err) return next(err);

      res.status(200).json(response);
    });
  }

  update(req, res, next) {
    const id = req.params.id;
    const data = req.body.user;

    UserService.update(id, data, (err, updatedUser) => {
      if (err) return next(err);

      res.status(200).json(updatedUser);
    });
  }

  delete(req, res, next) {
    const id = req.params.id;

    UserService.delete(id)
      .then(() => {
        res.status(200).end();
      })
      .catch(e => {
        next(new Error(e));
      });
  }
}

export default new UserController();
