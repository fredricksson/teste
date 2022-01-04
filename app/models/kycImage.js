const mongoose = require("mongoose")

const Schema = mongoose.Schema


const KYCUDetalheSchema = new Schema({

    data:{
        type: Date,
        default: new Date()
    },
    
    document:{
        status:{
            type: Boolean,
            default: false
        },
        inf:{
            type: String,
        }
    },
    foto: {
        status:{
            type: Boolean,
            default: false
        },
        inf:{
            type: String,
        }
    },
    end:{
        status:{
            type: Boolean,
            default: false
        },
        inf:{
            type: String,
        }
    },
    
    bi:{
        front:{
            type: String,
            default:null
        },
        verse:{
            type: String,
            default:null
        },
    },
    photograph:{
        type:String,
        default: null
    },
    kyc_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KYCUsers',
    },
},{
    toJSON:{
        virtuals:true,
    }
})

KYCUDetalheSchema.virtual(`photograph_url`).get(function(){
    return `https://txeda.cloud/files/${this.photograph}`
})

KYCUDetalheSchema.virtual(`bi_verse_url`).get(function(){
    return `https://txeda.cloud/files/${this.bi.verse}`
})

KYCUDetalheSchema.virtual(`bi_front_url`).get(function(){
    return `https://txeda.cloud/files/${this.bi.front}`
})

module.exports = mongoose.model('KYCMidia', KYCUDetalheSchema)