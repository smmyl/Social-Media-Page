const mongoose = require('mongoose')
const Schema = mongoose.Schema
const profileSchema = new Schema(
    {
        userName: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        age: {type: Number, required: false},
        github: {type: String, required: false},
        image: {type: String, required: false},
        aboutMe: {type: String, required: false}
    }, {timestamps: true}
)

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile