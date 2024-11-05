import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import User from "./userModel";
import Lottery from "./lotteryModel";
import { LotteryParticipantAttributes } from "../interfaces/lotteryInterface";

class LotteryParticipant
  extends Model<LotteryParticipantAttributes>
  implements LotteryParticipantAttributes
{
  public id!: number;
  public userId!: number;
  public lotteryId!: number;
}

LotteryParticipant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lotteryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lottery,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "LotteryParticipant",
    tableName: "LotteryParticipants",
  }
);

LotteryParticipant.belongsTo(User, { foreignKey: "userId" });
LotteryParticipant.belongsTo(Lottery, { foreignKey: "lotteryId" });
Lottery.hasMany(LotteryParticipant, { foreignKey: "lotteryId" });
User.hasMany(LotteryParticipant, { foreignKey: "userId" });

export default LotteryParticipant;
