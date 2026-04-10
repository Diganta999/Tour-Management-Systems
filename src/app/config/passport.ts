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
          return done(error as Error)
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
    done(error as Error)
    }
})

// Credential Login 

passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email: string, password: string, done: any) => {
    try {
      const isUserExist = await User.findOne({ email });

      if (!isUserExist) {
        return done(null, false, { message: "User not exist" });
      }

      if (isUserExist.isDeleted) {
        return done(null, false, { message: "User is deleted" });
      }

      if (isUserExist.isActive === IsActive.INACTIVE) {
        return done(null, false, { message: "User is inactive" });
      }

      if (isUserExist.isActive === IsActive.BLOCKED) {
        return done(null, false, { message: "User is blocked" });
      }

      const isGoogleAuthenticate = isUserExist.auths.some(
        (providerObject) => providerObject.provider === "google"
      );

      if (isGoogleAuthenticate && !isUserExist.password) {
        return done(null, false, {
          message:
            "You have authenticated through Google. Please login with Google first and set a password.",
        });
      }

      const isPasswordMatch = await bcryptJs.compare(
        password,
        isUserExist.password as string
      ); 

      if (!isPasswordMatch) {
        return done(null, false, { message: "Password is incorrect" });
      }

      // ✅ Password match হলে
      return done(null, isUserExist);
    } catch (error) {
      return done(error as Error);
    }
  }
));

