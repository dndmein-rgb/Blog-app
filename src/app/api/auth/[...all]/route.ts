import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

export const GET = authGET;

export const POST = async (request: Request) => {
  try {
    console.log("Auth endpoint called");
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
    console.log("BETTER_AUTH_SECRET:", process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("VERCEL_URL:", process.env.VERCEL_URL);
    
    return await authPOST(request);
  } catch (error) {
    console.error("Auth API Error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
};