const mongoose = require("mongoose")
const app = require("./src/app")

beforeAll( async () => {
    //Connecting to the database
    try {
        await mongoose.connect(
            "mongodb+srv://ubimoz:GKk6y1D05uMBoxMc@loyaltycompany.bpvyu.mongodb.net/test-loyalty-company?retryWrites=true&w=majority", 
            {   useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true  
            }
        )
    } catch (error) {
        console.log("Error connecting to the database: ", error)
    }
})


//  beforeEach(async () => {
//      const collections = await mongoose.connection.db.collections()
//      for (let collection of collections){
//         await collection.deleteMany({})
//     }

// })


afterAll(async () => {
    await mongoose.connection.close()
})
