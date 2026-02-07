import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth.js";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
    plugins: [inferAdditionalFields<typeof auth>()],
});
export const {signIn,signOut,signUp,useSession}=authClient
