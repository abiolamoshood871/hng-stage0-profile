const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Handle GET request to /me
app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data.fact;

    const data = {
      status: "success",
      user: {
        email: "abiolamoshood@gmail.com",   
        name: "Abiola Banusola",           
        stack: "Node.js/Express"
      },
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact. Please try again later."
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("HNG Stage 0 - Profile API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
