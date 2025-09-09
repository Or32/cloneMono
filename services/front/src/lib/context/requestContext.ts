import { AsyncLocalStorage } from "node:async_hooks";
import { db as globalDb } from "@/lib/db";

type ContextData = {
  db: typeof globalDb;
  tx?: typeof globalDb;
  inTransaction: boolean;
  userId: string;
  teamId: string;
};

const als = new AsyncLocalStorage<ContextData>();

export class RequestContext {
  /** Must always start with user + team */
  static run<T>(
    data: { userId: string; teamId: string },
    fn: () => Promise<T>
  ): Promise<T> {
    return als.run(
      {
        db: globalDb,
        inTransaction: false,
        userId: data.userId,
        teamId: data.teamId,
      },
      fn
    );
  }

  static get(): ContextData {
    const store = als.getStore();
    if (!store) throw new Error("No request context available");
    return store;
  }

  static getDb() {
    const { tx, db } = this.get();
    return tx ?? db;
  }

  static getUserId() {
    return this.get().userId;
  }

  static getTeamId() {
    return this.get().teamId;
  }

  /** Enable a transaction scope */
  static setTransactional(tx: typeof globalDb) {
    const store = this.get();
    store.tx = tx;
    store.inTransaction = true;
  }

  /** Exit transactional mode (reset) */
  static clearTransactional() {
    const store = this.get();
    store.tx = undefined;
    store.inTransaction = false;
  }

  static isInTransaction() {
    return this.get().inTransaction;
  }
}
