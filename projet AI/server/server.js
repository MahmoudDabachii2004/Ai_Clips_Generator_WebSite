const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


app.get('/api', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL parameter is required');
    }

    // Extraire l'ID de la vidéo à partir de l'URL (si nécessaire)
    const videoId = url.includes('youtu') ? new URL(url).searchParams.get('v') : url;

    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        res.json(transcript);
    } catch (error) {
        console.error('Error fetching transcript:', error);
        res.status(500).send('Failed to fetch transcript');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

