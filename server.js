const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', (req, res) => {
    const videoURL = req.query.url;
    const format = req.query.format;

    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).send('Invalid YouTube URL');
    }

    if (format === 'video') {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(videoURL, { format: 'mp4' }).pipe(res);
    } else if (format === 'audio') {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        ytdl(videoURL, { filter: 'audioonly', format: 'mp3' }).pipe(res);
    } else {
        return res.status(400).send('Invalid format');
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
