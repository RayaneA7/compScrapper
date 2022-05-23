const { response } = require('express')
const express = require('express')

const app = express()
const scrap = require('./script.js')

app.get('/', async (req, res) => {
  response = await scrap()
  res.send(response)
})

app.listen(PORT, err => {
  if (err) throw err
  console.log(`listenning to port ${PORT}`)
})

//todo
/*const puppeteer = require('puppeteer')
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')
const path = require('path')

//todo
/*
    -open browser
    -open page
    -wait for the apropreate selector
    -iterate over the rows of the table and in each row i must create
     an object containing the cells data,each row will be pushed inside an array.


     //todo2 
     - i will check for the length of the tr (normally i should have 5 )
     - if it's less then 5 I will do td[5-i]
     -
     -
     -

*/
