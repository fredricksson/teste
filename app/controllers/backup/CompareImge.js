const {PythonShell} = require ('python-shell');

const Tesseract = require('tesseract.js')

const Search = require('lodash')


module.exports.FaceRG = async (req, res, next) => {

  const {filename } = req.file;


  function Local_Response(response) {
    if(response.length == 3){
      JSON.stringify(response)

      return res.json(response)
    }
    
  }

    let options = {
     // mode: 'text',
      //pythonPath: 'path/to/python',
      //pythonOptions: ['-u'], // get print results in real-time
      scriptPath: '/home/delcio/Documents/kyc-node-api/app/controllers',
      //args: ['value1', 'value2', 'value3']
    };

    function AWS_Response(callback){

      PythonShell.run('../libs/CompareImagens.py', options,(err, res) =>{
        if(err){
          console.log(err)
          return callback(err)
        }
        if(res){
          console.log(res[2])
          callback(res)
          return (res[2])
  
        }
        console.log("aqui")
        callback(res)
      })

    }
    AWS_Response(Local_Response)
/* 
    return
    Tesseract.recognize(
      '/home/delcio/Documents/kyc-node-api/app/controllers/input.png',
      'por',
      //{ logger: m => console.log('') }
    ).then(({ data: { text } }) => {
      let TextExtrat = []
      const Text = text.split('\n').map(opcao => TextExtrat.push(opcao))

      const nome = 'SMAEL ANTÓNIO ALMÃO MATSINHE'

      const data = Search.filter(TextExtrat, (texts , index)=> {

        if(texts.toLowerCase().includes(nome.toLocaleLowerCase())){
          console.log('nome encontrado')
        }

      })
      
      return res.json(TextExtrat)
    }) */

}