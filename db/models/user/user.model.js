import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";


const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});



sequelize.sync()

export default User