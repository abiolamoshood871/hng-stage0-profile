const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    // Fetch a random cat fact
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data.fact;

    // Proper JSON structure required for HNG
    const data = {
      status: "success",
      user: {
        email: "abiolamoshood871@gmail.com",
        name: "Abiola Banusola",
        stack: "Node.js/Express"
      },
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    // Ensure Content-Type is application/json
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact. Please try again later."
    });
  }
});

app.get("/", (req, res) => {
  res.send("HNG Stage 0 - Profile API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
