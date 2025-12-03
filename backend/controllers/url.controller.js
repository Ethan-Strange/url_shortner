import { url } from "../models/url.model.js";

export async function redirectUrl(req,res,next){
    const {shortId} = req.params;
    const doc = await url.findOne({short_url:shortId});
    return res.redirect(doc.url_name);
}

export async function addUrl(req,res,next){
    const {url_name} = req.body;
    const new_url = new url({url_name});
    await new_url.save();
    return res.json({new_url:new_url});
}

export async function modifyUrl(req,res,next){
    console.log("something-------------------------",req.body)
    const {id,url_name} = req.body;
    // console.log("From modify---")
    const doc = await url.findByIdAndUpdate(id,{url_name:url_name}, { new: true } );
    return res.json({doc:doc});
}

export async function deleteUrl(req,res,next){
    const {id} = req.body;
    await url.findByIdAndDelete(id);
    return res.json({success:"true"})
}

export async function getAllUrls(req,res,next) {
    const allUrl = await url.find({})
    return res.json({allUrls:allUrl});
}