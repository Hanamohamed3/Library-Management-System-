
import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";
import Book from "./book.model.js";
import User from "./user.model.js";


const Borrowing = sequelize.define('Borrowing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: true,
});

Book.hasMany(Borrowing, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Borrowing.belongsTo(Book);

User.hasMany(Borrowing, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Borrowing.belongsTo(User);

export default Borrowing;
