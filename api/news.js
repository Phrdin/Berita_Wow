// api/news.js
import fetch from 'node-fetch';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export default async (req, res) => {
    const { q, category } = req.query;

    if (!NEWS_API_KEY) {
        return res.status(500).json({ status: 'error', code: 'apiKeyMissing', message: 'NEWS_API_KEY tidak dikonfigurasi di Vercel.' });
    }

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

        if (data.status === 'error') {
            return res.status(400).json(data); 
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Gagal memuat berita dari sumber eksternal. Cek log Vercel.' });
    }
};