require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function realizarTransferencia(cuentaOrigenId, cuentaDestinoId, monto) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2',
      [monto, cuentaOrigenId]
    );

    await client.query(
      'UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2',
      [monto, cuentaDestinoId]
    );

    await client.query('COMMIT');
    console.log(`Transferencia de $${monto} realizada con exito de la cuenta ${cuentaOrigenId} a la cuenta ${cuentaDestinoId}.`);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Error en la transferencia. Transaccion revertida: ${error.message}`);

  } finally {
    client.release();
  }
}

async function main() {
  // Transferencia exitosa
  await realizarTransferencia(1, 2, 100.00);

  // Transferencia fallida por saldo insuficiente (600.00 > 500.00)
  await realizarTransferencia(2, 1, 600.00);

  await pool.end();
}

main();