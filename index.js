const mongoose = require("mongoose")
const app = require("./app/app")

try {

    //Connecting to the database
    mongoose.connect(
        process.env.MONGO_URL, 
        {   useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true  }).then(
        console.log(`We are listening on port ${process.env.PORT} ::: Version >>`, process.env.VERSION),   
        app.listen(process.env.PORT)
    ).catch(error => {
        console.log("Error connecting to the database4: ", error)
    })  

} catch (error) {
    console.log('This is an error message', err)
}