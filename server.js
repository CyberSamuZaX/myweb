const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 'public' folder එකේ static files serve කරන්න

// OpenAI API Key
const OPENAI_API_KEY = 'sk-proj-F0Z42Pm6U_eewiPJaR6kCKy6Lx_X74HViDMWXC7DPfMi0DoxBfwXZ1pM4w0pzWN_PK9BEkVUNiT3BlbkFJfQKyxN8pRqCZU-GAXA_fEfH5qsSzbzqkzCcHJ';

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
