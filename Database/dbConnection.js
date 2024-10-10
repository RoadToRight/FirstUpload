import mongoose from 'mongoose'

const dbConnection = () => {

    mongoose.connect("mongodb+srv://syedsameershah0786:sameer@cluster0.fa5ds.mongodb.net/myData?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Connected To Database")).catch(() => console.log("Some Error Occured While Connecting To Database"))

}

export default dbConnection;
