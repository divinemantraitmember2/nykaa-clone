import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginuser } from "../../../../utils/api/Httproutes";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          const response = await loginuser({ username, password });

          if (response.status === 200 && response.data.accessToken) {
            const user = response.data;
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.image,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
