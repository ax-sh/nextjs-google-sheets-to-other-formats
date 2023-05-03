import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth/src";

export const googleSheetsScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly",
];

const googleConfig = GoogleProvider({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
      scope: googleSheetsScopes.join(" "),
    },
  },
});
export const authOptions: AuthOptions = {
  providers: [googleConfig],
  secret: "123",
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
