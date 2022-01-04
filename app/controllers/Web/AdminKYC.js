const JWTdecode = require('jwt-decode');

const KYCMidia = require("../../models/kycImage")
const KYCHistoric = require("../../models/kycHist")
const kycUsers = require("../../models/kycUsers")
//New controller
module.exports.index = async (req, res, next) => {

    const type = req.query?.type;
    const state = req.query?.state;
    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;
    const client = req?.query?.client;


    const Author = req?.headers?.authorization;

    const day = Number(startDate?.split("/")[0]) 
    const monthIndex = startDate?.split("/")[1] -1
    const year = startDate?.split("/")[2] 

    const day1 = Number(endDate?.split("/")[0]) 
    const monthIndex1 = endDate?.split("/")[1] -1
    const year1 = endDate?.split("/")[2]

    const firstDate = new Date();
    firstDate.setFullYear(year);
    firstDate.setMonth(monthIndex);
    firstDate.setDate(day);
    firstDate.setHours(2);
    firstDate.setMinutes(00);
    
    const secondDate = new Date();
    secondDate.setFullYear(year1);
    secondDate.setMonth(monthIndex1);
    secondDate.setDate(day1);
    secondDate.setHours(25);
    secondDate.setMinutes(59);

    const {id} = JWTdecode(Author);


    let filter = {
        estado:state,
        date: {
           $gte: new Date(firstDate),
           $lt: new Date(secondDate)
        },
        "gestor.id":id,
    }

    
    
    if(!type || type ==""){
       delete filter['gestor']
    }

    if(!state || state ==""){
       delete filter['estado']
    }
    if(!firstDate || firstDate == "Invalid Date" || !secondDate || secondDate=="Invalid Date"){
       delete filter['date']
    }
    if(type !== 'user'){
        delete filter['gestor.id']
    }

    console.log(filter)


    try {
        
        const kyc_list = await kycUsers.find(filter)


        const total = await kycUsers.countDocuments({estado: "Por rever"})
        const mytotal = await kycUsers.countDocuments({'gestor.id': id})

        return res.json({
            messagem:'Lista de processos KYC',
            type: "confirmation",
            statusCode: 200,
            data: {kyc_list, total:total, mytotal:mytotal, fullcount:kyc_list?.length}
        })

    } catch (error) {

        res.status(500).json({
            message:'Lista de processos KYC',
            type: "Refused",
            message_error:``,
            error_detalhe:error,
            data: {}
        })
    }
}


module.exports.indexOne = async (req, res, next) => {

    const kyc__id = req.params?.id;

    let query = {};
    let page = req.query.page;
    let limit = 5;
    let skip = limit * (page - 1);

    if(!kyc__id){

        res.status(400).json({
            message:'Detalhe KYC',
            type: "Bad Request",
            message_error:kyc_data,
            kyc_exmple_Detlh:{
                "client.id":"id- it comes in params (ObjectId)",
            }
        })
    }

    try {

        const kyc_media = await KYCMidia.findOne({kyc_id:kyc__id}).populate("kyc_id")
        

        if(!kyc_media){

            return res.json({
                message: "Detalhe não encontrado!", 
                type: "Not found",
                statusCode: 404, 
                data:kyc_media
            })
  
        }

        const kyc_hists = await KYCHistoric.find({kyc_id:kyc__id}).skip(skip).limit(limit).sort({"createdAt": -1})


        return res.json({
            messagem:'Detalhe do processos KYC',
            type: "confirmation",
            statusCode: 200,
            data:{
                kyc_media,
                kyc_hists
            },
        })
        
    } catch (error) {
        //This is forwarded to the global error handler. Do not change it.
        return res.status(500).json({
            messagem:'Detalhe do processos KYC',
            type: "Refused",
            error_detalhe:error,
            data:{},
        })
    }   

}

