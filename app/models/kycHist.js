const mongoose = require("mongoose")

const Schema = mongoose.Schema


const KYCHistoricSchema = new Schema({

    date:{
        type: Date,
        default: new Date
    },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: '',
            required:true
        },
        name:{
            type:String,
            required:true
        }
        
    },
    activity: {
        type:String,
        required:true,
    },
    kyc_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KYCUsers',
    },
    
}, {
    timestamps:  true,
})

module.exports = mongoose.model('KYCHistoric', KYCHistoricSchema)