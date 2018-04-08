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
{
  email: String,
  password: String,
  name: String
}
``

### returns
``
{
  email: String,
  id: String,
  name: String
}
``

## POST /api/login
https://homeless-app-backend.herokuapp.com/api/login

### payload
``
{
  email: String,
  password: String
}
``

### returns
``
{
  email: String,
  id: String,
  name: String
}
``
OR
``
{
  err: 'Authentication failed'
}
``

## POST /api/items/:id
https://homeless-app-backend.herokuapp.com/api/items/:id

### payload
``
{
  name: String,
  price: Number
}
``

### returns
``
{
  name: String,
  price: Number
}
``

## PUT /api/items/:id
https://homeless-app-backend.herokuapp.com/api/items/:id

### returns
``
{
  success: true
}
``

## GET /api/items/:id
https://homeless-app-backend.herokuapp.com/api/items/:id

### returns
``
[{ name: String, price: Number, date: Date, activated: Boolean }...]
``

## PUT /api/ads/:id
https://homeless-app-backend.herokuapp.com/api/ads/:id

### returns
``
{
  countads: Number
}
``

## GET /api/:id
https://homeless-app-backend.herokuapp.com/api/:id

### returns
``
{
  email: String,
  name: String,
  password: '',
  countads: Number,
  items: [{ name: String, price: Number, date: Date, activated: Boolean }...]
}
``
