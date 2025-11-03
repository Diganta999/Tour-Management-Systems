
import { envVars } from "../config/env"
import { User } from "../modules/user/user.model"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import bcrypt from "bcryptjs"

export const seedSuperAdmin=async()=>{
    try {
        const isExistSuperAdmin = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL})
        if(isExistSuperAdmin){
            console.log("super admin all ready exist")
            return
        }
        const authProvider:IAuthProvider={
            provider:"credential",
            providerId:envVars.SUPER_ADMIN_EMAIL
        }
        const password = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.SLOT_ROUND))
      const payload :IUser ={
        name:"SUPER ADMIN",
        email:envVars.SUPER_ADMIN_EMAIL,
        password:password,
        role:Role.SUPER_ADMIN,
        auths:[authProvider],
        isVerified:true

      }

      const superAdmin = await User.create(payload)
      console.log("super admin create successfully ! \n")
      console.log(superAdmin)


    } catch (error) {
        console.log(error)
    }
}