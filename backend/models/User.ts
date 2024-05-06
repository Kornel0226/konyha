import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db_connect';


class UserModel extends Model<UserAttributes, UserCreationAttributes> {
    user_id!: number;
    username!: string;
    email!: string;
    password!: string;
    profile_picture?: string;
    is_admin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const User = UserModel.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.BLOB
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Users',
});
type UserAttributes = {
    user_id: number;
    username: string;
    email: string;
    password: string;
    profile_picture?: string;
    is_admin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;
export { User, UserAttributes, UserCreationAttributes, UserModel };