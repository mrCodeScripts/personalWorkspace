import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultJWT } from "next-auth/jwt";
import https from "https";

// --- TypeScript augmentation ---
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      given_name?: string;
      family_name?: string;
      locale?: string;
      verified?: boolean;
      hd?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    given_name?: string;
    family_name?: string;
    locale?: string;
    verified?: boolean;
    hd?: string;
  }
}

// --- NextAuth options ---
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
          prompt: "select_account",
        },
      },
      httpOptions: {
        // Force IPv4 to prevent ETIMEDOUT from IPv6 fallback
        agent: new https.Agent({ family: 4 }),
      },
    }),
  ],

  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.id = profile.sub;
        token.given_name = (profile as any).given_name;
        token.family_name = (profile as any).family_name;
        token.locale = (profile as any).locale;
        token.verified = (profile as any).email_verified;
        token.hd = (profile as any).hd;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id!;
        session.user.given_name = token.given_name;
        session.user.family_name = token.family_name;
        session.user.locale = token.locale;
        session.user.verified = token.verified;
        session.user.hd = token.hd;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };