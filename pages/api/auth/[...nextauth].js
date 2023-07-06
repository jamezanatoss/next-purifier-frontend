import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from "@/lib/mongodb";
import {mongooseConnect} from '@/lib/mongoose';
import { compare } from 'bcryptjs';
import Users from '@/models/Schema'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET,
    }),

    CredentialsProvider({
      name : "Credentials",
      async authorize(credentials, req){
        mongooseConnect().catch(error => { error: "Connection Failed...!"})

          // check user existance
          const result = await Users.findOne( { email : credentials.email})
          if(!result){
              throw new Error("No user Found with Email Please Sign Up...!")
          }

          // compare()
          const checkPassword = await compare(credentials.password, result.password);
          
          // incorrect password
          if(!checkPassword || result.email !== credentials.email){
              throw new Error("Username or Password doesn't match");
          }

          return result;

      }
          
  })
  
  ],

  adapter: MongoDBAdapter(clientPromise),
  secret: "bMdd+m6b0ITcBHkoB8sxjISap3LPY31pupySh3gdkYU=",
    session: {
        strategy: 'jwt',
    }
};

export default NextAuth(authOptions);
