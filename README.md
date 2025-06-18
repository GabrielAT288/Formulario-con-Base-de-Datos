Formulario de Registro con Node.js, Express y SQLite
Este proyecto es una aplicación web interactiva diseñada para la gestión básica de usuarios. Comprende un frontend dinámico y un backend robusto construido con Node.js y Express, 
utilizando SQLite para el almacenamiento de datos. La aplicación está optimizada para ser desplegada en plataformas como Render.com.

Nota Importante sobre Persistencia de Datos: En el plan gratuito de Render.com, la base de datos SQLite, al ser un archivo local, no garantiza la persistencia de datos entre
reinicios del servicio. Los datos se restablecerán a su estado inicial cada vez que el servicio se detenga o redespliegue. Para una persistencia de datos a largo plazo en la nube,
se recomienda el uso de soluciones como Firebase Firestore o bases de datos relacionales gestionadas (ej., PostgreSQL).

Características Principales
Gestión de Usuarios: 👥

Formulario de registro con validación de datos en tiempo real (nombre completo, correo electrónico, y verificación de fortaleza/confirmación de contraseña).

Visualización interactiva de usuarios registrados en una tabla dinámica.

Funcionalidad para eliminar registros de usuarios individualmente.

Opción para mostrar/ocultar la tabla de registros, mejorando la usabilidad.

Experiencia de Usuario (UX) Mejorada: ✨

Animaciones de Fondo: Gradiente de color animado con transiciones suaves entre tonos morados, azules, cianes, verdes, amarillos, naranjas y rosas.

Fondo de Partículas: Implementación de particles.js para un efecto visual dinámico y atractivo en el fondo.

Paneles Interactivos: Paneles de formulario y tabla con efecto de transparencia (cristal esmerilado), elevación sutil y animación de flotación.

Feedback Visual: Indicadores de éxito/error en los campos de entrada y efectos visuales en los botones al interactuar con ellos.

Animaciones de Elementos: Transiciones animadas para la aparición de filas en la tabla y un popup de confirmación de registro de 3 segundos con icono animado para notificaciones.

Tecnologías Utilizadas
Frontend: 🌐

HTML5

CSS3 (con Tailwind CSS para utilidades)

JavaScript (ES6+)

particles.js para el fondo interactivo

Font Awesome para iconos

Backend: ⚙️

Node.js

Express.js

Base de Datos: 🗄️

SQLite3

Seguridad: 🔒

bcryptjs para el hashing seguro de contraseñas

URL de la Aplicación Desplegada
Puedes acceder a la aplicación en vivo, desplegada en Render.com, a través de la siguiente URL:

https://formulario-con-base-de-datos.onrender.com/

(Tenga en cuenta que puede experimentar un "cold start" (arranque en frío) inicial en el plan gratuito de Render.com, lo que podría causar un breve retraso en la carga de la aplicación.)

Instrucciones para Ejecución Local
Para configurar y ejecutar este proyecto en su entorno de desarrollo local, siga estos pasos:


Instalar Dependencias: 📦
Verifique que tiene Node.js y npm instalados en su sistema. Luego, desde la raíz del proyecto, instale las dependencias necesarias:

npm install

Iniciar el Servidor: ▶️
Una vez que todas las dependencias estén instaladas, inicie el servidor de la aplicación:

npm start

La terminal mostrará mensajes confirmando el inicio exitoso del servidor y la conexión a la base de datos SQLite:

Servidor escuchando en http://localhost:3000
Conectado a la base de datos SQLite.
Tabla de usuarios verificada o creada.

Si encuentra un error EADDRINUSE (dirección ya en uso), significa que otro proceso está utilizando el puerto 3000. Deberá identificar y terminar ese proceso antes de intentar iniciar el servidor nuevamente.

Acceder a la Aplicación: 🔗
Abra su navegador web preferido y navegue a la siguiente dirección:

http://localhost:3000

