import pool from '../utils/db.js';

export const addRoom = async (req, res, next) => {
  try {
    const room = await pool.query('INSERT INTO room(name) VALUES($1) RETURNING *', [req.body.name]);
    const addedRoom = await pool.query('SELECT * FROM room WHERE id = $1', [room.rows[0].id]);
    return res.status(200).json(addedRoom.rows[0]);
  } catch (err) {
    return next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await pool.query('SELECT * FROM room WHERE id = $1', [req.params.id]);
    if (room.rows.length) {
      const devices = await pool.query('SELECT id, name, type, serial, state FROM device WHERE roomId = $1', [req.params.id]);
      return res.status(200).json({ ...room.rows[0], devices: devices.rows });
    } else {
      return res.status(404).json([]);
    }
  } catch (err) {
    return next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await pool.query('SELECT * FROM room');
    if (rooms.rows.length) {
      return res.status(200).json(rooms.rows);
    } else {
      return res.status(404).json([]);
    }
  } catch (err) {
    return next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await pool.query('DELETE FROM room WHERE id = $1', [req.params.id]);
    if (room.rowCount) {
      return res.status(200).json('otag ustunlikli posuldy');
    }
  } catch (err) {
    return next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await pool.query('UPDATE room SET name = $1 WHERE id = $2 RETURNING *', [req.body.name, req.params.id]);
    return res.status(200).json(room.rows[0]);
  } catch (err) {
    return next(err);
  }
};
