import mongoose from 'mongoose'

const dbConnection = () => {

    mongoose.connect("fsd").then(() => console.log("Connected To Database")).catch(() => console.log("Some Error Occured While Connecting To Database"))

}

export default dbConnection;
