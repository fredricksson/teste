const { spawn} = require('child_process')

const AWS = require('aws-sdk')

const config = new AWS.Config({
  accessKeyId: "AKIA2U47RW3MHTPSX3HZ",
  secretAccessKey: "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",
  region: "eu-west-2"
})



/* module.exports.register = async (req, res, next) => {

  console.log('ola mundo')

  const childProcess = spawn('python3', ['CompareImgens.js'])


  childProcess.stdout.on('data', (data) => {
    console.log(data)
  })

  childProcess.stderr.on('data', (data) => {
    console.log(data)
  })

  childProcess.on('close', code =>{
    console.log( code)bucket

 

} */

 //New controller
module.exports.register = async (req, res, next) => {

  //const {filename} = req.file;
  AWS.config.update({region:'us-east-2', accessKeyId: "AKIA2U47RW3MHTPSX3HZ", secretAccessKey: "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",});

  console.log(22222)

  
   const bucket        = "ubiteste" // the bucketname without s3://
   const photo_source  = "input.jpg"
   const photo_target  = "target.jpg"

   
   const client = new AWS.Rekognition();
   const params = {
     SourceImage: {
       S3Object: {
         Bucket: "ubifaces",
         Name: "input.png"
       },
     },
     TargetImage: {
       S3Object: {
         Bucket: "ubifaces",
         Name: "target.jpg"
       },
     },
     SimilarityThreshold: 70
   }
   client.compareFaces(params, function(err, response) {
     if (err) {
       console.log(err, err.stack); // an error occurred
     } else {
       response.FaceMatches.forEach(data => {
         let position   = data.Face.BoundingBox
         let similarity = data.Similarity
         console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
       }) // for response.faceDetails
     } // if
   });
}

