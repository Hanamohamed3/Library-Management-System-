import Book from '../../../db/models/user/book.model.js';
import Borrowing from '../../../db/models/user/borrowing.model.js';
import User from '../../../db/models/user/user.model.js';


export const borrowBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
 const book = await Book.findByPk(bookId);
const user = await User.findByPk(userId);

        if (!book || !user) {
                 return res.status(404).json({ message: 'Book or User not found' });
        }

 if (book.borrowing) {
            return res.status(400).json({ message: 'Book is already borrowed' });
        }

        const newBorrowing = await Borrowing.create({ bookId, userId });
        await book.update({ borrowing: newBorrowing.id });
        res.status(201).json({ message: 'Book borrowed successfully', borrowing: newBorrowing });
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing book', error: error.message });
    }
};

export const returnBook = async (req, res) => {
    const { borrowingId } = req.body;

    try {
        const borrowing = await Borrowing.findByPk(borrowingId);
        if (borrowing) {
            await borrowing.update({ returnDate: new Date() });
     const book = await Book.findByPk(borrowing.bookId);
             await book.update({ borrowing: null });
            res.status(200).json({ message: 'Book returned successfully' });
        } else {
            res.status(404).json({ message: 'Borrowing record not found' });
        }} catch (error) {
 res.status(500).json({ message: 'Error returning book', error: error.message });
    }
};

export const viewBorrowedBooks = async (req, res) => {
    const { userId } = req.query;

    try {
    const borrowings = await Borrowing.findAll({
     where: { userId, returnDate: null },
 include: [{
                model: Book,
   attributes: ['title', 'genre', 'author']
            }]
        });

 res.json({ message: 'Borrowed books fetched successfully', borrowings });
    } catch (error) {
 res.status(500).json({ message: 'Error fetching borrowed books', error: error.message });
    }
};
