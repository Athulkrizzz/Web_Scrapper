import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  price: String,
  rating: String,
});

const Book = mongoose.model('Book', BookSchema);
export default Book;
