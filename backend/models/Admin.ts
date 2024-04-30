import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db_connect";
import { User } from "./User";

class AdminModel extends Model<AdminAttributes, AdminCreationAttributes> {
    admin_id!: number
    user_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}
const Admin = AdminModel.init({
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Egy felhasználó csak egy adminisztrátorként lehet regisztrálva
        references: {
            model: User, // A hivatkozott tábla neve
            key: "user_id" // A hivatkozott tábla elsődleges kulcsának neve
        }
    },
}, { sequelize, modelName: "Admin" });

type AdminAttributes = {
    admin_id: number,
    user_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

Admin.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

type AdminCreationAttributes = Optional<AdminAttributes, 'admin_id'>

export { AdminAttributes, AdminCreationAttributes, Admin }