Explicación de Decisiones Técnicas
Node.js y Express.js: 🚀 Seleccionados por su eficiencia para construir APIs RESTful y su capacidad para servir contenido web. Express proporciona una estructura flexible y robusta para la gestión de rutas del backend.

SQLite3: 📊 Elegido por su naturaleza de base de datos embebida de archivo único, lo que simplifica la configuración y la gestión en entornos de desarrollo y demostración al no requerir un servidor de base de datos separado.

Consideración sobre Persistencia en Render.com: Es vital comprender que el plan gratuito de Render.com no ofrece almacenamiento de disco persistente. Por lo tanto, cualquier dato guardado en la base de datos database.sqlite será volátil y se perderá con cada reinicio o redespliegue del servicio.

Bcryptjs: 🔐 Integrado para garantizar la seguridad de las contraseñas de los usuarios mediante el hashing antes de su almacenamiento, lo que protege contra accesos no autorizados en caso de una brecha de seguridad.

Tailwind CSS: 🎨 Adoptado como un framework CSS basado en utilidades por su enfoque "mobile-first" y su capacidad para acelerar significativamente el desarrollo del frontend, permitiendo la creación de interfaces responsivas y estéticamente coherentes con un mínimo de código CSS personalizado.

Particles.js: ✨ Se incluyó para enriquecer la experiencia visual del usuario con un fondo interactivo y moderno, manteniendo un balance entre estética y rendimiento.

Diseño Interactivo y Estético: 🌟 La implementación de gradientes CSS dinámicos, animaciones de transformación y opacidad, y el efecto backdrop-filter para los paneles transparentes, se realizó para crear una interfaz de usuario moderna, fluida y visualmente atractiva, diferenciándose de un diseño estático.

Modularidad del Código: 🧩 La arquitectura del proyecto, que separa claramente el frontend (en la carpeta public) del backend (server.js), y el diseño del backend como una API, promueve la modularidad, facilita el mantenimiento, la depuración y ofrece flexibilidad para futuras expansiones.

Capturas de Pantalla de la Aplicación
Por favor, inserte aquí las capturas de pantalla relevantes que demuestren la funcionalidad y el diseño de la aplicación. Se sugiere incluir al menos las siguientes:

Formulario de Registro Inicial: Una vista clara del formulario de registro cuando la aplicación carga por primera vez.
Mensaje de Registro Exitoso: Una captura de pantalla del popup de confirmación que aparece tras un registro exitoso.
Tabla de Usuarios Registrados: Una captura de la tabla de usuarios con varios registros visibles, después de activarla con el botón correspondiente.
Vista de Render.com (Opcional, pero recomendado): Una captura del dashboard de Render.com que muestre el estado "Deployed" y "Live" de su servicio.

<img width="950" alt="image" src="https://github.com/user-attachments/assets/0bc482f6-33b8-4f36-9754-aedba36e0d72" />
<img width="950" alt="image" src="https://github.com/user-attachments/assets/d79498d5-e245-437a-b0b8-c089f2d3c58f" />
<img width="957" alt="image" src="https://github.com/user-attachments/assets/775aea26-62be-48da-95b6-05b173670f18" />
<img width="956" alt="image" src="https://github.com/user-attachments/assets/79c8621c-4cc7-4d1d-87f7-99533aef8cb3" />
<img width="203" alt="image" src="https://github.com/user-attachments/assets/93cc0105-2351-46f3-8872-83d4dd6a3781" />
<img width="199" alt="image" src="https://github.com/user-attachments/assets/3ccadfae-4e3f-438f-b841-e6d4758fc811" />
<img width="950" alt="image" src="https://github.com/user-attachments/assets/eb751d8a-5b6f-4422-940c-a0ba0a2879bf" />
<img width="609" alt="image" src="https://github.com/user-attachments/assets/cfa6f98b-9db2-44c6-9505-b4e28c6761e6" />

























