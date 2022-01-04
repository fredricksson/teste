const KYCUsers = require("../../models/kycUsers")
const KYCMidia = require("../../models/kycImage")
const KYCHistoric = require("../../models/kycHist")

module.exports.register = async (req, res, next) => {

    try{

        const stap = req.body?.step;
        const filename = req.file?.filename;
        const user = req.params?.id;
        const name = req.body?.name || req.body?.fullName;
        const sex = req.body?.sex;
        const birth = req.body?.birth;



        const kyc_data = {
            "client.id":user,
            "client.name":name,
            "stap":stap,
            "filename": filename,
            "client.birth": birth,
            "client.sex":sex
        }

        if(!stap || !filename || !user || !name || !birth || !sex){

            return res.status(400).json({
                message:'Registo KYC',
                type: "Bad Request",
                message_error:kyc_data,
                kyc_exmple_register:{
                    "Must be Multpart Form":true,
                    "client.id":"id- it comes in params (ObjectId)",
                    "client.name":"name - it comes in body",
                    "stap":"stap - it comes in body",
                    "filename": "filename- it come in body",
                    "birth": "birth- it come in body",
                    "sex": "sex- it come in body",
                }
            })
        }


        let kycUsers = await KYCUsers.findOne({"client.id":user,}) 


        if(!kycUsers){
            kycUsers = await KYCUsers.create(kyc_data)
        }

        let kycimage = await KYCMidia.findOne({kyc_id: kycUsers?.id})
        
        if(!kycimage){

            kycimage = await KYCMidia.create({
                "bi.front":filename, 
                "kyc_id":kycUsers.id,
            })
        }
        else{

            

            switch(stap) {
                case "2":
                    console.log("bi.verse: ", filename)
                    kycimage = await KYCMidia.findByIdAndUpdate(
                        kycimage._id,
                        { $set:{"bi.verse":filename} },
                        { useFindAndModify: false }
                    );
                    break;

                case "3":
                    console.log("photograph: ", filename)
                    kycimage = await KYCMidia.findByIdAndUpdate(
                        kycimage._id,
                        { $set:{photograph:filename}},
                        { useFindAndModify: false }
                    );
                    break;
              } 
        }

        return res.json({
            message: "User found!", 
            type: "confirmation",
            statusCode: 200, 
            data: { kycimage, kycUsers }  
        })

     }catch (error) {
        //This is forwarded to the global error handler. Do not change it.
        res.status(500).json({
            message:'Registo KYC',
            type: "Refused",
            message_error:``,
            error_detalhe:error,
            data: {}
        })
    }

}



module.exports.indexOne = async (req, res, next) => {

    const id = req.params?.id;

    let query = {};
    let page = req.query.page;
    let limit = 5;
    let skip = limit * (page - 1);

    if(!id){

        return res.status(400).json({
            message:'Detalhe KYC',
            type: "Bad Request",
            
            kyc_exmple_Detlh:{
                "client.id":"id- it comes in params (ObjectId)",
            }
        })
    }

    try {

        const kyc = await KYCUsers.findOne({'client.id': id})

        if(!kyc){

            return res.status(400).json({
                message:'KYC nao encontrado',
                type: "Bad Request",
                
                kyc_exmple_Detlh:{
                    "client.id":"id- it comes in params (ObjectId)",
                }
            })
        }

        const kyc_media = await KYCMidia.findOne({kyc_id:kyc._id}).populate("kyc_id")
        

        if(!kyc_media){

            return res.json({
                message: "Detalhe não encontrado!", 
                type: "Not found",
                statusCode: 404, 
                data:kyc_media
            })
  
        }

        const kyc_hists = await KYCHistoric.find({kyc_id:kyc._id}).skip(skip).limit(limit).sort({"createdAt": -1})


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


