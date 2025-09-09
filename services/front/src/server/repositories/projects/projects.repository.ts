import "reflect-metadata";
import { injectable } from "tsyringe";
import { eq } from "drizzle-orm";
import { Project, NewProject, projectsTable } from "@/lib/db";
import { BaseRepository } from "../base.repository";

@injectable()
export class ProjectsRepository extends BaseRepository {
  async create(project: NewProject): Promise<Project> {
    const [created] = await this.db.insert(projectsTable).values(project).returning();
    return created;
  }

  async getById(id: string): Promise<Project | undefined> {
    const [project] = await this.db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id));

    return project;
  }

  async getByTeam(teamId: string): Promise<Project[]> {
    return this.db.select().from(projectsTable).where(eq(projectsTable.teamId, teamId));
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projectsTable).where(eq(projectsTable.id, id));
  }
}
