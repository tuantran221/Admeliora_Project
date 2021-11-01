const express = require('express')
const products = require('./data/products')
const heroSliderData = require('./data/hero-slider')
const policy = require('./data/policy')
const category = require('./data/category')
const colors = require('./data/product-color')
const size = require('./data/product-size')

const app = express()

app.get('/', (req, res) => {
  res.send('API is running ')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/category', (req, res) => {
  res.json(category)
})

app.get('/api/colors', (req, res) => {
  res.json(colors)
})

app.get('/api/size', (req, res) => {
  res.json(size)
})

app.get('/api/heroSliderData', (req, res) => {
  res.json(heroSliderData)
})

app.get('/api/policy', (req, res) => {
  res.json(policyData)
})

app.get('/api/products/:slug', (req, res) => {
  const product = products.find((p) => p.slug === req.params.slug)
  res.json(products)
})

// app.get('/api/catalog/products/:slug', (req, res) => {
//   const product = products.find((p) => p.slug === req.params.slug)
//   res.json(product)
// })

// app.get('/catalog/images/products', (req, res) => {
//   res.json(products)
// })

app.listen(5000, console.log('Server running on port 5000'))