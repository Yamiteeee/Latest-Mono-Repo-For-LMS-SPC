import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "YOUR_DB_PASSWORD",
  database: "LMS_DB",
});

async function test() {
  const [rows] = await pool.query("SELECT 1 + 1 AS solution");
  console.log(rows);
  process.exit();
}

test();
