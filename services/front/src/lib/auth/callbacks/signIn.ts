import { userRepository } from "@/lib/utils/container";
import { NextAuthConfig } from "next-auth";

export type SignInCallback = NonNullable<NextAuthConfig["callbacks"]>["signIn"];

export const signInCallback: SignInCallback = async ({ user }) => {       
    const existingUser = await userRepository.findUserByEmail(user.email!)

    if (!existingUser) {
        return "/register?email=" + encodeURIComponent(user.email!);
    }

    return true; 
};