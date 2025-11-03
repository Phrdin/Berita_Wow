// api/news.js
import fetch from 'node-fetch';

// Ganti process.env.NEWS_API_KEY menjadi kode API Anda untuk DEBUG VERCEL
const NEWS_API_KEY = '6b5b3f2327f94daa943a550b1787cf02'; 

export default async (req, res) => {
    const { q, category } = req.query;

    let url;
    const countryCode = 'us';

    if (q) {
        url = `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
    } else if (category) {
        url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${NEWS_API_KEY}`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API_KEY}`;
    }

    try {
        const newsResponse = await fetch(url);
        const data = await newsResponse.json();

        // Mengirimkan error NewsAPI secara spesifik ke frontend
        if (data.status === 'error') {
            return res.status(400).json(data); 
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error: Gagal koneksi ke sumber berita.' });
    }
};
