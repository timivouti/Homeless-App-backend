const User = require('../models/user');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    const userProps = req.body;
    const hashedPassword = bcrypt.hashSync(userProps.password, salt);
    userProps.password = hashedPassword;

    User.create(userProps)
      .then(user => res.send(user))
      .catch(next);
  },

  logIn(req, res, next) {
    const userProps = req.body;

    User.findOne({ email: userProps.email })
      .then((user) => {
        bcrypt.compare(userProps.password, user.password)
          .then((result) => {
            if (result === true) {
              const { email, _id, name } = user;
              return res.send({ email, _id, name });
            }
              return res.send({ err: 'Authentication failed' });
          });
      })
      .catch(next);
  },

  createItem(req, res, next) {
    const userId = req.params.id;
    const itemProps = req.body;
    const d = new Date();
    itemProps.date = d;

    User.findById({ _id: userId }).then((user) => {
      user.items.push(itemProps);
      user.save()
        .then(() => res.send(itemProps))
        .catch(next);
    })
    .catch(next);
  },

  getItems(req, res, next) {
    const userId = req.params.id;

    User.findById({ _id: userId })
      .then((user) => {
        res.send(user.items);
      })
      .catch(next);
  },

  editAds(req, res, next) {
    const userId = req.params.id;

    User.findByIdAndUpdate({ _id: userId }, { $inc: { countads: 1 } })
      .then(() => User.findById(userId))
      .then((user) => res.send(user))
      .catch(next);
  },

  getUser(req, res, next) {
    const userId = req.params.id;

    User.findById({ _id: userId })
      .then((user) => res.send(user))
      .catch(next);
  },

  getAllItems(req, res, next) {
    let itemsArr = [];
    User.find({})
      .then((users) => {
        users.forEach((user) => {
          user.items.forEach((item) => {
            itemsArr.push(item);
          });
        });
      })
      .then(() => res.send(itemsArr))
      .catch(next);
  }
};
