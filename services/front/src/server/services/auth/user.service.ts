import "reflect-metadata";
import { injectable } from "tsyringe";
import { User } from "@/lib/db";
import { UserRepository } from "@/server/repositories/user.repository";

@injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async createUser(email: string, username: string, image?: string) {
    const imageUrl = image ?? "";
    return this.userRepository.createUser(email, username, imageUrl);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async getUserTeams(userId:string)
  {
    return this.userRepository.getUserTeams(userId);
  }


  async isOnboarded(userId: string): Promise<boolean> {
  const user = await this.userRepository.findUserById(userId);
  if (!user?.name) return false;

  const teams = await this.userRepository.getUserTeams(userId);
  return teams.length > 0;
}

}
