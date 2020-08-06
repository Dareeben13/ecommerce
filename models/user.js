var mongose = require('mongoose')
var bycrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;
// bycrypt is a library to hash a password before it is even saved to the database.

// first we create the user schema fields / characteristics / attributes

let UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,

    profile: {
        name: { type: String, default: '' },
        picture: { type: String, default: '' },
    },

    address: String,

    history: [{
        date: Date,
        paid: { type: Number, default: 0 },
        // items : {type : Schema.Types.ObjectId, ref:''}
    }]
})


// then we hash the password before we even save it to the database 

UserSchema.pre('save', (next) => {
    //    pre is one of mongoose method every schema would have to use to kinda save it
    // ... before getting it into the database

    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next();
        })
    })

})

// last we compare passwords in the database with the one the one the user types

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)