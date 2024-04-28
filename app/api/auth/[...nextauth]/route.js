import prisma from "@/libs/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import md5 from "md5"

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                console.log('Authenticating user with email : ' + email)
                try {
                    const user = await prisma.users.findUnique({
                        where: { email: email }
                    })

                    if (email === user.email) {
                        console.log('User found with email: ' + email + ', password: ' + password)
                        if (md5(password) === user.password) {
                            console.log('Password match!')
                            return user
                        } else {
                            console.log('Password not match!')
                            return null
                        }
                    } else {
                        console.log('User not found!')
                        return null
                    }
                } catch (err) {
                    console.log('Error authenticating: ' + err)
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60 // 2 Days Expire
    },
    pages: {
        signIn: "/",
        signOut: "/"
    },
    callbacks: {
        jwt(params) {
            // Update Token
            if (params.user?.role) {
                params.token.role = params.user.role
            }

            // Return Final Token
            return params.token
        }
    }
})

export { handler as GET, handler as POST }