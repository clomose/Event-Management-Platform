import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { ApiError } from './ApiError'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
    try{
        if(!filePath){ return null}
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type : "auto",
        })
        console.log("File is uploaded on cloudinary ",response.url)
        fs.unlinkSync(filePath)
        return response
    }catch(error){
        fs.unlinkSync(filePath);
        //this will delete the temporary file save locally if upload gets failed
        return null;
    }
}

const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const fileName = parts.pop(); // Get the last part of the URL
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    return parts.slice(7).join('/') + '/' + fileNameWithoutExtension; // Skip protocol and cloud_name parts
}

const deleteFromCloudinary = async (url) => {
    try {
        const public_id = getPublicIdFromUrl(url);
        const response = await cloudinary.uploader.destroy(public_id,{
            resource_type : "auto"
        });
        if(response.result === "ok"){
            return true
        }else{
            return false;
        }
    } catch (error) {
        return new ApiError(500,"Error deleting file from cloudinary",error.message);
    }
}

export { uploadOnCloudinary,deleteFromCloudinary,getPublicIdFromUrl }