import mongoose, { Model, Schema } from "mongoose";
import { nanoid } from "nanoid";
const urlSchema = new Schema({
    url_name:{
        type:String,
        required:true,
    },
    short_url:{
        type:String,
        unique:true,
    }
})

async function generateShortId(Model){
    let id;
    let exists = true;
    while(exists){
        id = nanoid(10);
        exists = await Model.exists({short_url:id})
    }
    return id;
}

urlSchema.pre("save",async function(){
    if(!this.isNew) return 
    try {
        this.short_url= await generateShortId(this.constructor);
       
    } catch (error) {
        console.log("error in pre hook",error);
       
        
    }
})

export const url = mongoose.model("url",urlSchema)