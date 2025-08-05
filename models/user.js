const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model{}

User.init(
    {
        user_name:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: true,
    }
);

module.exports = User;