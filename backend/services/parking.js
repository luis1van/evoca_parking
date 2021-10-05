const db = require('./db');

async function getParking(){
  const data = await db.query('SELECT * FROM PARKING_SPACE');

  return {
    data
  }
}

async function reserveParking(location){
  const data = await db.query('UPDATE PARKING_SPACE SET TAKEN = 1 WHERE (PARKING_SPACE.COL = ? AND PARKING_SPACE.ROW = ? )',[location.col,location.row]);
  return{
    data
  }
}

async function resetParking(){
  const data = await db.query('UPDATE PARKING_SPACE SET TAKEN = 0 WHERE (PARKING_SPACE.TAKEN = 1 )');
  return{
    data
  }
}

module.exports = {
  getParking,
  reserveParking,
  resetParking
}