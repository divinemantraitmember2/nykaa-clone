import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginuser } from "../../../../utils/api/Httproutes";
import jwt from "jsonwebtoken"; 

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
      },
      async authorize(credentials) {
        const { phone } = credentials;

        try {
          const response = await loginuser({ phone });
          if (response.status === 200 && response?.data?.data?.token) {
            const token = response?.data?.data?.token;
            const decoded = jwt.decode(token);
            if (!decoded) {
              console.error("Token decode failed");
              return null;
            }

            return {
              id: decoded.user_id || "default-id",
              email: decoded.email || "",
              phone: decoded.phone || "",
              firstName: decoded.firstName || "",
              lastName: decoded.lastName || "",
              accessToken: token,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.email = user.email;
        token.phone = user.phone;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        email: token.email,
        phone: token.phone,
        firstName: token.firstName,
        lastName: token.lastName,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 मिनट
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