module.exports.update = async (req, res, next) => {

    const kyc__id = req.params?.id;
    const state = req.body?.state;
    const author = req.body?.author;
    const activity = req.body?.activity;


    const kyc_data = {
        "state.document":state?.document,
        "state.foto":state?.foto,
        "state.end":state?.end,
        "author.id":author?.id,
        "author.name":author?.name,
        "activity":activity,
        
    }
    try{

        if(!state || !author || !author?.id || !author.name || !activity || activity ==""){

            res.status(400).json({
                message:'Detalhe Update KYC',
                type: "Bad Request",
                message_error:{kyc_data},
                kyc_exmple_Detlh:{
                    "kyc_id":"id- it comes in params (ObjectId)",
                    "state.document":'Boolean - it comes in body',
                    "state.foto":"Boolean - it comes in body",
                    "state.end":'Boolean - it comes in body',
                    "activity":'String - it comes in body',
                    "author.id":'ObjectId - it comes in body',
                    "author.name": 'String - it comes in body',
                }
            })

        }

        let kyc_update_state = await KYCMidia.findOne({kyc_id:kyc__id})

 

        if(!kyc_update_state){

            return res.json({
                message: "Detalhe não encontrado!", 
                type: "Not found",
                statusCode: 404, 
                data:kyc_update_state 
            })
  
        }

        kyc_update_state = await KYCMidia.findByIdAndUpdate(
            kyc_update_state._id,
            { $set:kyc_data },
            { useFindAndModify: false }
        );

        if(kyc_update_state){

            const kyc_data_hist = {
                "author.id":author?.id,
                "author.name":author?.name,
                "activity":activity,
                "kyc_id":kyc__id,
            }

            var kyc_make_hist =  await KYCHistoric.create(kyc_data_hist)
        }

        return res.json({
            messagem:'Detalhe do processos KYC',
            type: "confirmation",
            statusCode: 200,
            data:{kyc_update_state, kyc_make_hist},
        })

     } catch(error){

        return res.status(500).json({
            messagem:'Detalhe do processos KYC',
            type: "Refused",
            error_detalhe:error,
            data:{},
        })
    }  
}
  
module.exports.sign = async (req, res, next) => {

 const token = req?.headers?.authorization;

 const id = req?.params?.id;

 const gestorAprov = req?.body?.gestor;

 const user = JWTdecode(token)

 try{
     const data = {
         "gestor.id":gestorAprov || user?.id,
         "gestor.name":gestorAprov || user?.id,
         estado: 'Em revisão'
     }

     const response = await kycUsers.findByIdAndUpdate(
        id,
        { $set:data},
        { useFindAndModify: false }
    );

    return res.json({
            messagem:'Assinatura da revisão  KYC',
            type: "confirmation",
            statusCode: 200,
            data:response,
    })

 }catch(error){

    return res.status(500).json({
        messagem:'Assinatura da revisão  KYC',
        type: "Refused",
        error_detalhe:error,
        data:{},
    })
} 
}


module.exports.aprove = async(req, res, netx)=>{

    let page = req.query.page;
    let limit = 5;
    let skip = limit * (page - 1);

    const status = req?.body?.status;
    const inf = req?.body?.inf;
    const type = req?.body?.type;
    const gestorAprov = req?.body?.gestor;

    const token = req?.headers?.authorization;

    const id = req?.params?.id;

    const user = JWTdecode(token)

    const data = {
        'document.status':status,
        'document.inf':inf,
        'foto.status':status,
        'foto.inf':inf,
        'end.status':status,
        'end.inf':inf,
    }

    console.log("gestorAprov: ",gestorAprov)

    if(type !=="Document" || type ==""){
        delete data['document.status']
        delete data['document.inf']
    }
    if(type !=='Foto' || type  ==""){
        delete data['foto.status']
        delete data['foto.inf']
    }
    if(type !=="End" || type ==""){
        delete data['end.status']
        delete data['end.inf']
    }

    console.log(type, data)



    try{

        let response = await KYCMidia.findByIdAndUpdate(
            id,
            { $set:data },
            { useFindAndModify: false }
        );

        const kyc_data_hist = {
            "author.id":user?.id,
            "author.name":gestorAprov || user?.id,
            kyc_id:response?.kyc_id,
            activity:inf
        }

        if(response){
            const kyc_make_hist =  await KYCHistoric.create(kyc_data_hist)
            console.log("kyc_make_hist: ", kyc_make_hist)
        }

        response = await KYCMidia.findById(id).populate("kyc_id")

        const kyc_hists = await KYCHistoric.find({kyc_id:response?.kyc_id}).skip(skip).limit(limit).sort({"createdAt": -1})

        return res.json({
            messagem:'Assinatura da revisão  KYC',
            type: "confirmation",
            statusCode: 200,
            data:{response, kyc_hists},
        })

    }catch(error){

        return res.status(500).json({
            messagem:'Aprovacao da revisão  KYC',
            type: "Refused",
            error_detalhe:error,
            data:{},
        })
    } 
}