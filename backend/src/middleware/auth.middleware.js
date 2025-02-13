import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async (req,_,next) => {
    //get token from cookies 
    //verify token
    //get user from token
    //attach user to req object
    //next
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","");
        console.log("token",token);
        if(!token){
            throw new ApiError(401,"Unauthorized Access")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(404,"User not found");
        }

        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Inavalid Token")
    }

})