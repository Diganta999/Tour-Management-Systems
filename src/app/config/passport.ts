/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy} from "passport-local";
import bcryptJs from "bcryptjs"


//  Google Login 
passport.use(new GoogleStrategy({
    clientID:envVars.GOOGLE_CLIENT_ID,
    clientSecret:envVars.GOOGLE_CLIENT_SECRET,
    callbackURL:envVars.GOOGLE_CALLBACK_URL
},async(accessToken:string,refreshToken:string,profile:Profile,done:VerifyCallback)=>{
        try {
            const email = profile.emails?.[0].value;
            if(!email){
                done(null,false,{message:"email not found"})
            }
            let user = await User.findOne({email})
            if(!user){
                 user= await User.create({
                    email,
                    name:profile.displayName,
                    picture:profile.photos?.[0].value,
                    role:Role.USER,
                    isVerified:true,
                    auths:[
                        {
                            provider:"google",
                            providerId:profile.id
                        }
                    ]
                })
            }

            return done(null,user)
        } catch (error) {
         console.log("Google login error by Passport . Error : ",error)   
        return done(error)
        }
}))


passport.serializeUser((user: any, done: any) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})

// Credential Login 

passport.use(new LocalStrategy({
    usernameField:"email",
    passwordField:"password"
},async(email:string,passport:string,done :any)=>{
       try {
        const isUserExist = await User.findOne({email})
        if(!isUserExist){
            done(null,false,{message:"User not exist"})
        }
        if(isUserExist?.isDeleted ){
            done(null ,false,{message:"user is  Deleted"})
        }
        if( isUserExist?.isActive===IsActive.INACTIVE ){
            done(null,false,{message:"user is inactive"})
        }
        if(isUserExist?.isActive===IsActive.BLOCKED){
            done(null,false,{message:"user is blocked"})
        }
        const isGoogleAuthenticate= isUserExist?.auths.some(providerObject=>providerObject.provider==="google");
        if(isGoogleAuthenticate){
            return done(null, false, { message: "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password." })
        }
        const isPasswordMatch= await bcryptJs.compare(passport as string,isUserExist?.password as string)
         if(!isPasswordMatch){
            done(null,false,{message:"Password is incorrect"})
         }
         return done(null,isUserExist)
       } catch (error) {
        console.log(error)
        done(error)
       }
}))

