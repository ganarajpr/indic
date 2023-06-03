import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataClient } from "@/src/xata";
import { XataAdapter } from "@next-auth/xata-adapter"

const client = new XataClient();

export default NextAuth({
    adapter: XataAdapter(client),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
    debug:true
});
