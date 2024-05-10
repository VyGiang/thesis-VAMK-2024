// api/src/server.ts
import express from "express";
import axios from "axios";

const app = express();
const port = 5000; // Port for the proxy server

app.use(express.json());

const apiKey = "f9ea6b0c0a0b41fd9b8537a32ff50dc0"; // Replace with your Fingrid API key

app.get("/api/datasets/317/data", async (req, res) => {
  const { startTime, endTime, page = 1 } = req.query;

  const url = `https://data.fingrid.fi/api/datasets/317/data`;

  try {
    const response = await axios.get(url, {
      params: {
        startTime,
        endTime,
        format: "json",
        locale: "en",
        sortBy: "startTime",
        sortOrder: "asc",
        page,
      },
      headers: {
        "Cache-Control": "no-cache",
        "x-api-key": apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
