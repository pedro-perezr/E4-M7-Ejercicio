 E4-M7 Ejercicio
Transacción de Transferencia Bancaria Segura 🏦
Objetivo: Comprender y aplicar el concepto de transacciones en bases de datos para garantizar la integridad de los datos. Simularás una transferencia bancaria, una operación crítica donde es fundamental que todos los pasos se completen con éxito o, de lo contrario, ninguno lo haga, evitando así inconsistencias como la pérdida de dinero.

Prerrequisitos:

Tener tu conexión a la base de datos configurada (pool).

Necesitas una tabla cuentas. Conéctate a tu base de datos y ejecuta la siguiente sentencia SQL para crearla y poblarla:

-- Crear la tabla de cuentas
CREATE TABLE cuentas (
    id SERIAL PRIMARY KEY,
    titular VARCHAR(100) NOT NULL,
    saldo DECIMAL(10, 2) CHECK (saldo >= 0) -- El saldo no puede ser negativo
);

-- Insertar dos cuentas de ejemplo
INSERT INTO cuentas (titular, saldo) VALUES
('Juan Pérez', 1000.00),
('María López', 500.00);
