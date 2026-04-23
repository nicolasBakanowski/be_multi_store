import { Request, Response } from "express";
import AnalyticsEvent from "../models/analyticsEventModel";

type IngestEventBody = {
  eventId: string;
  name: string;
  timestamp: string;
  userId?: string | null;
  anonymousId: string;
  sessionId: string;
  platform: string;
  appVersion?: string | null;
  path?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  properties?: Record<string, unknown>;
};

function badRequest(message: string) {
  return Object.assign(new Error(message), { status: 400 });
}

export async function ingestAnalyticsEventController(req: Request, res: Response) {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ error: "Analytics ingest disabled in production" });
  }

  const body = req.body as IngestEventBody;
  if (!body || typeof body !== "object") throw badRequest("Invalid body");

  const required = ["eventId", "name", "timestamp", "anonymousId", "sessionId", "platform"] as const;
  for (const k of required) {
    if (!body[k] || typeof body[k] !== "string") throw badRequest(`Missing/invalid ${k}`);
  }

  const timestamp = new Date(body.timestamp);
  if (Number.isNaN(timestamp.getTime())) throw badRequest("Invalid timestamp");

  try {
    const created = await AnalyticsEvent.create({
      eventId: body.eventId,
      name: body.name,
      timestamp,
      userId: body.userId ?? null,
      anonymousId: body.anonymousId,
      sessionId: body.sessionId,
      platform: body.platform,
      appVersion: body.appVersion ?? null,
      path: body.path ?? null,
      referrer: body.referrer ?? null,
      utmSource: body.utmSource ?? null,
      utmMedium: body.utmMedium ?? null,
      utmCampaign: body.utmCampaign ?? null,
      utmContent: body.utmContent ?? null,
      utmTerm: body.utmTerm ?? null,
      properties: body.properties ?? {},
    });

    return res.status(201).json({ ok: true, id: created.id });
  } catch (e: any) {
    // Duplicate eventId (dedupe) => treat as success
    if (e?.name === "SequelizeUniqueConstraintError") {
      return res.status(200).json({ ok: true, deduped: true });
    }
    throw e;
  }
}

