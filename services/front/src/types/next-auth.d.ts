import { Team, User } from "@/lib/db"; // your Drizzle types
import "next-auth";
import "next-auth/jwt";

// Extend JWT
declare module "next-auth/jwt" {
  interface JWT {
    user: User; 
    activeTeam: Team;
  }
}

// Extend Session
declare module "next-auth" {
  interface Session {
    user: User;  
    activeTeam: Team;
  }
}
