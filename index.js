const axios = require('axios')

const data = []

let page = 1
async function recurse() {


    
    
    try{
        let response = await axios.get(`http://challenge.dienekes.com.br/api/numbers?page=${page}`);
        
        if (response.data.numbers)
            data.push(...response.data.numbers)
        else{
            console.log( mergeSort(data)            )
            return
        }

    }catch(err){
        console.log(err)
    }

    
    console.log("Pagina: ", page)
    page = page + 1
    recurse();
        
    
    
  
}


const _mergeArrays = (a, b) => {
    const c = []
  
    while (a.length && b.length) {
      c.push(a[0] > b[0] ? b.shift() : a.shift())
    }
  
    //if we still have values, let's add them at the end of `c`
    while (a.length) {
      c.push(a.shift())
    }
    while (b.length) {
      c.push(b.shift())
    }
  
    return c
  }
  
  const mergeSort = (array) => {
    if (array.length < 2) return array
    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle, array.length)
    const sorted_l = mergeSort(left)
    const sorted_r = mergeSort(right)
    return _mergeArrays(sorted_l, sorted_r)
  }


  recurse()