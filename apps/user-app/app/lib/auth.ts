import { prisma} from "@repo/db";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                phone : {label : "Phone Number", type : 'text', placeholder : "+91-"},
                password : {label : "Password", type : "password"}
            },

            async authorize(credentials:any){
                console.log(process.env.JWT_SECRET)
                const hashedPassword = await bcrypt.hash(credentials.password, 10 );
                const existingUser = await prisma.user.findFirst({
                    where :{
                        number : credentials.phone
                    }
                })

                if (existingUser) {
                    
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if (passwordValidation) {
                        return{
                            id: existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.number
                        }
                    }
                    return null
                }

                try {
                    
                    const user = await prisma.user.create({
                        data : {
                            number : credentials.phone,
                            password : hashedPassword
                        }
                        
                    })
                    return {
                        id: user.id.toString(),
                        name : user.name,
                        email : user.number
                    }
                } catch (error) {
                    console.error(error)
                }


                return null
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET ,
    callbacks: {
        async session({token, session}:any){
            session.user.id = token.sub

            return session
        }
    }
}