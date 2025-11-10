import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {db} from "@/db"
import { users } from "@/db/schemas";
import { getUserByEmail, upsertUser } from "./data/users";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000"

if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not set in environment variables")
}

if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not set in environment variables")
}

if (!NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not set in environment variables")
}

export const authOptions: NextAuthOptions = {
    secret: NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
          })
    ],
    callbacks: {
        async signIn({account, profile}) {
            if (!profile?.email) {
                throw new Error("No profile")
            }

            //Handle errors
            await upsertUser(profile)
            
           return true 
        },
        async jwt({token, user, account: oauthAccount, profile}: any) {
            // On first sign in, user and profile are available from the provider
            if (user || profile) {
                const email = user?.email || profile?.email || token.email
                if (email) {
                    token.email = email
                    const dbUser = await getUserByEmail(email)
                    if (dbUser) {
                        token.id = dbUser.id
                        token.name = dbUser.name
                        token.image = dbUser.avatar
                        token.account = dbUser
                    }
                }
            }
            // On subsequent requests, use token.email if account not loaded
            else if (token.email && !token.account) {
                const dbUser = await getUserByEmail(token.email)
                if (dbUser) {
                    token.id = dbUser.id
                    token.account = dbUser
                }
            }
            return token
        },
        async session({ session, token }: any) {
            if (token.account) {
                session.user = {
                    id: token.account.id,
                    name: token.account.name,
                    email: token.account.email,
                    image: token.account.avatar,
                }
            }
            return session
        }
    }
}

