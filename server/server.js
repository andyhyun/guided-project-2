import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/planets', (req, res) => {
    res.json({ message: 'hi' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});