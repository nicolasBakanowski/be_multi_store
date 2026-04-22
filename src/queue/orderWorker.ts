import { Worker } from "bullmq";
import IORedis from "ioredis";
import pino from "pino";
import { getEnv } from "../config/env";

const log = pino({ level: process.env.LOG_LEVEL || "info" });

export function startOrderWorker(): Worker {
  const conn = new IORedis(getEnv().REDIS_URL, {
    maxRetriesPerRequest: null,
  });

  const worker = new Worker(
    "orders",
    async (job) => {
      log.info({ jobId: job.id, name: job.name, data: job.data }, "job ok");
    },
    { connection: conn }
  );

  worker.on("failed", (job, err) => {
    log.error({ jobId: job?.id, err }, "job failed");
  });

  log.info("Worker de pedidos iniciado");
  return worker;
}
