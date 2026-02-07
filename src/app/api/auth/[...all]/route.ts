import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

export const GET = authGET;

export const POST = async (request: Request) => {
  try {
    return await authPOST(request);
  } catch (error) {
    console.error("Auth API Error:", error);
    throw error;
  }
};