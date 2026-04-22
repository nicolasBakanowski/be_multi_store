import { Queue } from "bullmq";
import IORedis from "ioredis";
import { getEnv } from "../config/env";

const ORDER_QUEUE_NAME = "orders";

let queue: Queue | null = null;

function connection(): IORedis {
  return new IORedis(getEnv().REDIS_URL, { maxRetriesPerRequest: null });
}

export function getOrderQueue(): Queue {
  if (!queue) {
    queue = new Queue(ORDER_QUEUE_NAME, { connection: connection() });
  }
  return queue;
}

export async function enqueueOrderCreated(payload: {
  orderId: number;
  totalAmount?: number;
}): Promise<void> {
  if (process.env.NODE_ENV === "test") {
    return;
  }
  try {
    await getOrderQueue().add("order:created", payload, {
      removeOnComplete: true,
    });
  } catch {
    /* Redis no disponible: el pedido ya se persistió; no bloquear respuesta */
  }
}
