import pkg from 'pg';
const { Client } = pkg;

// PostgreSQL veritabanı bağlantı bilgileri
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'newsmart',
  password: 'test',
  port: 5432, // Varsayılan PostgreSQL bağlantı noktası
});

// Veritabanına bağlanma
client.connect()
  .then(() => console.log('PostgreSQL veritabanına başarıyla bağlandı'))
  .catch(err => console.error('Veritabanına bağlanırken hata oluştu', err));
