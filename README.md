NodeJS backend with MongoDB

## GET /api/items/all
https://homeless-app-backend.herokuapp.com/api/items/all

### returns
``
[{name: String, price: Number, date: Date }...]
``

## POST /api/users
https://homeless-app-backend.herokuapp.com/api/users

### payload
``
{&nbsp;
  email: String,&nbsp;
  password: String,&nbsp;
  name: String&nbsp;
}
``

### returns
``
{&nbsp;
  email: String,&nbsp;
  id: String,&nbsp;
  name: String&nbsp;
}
``

## POST /api/login
https://homeless-app-backend.herokuapp.com/api/login

### payload
``
{&nbsp;
  email: String,&nbsp;
  password: String&nbsp;
}
``

### returns
``
{&nbsp;
  email: String,&nbsp;
  id: String,&nbsp;
  name: String&nbsp;
}
``
OR
``
{&nbsp;
  err: 'Authentication failed'&nbsp;
}
``

## POST /api/items/:id
https://homeless-app-backend.herokuapp.com/api/items/:id

### payload
``
{&nbsp;
  name: String,&nbsp;
  price: Number&nbsp;
}
``

### returns
``
{&nbsp;
  name: String,&nbsp;
  price: Number&nbsp;
}
``

## GET /api/items/:id
https://homeless-app-backend.herokuapp.com/api/items/:id

### returns
``
[{ name: String, price: Number, date: Date }...]
``

## PUT /api/ads/:id
https://homeless-app-backend.herokuapp.com/api/ads/:id

### returns
``
{&nbsp;
  countads: Number&nbsp;
}
``

## GET /api/:id
https://homeless-app-backend.herokuapp.com/api/:id

### returns
``
{&nbsp;
  email: String,&nbsp;
  name: String,&nbsp;
  password: '',&nbsp;
  countads: Number,&nbsp;
  items: [{ name: String, price: Number, date: Date }...]&nbsp;
}
``
