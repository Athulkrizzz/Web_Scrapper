import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import scrapeBooks from './scraper.js';
import Book from './models/Book.js';
import AppError from './utils/AppError.js';
import wrapAsync from './utils/wrapAsync.js';
// const AppError=require('./utils/AppError')
// const wrapAsync=require('./utils/wrapAsync')
const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
import dotenv from 'dotenv';
dotenv.config(); 

// mongoose.connect('mongodb+srv://athulkrizzz:ATHULKRISHNA@cluster0.edwpugx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.get('/',wrapAsync( async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
}));

app.post('/scrape',wrapAsync(  async (req, res) => {
  const books = await scrapeBooks();
  await Book.deleteMany({});
  await Book.insertMany(books);
  res.redirect('/');
}));

app.all(/(.*)/, (req, res, next) => {
    next(new AppError("Page Not Found",404))
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000,()=>{
    console.log('Listeninggggggg');
})