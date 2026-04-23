import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export type AnalyticsEventAttributes = {
  id?: number;
  eventId: string;
  name: string;
  timestamp: Date;
  userId: string | null;
  anonymousId: string;
  sessionId: string;
  platform: string;
  appVersion: string | null;
  path: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  properties: Record<string, unknown>;
};

class AnalyticsEvent
  extends Model<AnalyticsEventAttributes>
  implements AnalyticsEventAttributes
{
  public id!: number;
  public eventId!: string;
  public name!: string;
  public timestamp!: Date;
  public userId!: string | null;
  public anonymousId!: string;
  public sessionId!: string;
  public platform!: string;
  public appVersion!: string | null;
  public path!: string | null;
  public referrer!: string | null;
  public utmSource!: string | null;
  public utmMedium!: string | null;
  public utmCampaign!: string | null;
  public utmContent!: string | null;
  public utmTerm!: string | null;
  public properties!: Record<string, unknown>;
}

AnalyticsEvent.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    eventId: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.STRING(128), allowNull: true },
    anonymousId: { type: DataTypes.STRING(128), allowNull: false },
    sessionId: { type: DataTypes.STRING(128), allowNull: false },
    platform: { type: DataTypes.STRING(32), allowNull: false },
    appVersion: { type: DataTypes.STRING(32), allowNull: true },
    path: { type: DataTypes.STRING(512), allowNull: true },
    referrer: { type: DataTypes.STRING(512), allowNull: true },
    utmSource: { type: DataTypes.STRING(128), allowNull: true },
    utmMedium: { type: DataTypes.STRING(128), allowNull: true },
    utmCampaign: { type: DataTypes.STRING(128), allowNull: true },
    utmContent: { type: DataTypes.STRING(128), allowNull: true },
    utmTerm: { type: DataTypes.STRING(128), allowNull: true },
    properties: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  { sequelize, modelName: "AnalyticsEvent" }
);

export default AnalyticsEvent;

