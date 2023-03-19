//==Require
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const mongoURI = 'mongodb://localhost:27017/EdoC'

//==Seed
const User = require('./models/user.js')
const userSeed = require('./models/userSeed.js')
const Post = require('./models/post.js')
const postSeed = require('./models/postSeed.js')

//==Reset
//User.collection.drop()
// Post.collection.drop()

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

//==Create Routes
app.get('/', (req, res) => {
    res.send('hi')
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

// app.get('/post/:id', (req, res) => {
//     res.send(`${Post._req.params.id}`)
// })

// //==Edit

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

// app.post('/homePage', (req, res) => {
//     if(req.body.toBePrivate === 'on') { 
//         req.body.toBePrivate = true;
//     } else { 
//         req.body.toBePrivate = false;
//     }
//     Post.create(req.body).then((createdPost) => 
//         {
//             res.redirect('/homePage')
//         })
// })
//==Delete


//==Connecting
mongoose.connect(mongoURI).then(() => {
    console.log('The connection with mongosh is established')
  })
app.listen(3000, () => {
    console.log('listening...')
})

