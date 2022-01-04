const mongoose = require("mongoose")

const Schema = mongoose.Schema


const KYCUsersSchema = new Schema({

    date:{
        type: Date,
        default: new Date()
    },
    client: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        birth:{
            type: String,
        },
        sex:{
            type: String,
        }
    },
    account: {
        type: String,
        default:"Processing"
    },
    estado: {
        type: String,
        default: 'Por rever'
    },
    gestor: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        name:{
            type: String,
            default:'Not assigned',
        }       
    },
    
}, {
    timestamps:  true,
})

module.exports = mongoose.model('KYCUsers', KYCUsersSchema)