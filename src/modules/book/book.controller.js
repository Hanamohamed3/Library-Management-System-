import Book from "../../../db/models/user/book.model.js";
import User from "../../../db/models/user/user.model.js";

export const addBook = async (req, res) => {
    const { title, userId } = req.body;
    if (!title || !userId) {
return res.status(400).json({ message: 'Title and userId are required' });
    }
    try {
        const newBook = await Book.create({ title, userId });
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) { res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};


export const updateBook = async (req, res) => {
    const { id, title, userId } = req.body;
    if (!id || !title || !userId) {
        return res.status(400).json({ message: 'id, title, and userId are required' });
}
    try {
        const book = await Book.findByPk(id);
        if (book) {
     book.title = title;
            book.userId = userId;
   await book.save();
            res.status(200).json({ message: 'Book updated successfully', book });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.body;
 if (!id) {
    return res.status(400).json({ message: 'id is required' });
    }
    try {
        const book = await Book.findByPk(id);
        if (book) {
 await book.destroy();
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
     res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};



export const getBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json({ message: "Books fetched successfully", books })
}

export const getSpecificBook = async (req, res) => {
    const { title, genre, author } = req.query;

    const filters = {};
if (title) filters.title = title;
    if (genre) filters.genre = genre;
if (author) filters.author = author;

try {
        const books = await Book.findAll({
            where: filters,
            include: {
                model: User,
attributes: { exclude: ["password", "loginStatus", "id"] },
            },
        });
        res.json({ message: "Books fetched successfully", books });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};
