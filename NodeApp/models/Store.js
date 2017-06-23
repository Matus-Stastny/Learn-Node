const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter store name!',
    },
    slug: String,
    description: {
        type: String,
        trim: true,
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if(!this.isModified('name')){
        return next(); // skip it, so stop this func from runnung and setting slug
    }
    this.slug = slug(this.name);
    next();
    // TODO: make uniq slugs!
})

module.exports = mongoose.model('Store', storeSchema); // STUDY: diference among this and exports.storeSchema
