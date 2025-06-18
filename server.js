// Importa los módulos necesarios
const express = require('express'); // Framework web para Node.js
const sqlite3 = require('sqlite3').verbose(); // Base de datos SQLite
const path = require('path'); // Utilidad para trabajar con rutas de archivos y directorios
const bcrypt = require('bcryptjs'); // Librería para hashear contraseñas de forma segura

const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Define el puerto del servidor, usando el puerto de entorno o 3000 por defecto

// Conecta a la base de datos SQLite. Si el archivo no existe, lo creará.
// Advertencia: En servicios de despliegue como Render.com (plan gratuito), este archivo puede ser efímero.
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        // Si hay un error al conectar, imprímelo en la consola
        console.error('Error al conectar a la base de datos SQLite:', err.message);
    } else {
        // Si la conexión es exitosa, imprime un mensaje de confirmación
        console.log('Conectado a la base de datos SQLite.');
        // Crea la tabla 'users' si no existe.
        // `id` es la clave primaria autoincremental.
        // `name` y `email` son campos de texto no nulos y el email es único.
        // `password_hash` almacena la contraseña hasheada y es no nulo.
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )`, (err) => {
            if (err) {
                // Si hay un error al crear la tabla, imprímelo
                console.error('Error al crear la tabla de usuarios:', err.message);
            } else {
                // Si la tabla se crea o ya existe, imprime un mensaje
                console.log('Tabla de usuarios verificada o creada.');
            }
        });
    }
});

// Middleware para servir archivos estáticos desde el directorio 'public'
// Esto permite que el navegador acceda a index.html, CSS, JS del frontend
app.use(express.static(path.join(__dirname, 'public')));

// --- NUEVA RUTA PARA SERVIR INDEX.HTML EN LA RAÍZ ---
// Esta ruta asegura que index.html se sirva cuando se accede a la URL base.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
// Esto es necesario para leer los datos enviados desde el formulario del frontend
app.use(express.json());

// --- Rutas de la API ---

// Ruta para el registro de nuevos usuarios (POST /registro)
app.post('/registro', async (req, res) => {
    // Extrae el nombre, email y contraseña del cuerpo de la solicitud
    const { name, email, password } = req.body;

    // Validación básica en el backend (además de la del frontend)
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Genera un salt para el hashing de la contraseña. Cuanto mayor sea el número, más seguro pero más lento.
        const salt = await bcrypt.genSalt(10);
        // Hashea la contraseña proporcionada por el usuario
        const password_hash = await bcrypt.hash(password, salt);

        // Inserta los datos del nuevo usuario en la tabla 'users'
        db.run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, password_hash],
            function(err) { // Usamos function() para acceder a 'this.lastID'
                if (err) {
                    // Si el error es por una entrada duplicada (email único), devuelve 409 Conflict
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
                    }
                    // Para otros errores de la base de datos, devuelve 500 Internal Server Error
                    console.error('Error al insertar usuario:', err.message);
                    return res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
                }
                // Si la inserción es exitosa, devuelve el ID del nuevo usuario
                res.status(201).json({ message: 'Usuario registrado exitosamente', userId: this.lastID });
            }
        );
    } catch (error) {
        // Captura cualquier error durante el hashing o en la lógica
        console.error('Error en el registro:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para obtener todos los datos de los usuarios (GET /datos)
app.get('/datos', (req, res) => {
    // Selecciona todos los usuarios de la tabla 'users', excluyendo el hash de la contraseña por seguridad
    db.all('SELECT id, name, email FROM users', [], (err, rows) => {
        if (err) {
            // Si hay un error al consultar, devuelve 500 Internal Server Error
            console.error('Error al obtener datos:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor al obtener los datos.' });
        }
        // Si la consulta es exitosa, devuelve los usuarios como un arreglo JSON
        res.status(200).json(rows);
    });
});

// Ruta para eliminar un registro de usuario por ID (DELETE /eliminar/:id)
app.delete('/eliminar/:id', (req, res) => {
    // Extrae el ID del usuario de los parámetros de la URL
    const { id } = req.params;

    // Elimina el usuario con el ID especificado
    db.run('DELETE FROM users WHERE id = ?', id, function(err) {
        if (err) {
            // Si hay un error al eliminar, devuelve 500 Internal Server Error
            console.error('Error al eliminar usuario:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor al eliminar el usuario.' });
        }
        // Verifica si se eliminó alguna fila (this.changes > 0)
        if (this.changes === 0) {
            // Si no se encontró el usuario con ese ID, devuelve 404 Not Found
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        // Si la eliminación es exitosa, devuelve un mensaje de éxito
        res.status(200).json({ message: `Usuario con ID ${id} eliminado exitosamente.` });
    });
});

// Inicia el servidor y lo pone a escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
