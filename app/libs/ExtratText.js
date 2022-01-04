const Tesseract = require('tesseract.js')




function ExtratText(req, res){

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
        
        return res(TextExtrat)
      }) 

}

module.exports = {
    ExtratText
}


