# CloudVM API - Backend RESTful & Real-Time Engine

API de soporte desarrollada con Node.js, Express, TypeScript y Socket.io para la gestión de infraestructura de máquinas virtuales (VMs). Diseñada bajo lineamientos de seguridad estricta, implementa transporte de tokens JWT mediante cookies `HttpOnly`, autorización basada en roles (RBAC) y difusión de eventos en tiempo real mediante WebSockets.

---

## 🔗 Enlaces del Proyecto y Despliegue

* **API en Producción (Backend):** `[INSERTAR_AQUI_LINK_DE_RENDER_O_PRODUCCION]`
* **Repositorio Frontend:** `https://github.com/Pebody-h/vm-management-frontend.git`
* **Demo Frontend en Producción:** `[INSERTAR_AQUI_LINK_DE_VERCEL_FRONTEND]`

> **Nota para evaluación:** Para visualizar la experiencia de usuario completa (Dashboard, Optimistic UI, Data Visualization y animaciones de socket), se requiere interactuar a través del cliente Frontend o desplegar ambos repositorios.

---

## 🔑 Credenciales Preconfiguradas

| Rol | Correo Electrónico | Contraseña | Nivel de Acceso |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@ifx.com` | `admin123password` | Control total: Crear, Leer, Actualizar, Borrar, Encender/Apagar VMs |
| **Cliente** | `cliente@ifx.com` | `cliente123password` | Solo lectura: Listado de recursos y métricas (escucha eventos en tiempo real) |

---

## ⚙️ Variables de Entorno (`.env`)

Crea un archivo `.env` en la raíz de la carpeta `backend` con la siguiente estructura:

```env
PORT=4000
JWT_SECRET=ifx_super_secret_jwt_key_2026
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Despliegue y Ejecución LocalInstalar dependencias:Bashnpm install
Ejecutar en entorno de desarrollo:
```Bash
npm run dev
```
El servidor iniciará en: http://localhost:4000 Compilar y ejecutar en producción:
```Bash 
npm run build
npm start
```
Verificar estado del servicio:Consulta el endpoint de salud en GET http://localhost:4000/health.

---

## 🔒 Especificación de Endpoints y Seguridad
Autenticación Segura (Cookie-Based JWT)El sistema prescinde deliberadamente del almacenamiento del JWT en localStorage. Al autenticarse, el backend emite una cookie firmada con las directivas HttpOnly, SameSite y condicionalmente Secure en producción.POST /api/auth/login: Valida credenciales, emite la cookie HttpOnly y retorna el payload público del usuario.POST /api/auth/logout: Invalida la sesión limpiando la cookie.GET /api/auth/me: Verifica y retorna los datos del usuario autenticado vía cookie.Endpoints CRUD de Máquinas Virtuales (Protegidos)MétodoEndpointAcceso RequeridoDescripciónEvento Socket EmitidoGET/api/vmsAdministrador / ClienteLista todas las VMsN/APOST/api/vmsAdministrador.
Crea una nueva VMvm_createdPUT/api/vms/:idAdministradorActualiza configuración o estadovm_updatedDELETE/api/vms/:idAdministradorElimina el registro de la VMvm_deleted

---

## 🏛️ Arquitectura del Backend  
```
+-------------------------------------------------------------------------+
  |                        Petición HTTP / Conexión WS                      |
  +-----------------------------------+-------------------------------------+
                                      |
                         +------------v------------+
                         |      CORS Middleware    |
                         |  (Origin / Credentials) |
                         +------------+------------+
                                      |
                         +------------v------------+
                         |   Cookie-Parser & Auth  |
                         |  (JWT Verify Middleware)|
                         +------------+------------+
                                      |
                         +------------v------------+
                         |    Controlador CRUD     |
                         +-----+--------------+----+
                               |              |
      [Transacción en Memoria] v              v [Difusión en Tiempo Real]
                   +-----------+--+        +--+-----------+
                   |  Data Store  |        |  Socket.io   |
                   |  (Persistencia)       |  (io.emit)   |
                   +--------------+        +--------------+
```

---

## 📝 Bitácora de IA
1. Herramientas UtilizadasAsistente de IA (Modelos LLM) como copiloto técnico.
2. Delegación vs. Intervención HumanaImplementado por el Candidato: Arquitectura base del servidor Express, esquemas de datos con TypeScript, diseño del middleware de verificación de roles, establecimiento de cookies seguras HttpOnly y la base operativa de emisión con socket.io.Delegado a la IA:Refinamiento en la propagación de eventos socket dentro del ciclo de vida de los controladores Express.Optimización de definiciones de tipos genéricos para peticiones autenticadas (AuthRequest).Estructuración del archivo de documentación técnica.
3. Prompt Clave Utilizado
```
"Tengo esta base de Express con Socket.io y almacenamiento en memoria. Ayúdame a refinar los controladores de actualización y eliminación para que emitan eventos específicos (vm_updated, vm_deleted) a todos los clientes conectados, manteniendo el middleware de autenticación por cookies HttpOnly desacoplado."
```