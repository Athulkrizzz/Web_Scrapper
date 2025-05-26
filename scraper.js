import axios from 'axios';
import * as cheerio from 'cheerio';


export default async function scrapeBooks() {
  const url = 'https://books.toscrape.com';
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const books = [];

  $('.product_pod').each((i, el) => {
    books.push({
      title: $(el).find('h3 a').attr('title'),
      price: $(el).find('.price_color').text(),
      rating: $(el).find('.star-rating').attr('class').split(' ')[1],
    });
  });

  return books;
}
