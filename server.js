//==Require
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const mongoURI = 'mongodb://localhost:27017/EdoC'
const app = express()

//==Seed
const User = require('./models/user.js')
const userSeed = require('./models/userSeed.js')
const Post = require('./models/post.js')
const postSeed = require('./models/postSeed.js')
const profileSeed = require('./models/profileSeed.js')
const Profile = require('./models/profile.js')

//==Reset
// User.collection.drop()
// Post.collection.drop()
// Profile.collection.drop()

//==App.Use
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

//==Create Data
app.get('/userSeed', (req, res) => {
    User.create(userSeed).then(() => {
        res.send(userSeed)
    })
})
app.get('/postSeed', (req, res) => {
    Post.create(postSeed).then(() => {
        res.send(postSeed)
    })
})
app.get('/profileSeed', (req, res) => {
    Profile.create(profileSeed).then(() => {
        res.send(profileSeed)
    })
})

//==Create Routes
app.get('/', (req, res) => {
    res.render('login.ejs')
})
app.get('/homePage', (req, res) => {
    Post.find({}).then((Post) => {
    res.render('homePage.ejs', {post: Post})
    })
})
app.get('/post', (req, res) => {
    res.render('post.ejs')
})
app.get('/:id/editPost', (req, res) => {
    Post.findById(req.params.id).then((foundPost) => {
        res.render('editPost.ejs',
        {
            post: foundPost
        })
    })
})
app.get('/profile', (req, res) => {
    Profile.find({}).then((Profile) => {
    res.render('profile.ejs', {profile: Profile})
    })
})
app.get('/:id/editProfile', (req, res) => {
    Profile.findById(req.params.id).then((foundProfile) => {
        res.render('editProfile.ejs',
        {
            profile: foundProfile
        })
    })
})

//==Edit
app.put('/:id', (req, res) => {
    if (req.body.private === 'on'){
      req.body.private = true
    } else {
      req.body.private = false
    }
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(() => {
      res.redirect('/homePage')
    })
})
app.put('/editProfile/:id', (req, res) => {
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(() => {
      res.redirect('/profile')
    })
})

//==Post
app.post('/homePage', (req, res) => {
    if (req.body.private === 'on'){
        req.body.private = true
      } else {
        req.body.private = false
      }
      Post.create(req.body).then(() => {
        res.redirect('/homePage')
      })
})
app.post('/homePage', (req, res) => {
      Profile.create(req.body).then(() => {
        res.redirect('/profile')
      })
})

//==Delete
app.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/homePage')
    })
})

//==Connecting
mongoose.connect(mongoURI).then(() => {
    console.log('The connection with mongosh is established')
  })
app.listen(3000, () => {
    console.log('listening...')
})

