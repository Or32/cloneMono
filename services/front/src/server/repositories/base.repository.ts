
import { RequestContext } from "@/lib/context/requestContext";
import { db } from "@/lib/db";

export abstract class BaseRepository {
    protected get db(): typeof db {
        try {
            return RequestContext.getDb();
        } catch {
            return db;
        }
    }

    protected get userId(): string {
        return RequestContext.getUserId();
    }

    protected get teamId(): string {
        return RequestContext.getTeamId();
    }

}

