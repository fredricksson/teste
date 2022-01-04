const mongoose = require("mongoose")

const Schema = mongoose.Schema

const storeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: false,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },

}, {
    timestamps:  true,
    _id: false,
    toJSON: {
        transform(doc, obj){
            obj.id = obj._id
            delete obj._id
            delete obj.createdAt
            delete obj.updatedAt        
        }
    }
})

module.exports = mongoose.model('Store', storeSchema)