//==Requiring
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const User = require('./models/user.js')
const seed = require('./models/userSeed.js')
const app = express()
const mongoURI = 'mongodb://localhost:27017/EdoC'

//==App.Use
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

//==Create
app.get('/seed', (req, res) => {
    User.create(seed).then(() => {
        res.send(seed)
    })
})

//==App.get
app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/home-page', (req, res) => {
    res.render('home-page.ejs')
})
//==Connecting
mongoose.connect(mongoURI).then(() => {
    console.log('The connection with mongosh is established')
  })
app.listen(3000, () => {
    console.log('listening...')
})

