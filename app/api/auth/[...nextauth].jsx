import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginuser } from "../../../utils/api/Httproutes";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        let requestPayload = {};

        if (credentials.number && credentials.otp) {
          // Mobile login with OTP
          requestPayload = {
            otp: credentials.otp,
            mobile: Number(credentials.number),
            countrycode: credentials.countrycode,
          };
        } else {
          // Email + password login
          requestPayload = {
            mobile: Number(credentials.number),
            email: credentials.email,
            password: credentials.password,
          };
        }

        try {
          const response = await loginuser(requestPayload);
          if (response.status === 200 && response.data.StatusCode === 200) {
            return response.data; // ✅ Auth successful
          } else {
            return null; // ❌ Invalid credentials
          }
        } catch (error) {
          return null; // ❌ API failed
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
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
});

export { handler as GET, handler as POST };
