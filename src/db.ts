import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(
            // "mongodb+srv://ahius:kEHlAIfsWFWjxRC0@cluster0.rxribyr.mongodb.net/?retryWrites=true&w=majority"
            "mongodb+srv://ahius:bO9cH5WhCa2WpWxf@cluster0.rxribyr.mongodb.net/blossom-app?retryWrites=true&w=majority"
        )
        if(connection){
            console.log("Connection established");
            
        }
    } catch (error) {
        console.log("error in connectToDatabase", error);
        throw error
    }
}

export default connectToDatabase