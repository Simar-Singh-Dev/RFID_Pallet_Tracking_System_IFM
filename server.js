const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// ✅ SQL Server Configuration (SQL Authentication)
const config = {
  server: "localhost",          // Use localhost now that TCP 1433 works
  database: "PalletDB",         // Your database
  user: "palletuser",           // Your SQL user
  password: "Pallet123!",       // Your SQL password
  options: {
    encrypt: false,             // For local development
    trustServerCertificate: true
  }
};

// ✅ Utility function: connect to SQL safely
async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("❌ SQL Connection Error:", err);
    throw err;
  }
}

// ✅ API: Get latest record per pallet
app.get("/api/pallets", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT p.*
      FROM PalletLog p
      INNER JOIN (
        SELECT PalletID, MAX([Timestamp]) AS max_time
        FROM PalletLog
        GROUP BY PalletID
      ) latest
      ON p.PalletID = latest.PalletID AND p.[Timestamp] = latest.max_time
      ORDER BY p.[Timestamp] DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ SQL Query Error:", err);
    res.status(500).send("Database connection or query failed");
  } finally {
    sql.close().catch(() => {}); // always close to prevent pool leaks
  }
});

// ✅ API: Health check
app.get("/api/health", async (req, res) => {
  try {
    await getConnection();
    res.status(200).send("✅ SQL Server Connected");
  } catch {
    res.status(500).send("❌ SQL Server Connection Failed");
  }
});

// ✅ Serve dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Auto-reconnect handling + logging
process.on("uncaughtException", (err) => {
  console.error("❗ Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("❗ Unhandled Rejection:", reason);
});

// ✅ Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Pallet Dashboard running at http://localhost:${PORT}`);
});
