import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";
import User from './user.model.js';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // genre: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // author: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },

}, {
    timestamps: true,
});

User.hasMany(Book, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Book.belongsTo(User);

export default Book;
