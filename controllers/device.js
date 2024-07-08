import pool from '../utils/db.js';

export const addDevice = async (req, res, next) => {
  const { id, name, type, serial, ip, state } = req.body;
  try {
    const device = await pool.query(
      'INSERT INTO device(name, type, serial, ip, state, roomId) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, type, serial, ip, state, req.params.id]
    );
    const deleted = await pool.query('DELETE FROM temporal WHERE id = $1', [id]);
    const added = await pool.query('SELECT * FROM device WHERE id = $1', [device.rows[0].id]);
    const { roomId, ...dev } = added.rows[0];
    return res.status(200).json(dev);
  } catch (err) {
    return next(err);
  }
};

export const newDevices = async (req, res, next) => {
  try {
    const temporal = await pool.query('SELECT * FROM temporal');
    if (temporal.rows.length) {
      return res.status(200).json(temporal.rows);
    } else {
      return res.status(404).json([]);
    }
  } catch (err) {
    return next(err);
  }
};

export const allDevices = async (req, res, next) => {
  try {
    const device = await pool.query('SELECT id, name, type, serial, state FROM device');
    if (device.rows.length) {
      return res.status(200).json(device.rows);
    } else {
      return res.status(404).json([]);
    }
  } catch (err) {
    return next(err);
  }
};

export const activeDevice = async (req, res, next) => {
  try {
    const active = await pool.query('SELECT id, name, type, serial, state FROM device WHERE state = 1');
    if (active.rows.length) {
      const newActive = active.rows.map((a) => {
        return { ...a, state: a.state === 1 };
      });
      return res.status(200).json(newActive);
    } else {
      return res.status(404).json([]);
    }
  } catch (err) {
    return next(err);
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const device = await pool.query('DELETE FROM device WHERE id = $1', [req.params.id]);
    if (device.rowCount) {
      return res.status(200).json('Enjam ustunlikli pozuldy');
    } else {
      return res.status(404).json('Enjam yok');
    }
  } catch (err) {
    return next(err);
  }
};

export const updateDevice = async (req, res, next) => {
  const { name, id } = req.body;
  try {
    const updated = await pool.query('UPDATE device SET name = $1, roomId = $2 WHERE id = $3', [name, req.params.id, id]);
    if (updated.rowCount) {
      return res.status(200).json('enjama uytgeshme girizildi');
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
