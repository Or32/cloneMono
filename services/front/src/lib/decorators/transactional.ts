
import { db } from "@/lib/db";
import { RequestContext } from "../context/requestContext";

export function Transactional() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx = RequestContext.get();

      // If already in a transaction → reuse
      if (ctx.inTransaction) {
        return original.apply(this, args);
      }

      return db.transaction(async (tx) => {
        RequestContext.setTransactional(tx);
        try {
          return await original.apply(this, args);
        } finally {
          RequestContext.clearTransactional();
        }
      });
    };

    return descriptor;
  };
}
