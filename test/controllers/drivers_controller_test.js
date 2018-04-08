const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('user');

describe('Drivers controller', () => {
  it('POST to /api/users creates a new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/api/users')
        .send({ email: 'test@test.com', password: 'test', name: 'test' })
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('POST to /api/login logs in user', (done) => {
    const user = new User({ email: 'test@test.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.save().then(() => {
      request(app)
        .post('/api/login')
        .send({ email: 'test@test.com', password: 'test' })
        .end((err, response) => {
          assert(user.email === response.body.email);
          done();
        });
    });
  });

  it('POST to /api/items posts an item', (done) => {
    const user = new User({ email: 'test@test.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.save().then(() => {
      request(app)
        .post(`/api/items/${user._id}`)
        .send({ name: 'Blanket', price: 5 })
        .end((err, response) => {
          assert(response.body.name === 'Blanket');
          User.findById(user._id)
            .then((users) => {
              assert(users.items[0].name === 'Blanket');
              done();
            });
        });
    });
  });

  it('GET /api/items gets users items', (done) => {
    const user = new User({ email: 'test@test.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.items.push({ name: 'Blanket', price: 5 });

    user.save().then(() => {
      request(app)
        .get(`/api/items/${user._id}`)
        .end((err, response) => {
          assert(response.body[0].name === 'Blanket');
          User.findById(user._id)
            .then((users) => {
              assert(users.items.length === 1);
              assert(users.items[0].name === 'Blanket');
              done();
            });
        });
    });
  });

  it('PUT to /api/ads/id increments users countads by one', (done) => {
    const user = new User({ email: 'test@test.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.save().then(() => {
      User.findById({ _id: user._id })
        .then((users) => {
          request(app)
            .put(`/api/ads/${user._id}`)
            .end((err, response) => {
              assert(users.countads + 1 === response.body.countads);
              done();
            });
        });
    });
  });

  it('GET /api/id returns user', (done) => {
    const user = new User({ email: 'test@test.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.save().then(() => {
      request(app)
        .get(`/api/${user._id}`)
        .end((err, response) => {
          assert(response.body.email === 'test@test.com');
          done();
        });
    });
  });

  it('GET /api/items/all gets all users items', (done) => {
    const user = new User({ email: 't@t.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 't' });

    const secondUser = new User({ email: 'test@t.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.items.push({ name: 'Blanket', price: 5 });
    user.items.push({ name: 'Fish And Chips', price: 7 });
    secondUser.items.push({ name: 'Fish And Chips', price: 7 });

    Promise.all([user.save(), secondUser.save()])
    .then(() => {
      request(app)
        .get('/api/items/all/')
        .end((err, response) => {
          assert(response.body.length === 3);
          assert(response.body[1].name === 'Fish And Chips');
          done();
        });
    });
  });

  it('PUT /api/items changes item to activated', (done) => {
    const user = new User({ email: 't@t.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 't' });

    const secondUser = new User({ email: 'test@t.com',
    password: '$2a$10$vXryQ1bsr0LfX4O6POFQdu8KpWUda602yaghlPaS1UPUhWXLJKYgC',
    name: 'test' });

    user.items.push({ name: 'Blanket', price: 5 });
    user.items.push({ name: 'Fish And Chips', price: 7 });
    secondUser.items.push({ name: 'Fish And Chips', price: 7 });

    Promise.all([user.save(), secondUser.save()])
      .then(() => {
        User.findOne({ _id: user._id }).then((users) => {
          request(app)
            .put('/api/items')
            .send({ userId: users._id, itemId: users.items[0]._id })
            .end(() => {
              User.findOne({ _id: users._id })
                .then((finalUser) => {
                  assert(finalUser.items[0].activated === true);
                  done();
                });
            });
        });
      });
  });
});
