import mongoose from 'mongoose'

const dbConnection = () => {

    mongoose.connect("mongodb+srv://syedsameershah0786:sameer0786@cluster0.fa5ds.mongodb.net/sam?retryWrites=true&w=majority&appName=Cluster0",{
        dbName:"Practiciny"
    }).then(() => console.log("Connected To Database")).catch(() => console.log("Some Error Occured While Connecting To Database"))

}

export default dbConnection;
