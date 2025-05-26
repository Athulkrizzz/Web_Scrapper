import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import scrapeBooks from './scraper.js';
import Book from './models/Book.js';

const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://athulkrizzz:ATHULKRISHNA@cluster0.edwpugx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


app.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

app.post('/scrape', async (req, res) => {
  const books = await scrapeBooks();
  await Book.deleteMany({});
  await Book.insertMany(books);
  res.redirect('/');
});

app.listen(3000,()=>{
    console.log('Listeninggggggg');
})