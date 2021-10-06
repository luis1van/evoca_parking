const mysql = require('mysql2/promise');
const config = require('../config/db.config.js');
const pool = mysql.createPool(config);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query
}