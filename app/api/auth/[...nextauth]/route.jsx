import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { loginuser } from "../../../../utils/api/Httproutes"; // ✅ Use alias path for App Router

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        let requestPayload = {};

        if (credentials.number && credentials.otp) {
          requestPayload = {
            otp: credentials.otp,
            mobile: Number(credentials.number),
            countrycode: credentials.countrycode,
          };
        } else {
          requestPayload = {
            mobile: Number(credentials.number),
            email: credentials.email,
            password: credentials.password,
          };
        }

        // try {
        //   const response = await loginuser(requestPayload);
        //   if (response.status === 200 && response.data.StatusCode === 200) {
        //     return response.data;
        //   }
        //   return null;
        // } catch (error) {
        //   console.error("Auth error:", error);
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
// ✅ This export format is required for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
