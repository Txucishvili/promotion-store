import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import { NextConfig } from "next";
import { signIn } from 'next-auth/react';

const PUBLIC_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
let userAccount;
export const nextAuthOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        userName: '',
        password: ''
      },
      authorize: async (credentials, req) => {
        const userCredentials = {
          userName: credentials.userName,
          password: credentials.password,
        };

        const res = await fetch(
          `${PUBLIC_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          userAccount = user;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 3000,
    encryption: true,
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error",
  },
  callbacks: {
    // signIn: async (data, account, profile) => {
    //   return Promise.resolve(true)
    //   if ((data.status === 200)) {
    //   } else {
    //     return Promise.resolve(false)
    //   }
    // },
    async session(session, user, token) {
      if (user !== null) {
        session.user = user;
      }
      return await session;
    },

    async jwt({ token, user }) {
      const isSignedIn = user ? true : false;

      if (isSignedIn) {
        token.accessToken =
          user.id.toString() + "-" + user.email + "-" + user.name;
      }

      return await token;
    },
  },
} satisfies NextConfig;


export const handle = NextAuth(nextAuthOptions);

export { handle as GET, handle as POST }