import startDB from "../../../../lib/db";
import User from "../../../../db/schemas/User.js";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt", // 'jwt' OR 'database'
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("Authorize function called with:", {
            email: credentials?.email,
          });

          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            throw new Error("Missing email or password");
          }

          const { email, password } = credentials;

          await startDB();
          console.log("Database connected");

          // Fetch the user document by email
          const user = await User.findOne({ email });
          console.log(
            "User lookup result:",
            user ? "User found" : "User not found"
          );

          if (!user) {
            throw new Error("Invalid Email");
          }

          if (!user.status) {
            throw new Error("User is not active");
          }

          // Verify password using the model's comparePassword method
          console.log("Attempting password verification");
          const isValid = await user.comparePassword(password);
          console.log("Password verification result:", isValid);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          console.log("Authentication successful for user:", user.email);
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            id: user._id.toString(),
          };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin", // Redirect to signin page on error
  },
  callbacks: {
    jwt(params) {
      console.log("JWT callback params:", params);
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
        params.token.firstName = params.user.firstName;
        params.token.lastName = params.user.lastName;
      }
      // return final token
      return params.token;
    },
    session({ session, token }) {
      console.log("Session callback - token:", token);
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      console.log("Session callback - final session:", session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST, authOptions };
