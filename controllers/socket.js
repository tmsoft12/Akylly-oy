import pool from '../utils/db.js';

export const addTemporal = ({ serial, state }, ip) => {
  const types = ['akylly chyra', 'dugme', 'perde'];
  pool.query(
    'SELECT serial FROM device WHERE serial = $1',
    [serial],
    (err, device) => {
      if (err) {
        return console.error('Hata:', err.stack);
      }
      if (device.rows.length === 0) {
        pool.query(
          'SELECT serial FROM temporal WHERE serial = $1',
          [serial],
          (err, oldTemporal) => {
            console.log('Eski:', oldTemporal.rows);
            if (err) {
              return console.error('Hata:', err.stack);
            }
            if (oldTemporal.rows.length === 0) {
              const a = serial % 100;
              const type_num = (serial - a) / 100 - 1;
              pool.query(
                'INSERT INTO temporal(serial, ip, type, state) VALUES($1, $2, $3, $4)',
                [serial, ip, types[type_num], state],
                (err, newTemporal) => {
                  if (err) {
                    return console.error('Hata:', err.stack);
                  }
                  console.log('Yeni:', newTemporal.rows);
                }
              );
            }
          }
        );
      }
    }
  );
};

export const updateDeviceSerial = ({ serial, state }, callback) => {
  pool.query(
    'UPDATE device SET state = $1 WHERE serial = $2',
    [state, serial],
    (err, device) => {
      if (err) {
        console.error('Hata:', err.stack);
        callback(err, null);
        return;
      }
      pool.query(
        'SELECT id, state FROM device WHERE serial = $1',
        [serial],
        (err, updated) => {
          if (err) {
            console.error('Hata:', err.stack);
            callback(err, null);
            return;
          }
          if (updated.rows.length) {
            const { id, state } = updated.rows[0];
            callback(null, { id, state: state === 1 });
          }
        }
      );
    }
  );
};

export const updateDeviceId = ({ id, state }, callback) => {
  pool.query(
    'UPDATE device SET state = $1 WHERE id = $2',
    [state, id],
    (err, device) => {
      if (err) {
        console.error('Hata:', err.stack);
        callback(err, null);
        return;
      }
      pool.query(
        'SELECT id, state FROM device WHERE id = $1',
        [id],
        (err, updated) => {
          if (err) {
            console.error('Hata:', err.stack);
            callback(err, null);
            return;
          }
          if (updated.rows.length) {
            callback(null, updated.rows[0]);
          }
        }
      );
    }
  );
};

export const deviceOff = (ip) => {
  pool.query('UPDATE device SET state = 0 WHERE ip = $1', [ip], (err, result) => {
    if (err) {
      console.error('Hata:', err.stack);
      return;
    }
    console.log(result.rows);
  });
};
