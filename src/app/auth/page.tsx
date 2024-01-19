import React from "react";
import prisma from "@/utils/prisma";
import { signIn } from "next-auth/react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthForm from "./form";

export default async function AuthPage() {

  const session = await getServerSession(nextAuthOptions);

  async function onSubmit(formData: FormData, some: any) {
    "use server";
    const itemsType = formData.get("items-type");
    const userName = formData.get('userName');
    const password = formData.get("password");


    const user = await prisma.user.findUnique({
      where: {
        userName: userName?.toString(),
      },
      select: {
        email: true,
        name: true,
      },
    });

    console.log('user', user);
    
    if (user) {
      signIn("credentials", {
        userName: 'someUser',
        password: 'password2',
        callbackUrl: '/dashboard'
      })
    }

  }

  async function formAction(data: any) {
    "use server";
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="box shadow-xl w-full max-w-md bg-base-200 p-6 rounded-3xl">
        <h1 className="text-2xl mb-3">ავტორიზაცია</h1>
        <div className="divider"></div>
        <AuthForm />
      </div>
    </div>
  );
}
