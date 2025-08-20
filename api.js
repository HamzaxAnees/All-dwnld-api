const express = require("express");
const ytdlp = require("yt-dlp-exec"); // ✅ yt-dlp-exec import

const app = express();
const PORT = 3000;

app.get("/download", async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send("❌ Please provide a video URL: /download?url=YOUR_URL");
    }

    try {
        console.log("⬇️ Downloading:", url);

        // File name with timestamp
        const filename = `video_${Date.now()}.mp4`;

        // yt-dlp-exec command
        await ytdlp(url, {
            format: "bv*+ba/b", // best video+audio
            output: filename,   // save in current folder
        });

        console.log("✅ Downloaded:", filename);
        res.send(`✅ Video downloaded successfully: ${filename}`);
    } catch (err) {
        console.error("❌ Download error:", err);
        res.status(500).send("❌ Download failed!");
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
          
