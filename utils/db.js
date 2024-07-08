import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'newsmart',
  password: 'test',
  port: 5432, // Varsayılan PostgreSQL bağlantı noktası
});

client.connect((err) => {
  if (err) {
    console.error('PostgreSQL veritabanına bağlanırken hata oluştu:', err.stack);
  } else {
    console.log('PostgreSQL veritabanına başarıyla bağlandı');
  }
});

export default client;
