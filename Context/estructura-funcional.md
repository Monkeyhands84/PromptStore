🧩 Tareas de desarrollo – PromptStore
🟢 Fase 0 — Setup inicial
Crear proyecto base
Configurar entorno local
Configurar variables de entorno
Conectar con base de datos
Verificar que la app arranca correctamente
Crear estructura básica de carpetas
Crear layout base (vacío)
🟢 Fase 1 — Autenticación
Crear formulario de registro
Validar campos básicos (email, password)
Implementar creación de usuario en base de datos
Crear formulario de login
Implementar inicio de sesión
Persistir sesión (cookie o token)
Crear botón de logout
Proteger rutas privadas
Redirigir usuario tras login
Redirigir usuario no autenticado fuera de rutas privadas
🟢 Fase 2 — Modelo de prompts
Crear tabla/colección de prompts
Añadir relación prompt → usuario
Añadir campo título
Añadir campo descripción
Añadir campo contenido
Añadir campo categoría
Añadir campo favorito (boolean)
Añadir campo público (boolean)
Añadir campo slug
Añadir timestamps (creación / actualización)
Probar inserción manual de un prompt
🟢 Fase 3 — Crear prompt
Crear botón “Nuevo prompt”
Crear pantalla/formulario de creación
Añadir input de título
Añadir input de descripción
Añadir textarea de contenido
Añadir input de categoría
Añadir toggle de favorito
Añadir toggle de público
Implementar guardado en base de datos
Redirigir al dashboard tras guardar
Mostrar confirmación de guardado
🟢 Fase 4 — Listado de prompts (dashboard)
Crear pantalla dashboard
Obtener prompts del usuario actual
Mostrar lista básica (título + descripción)
Ordenar por fecha de creación
Añadir enlace para editar prompt
Mostrar estado (favorito / público)
Manejar estado vacío (sin prompts)
🟢 Fase 5 — Editar prompt
Crear acceso a edición desde dashboard
Cargar datos del prompt en el formulario
Permitir editar todos los campos
Guardar cambios en base de datos
Mostrar confirmación de actualización
Manejar errores de guardado
🟢 Fase 6 — Eliminar prompt
Añadir botón de eliminar
Añadir confirmación antes de eliminar
Eliminar prompt en base de datos
Actualizar lista tras eliminar
Manejar errores
🟢 Fase 7 — Favoritos
Permitir marcar/desmarcar favorito desde dashboard
Guardar estado en base de datos
Mostrar indicador visual de favorito
Añadir filtro “solo favoritos”
Aplicar filtro en listado
🟢 Fase 8 — Búsqueda y filtros
Añadir input de búsqueda
Filtrar prompts por texto (título o contenido)
Añadir filtro por categoría
Permitir combinar búsqueda + filtros
Actualizar lista en tiempo real o al enviar
🟢 Fase 9 — Compartición pública
Generar slug único al crear/guardar prompt
Añadir toggle público/privado funcional
Crear ruta pública /prompt/{slug}
Buscar prompt por slug
Mostrar contenido del prompt públicamente
Bloquear acceso si el prompt es privado
Probar acceso sin login
🟢 Fase 10 — SEO básico
Añadir título dinámico a la página pública
Añadir meta description dinámica
Mostrar H1 con el título
Estructurar contenido correctamente
Verificar HTML limpio
🟢 Fase 11 — Función IA (Mejorar prompt)
Añadir botón “Mejorar prompt” en editor
Conectar con API de IA
Enviar contenido del prompt a la API
Recibir respuesta generada
Mostrar resultado en el editor
Permitir editar antes de guardar
Manejar estado de carga
Manejar errores de API
🟢 Fase 12 — UX básica
Añadir estados de carga (loading)
Añadir mensajes de error claros
Añadir mensajes de éxito (guardado, eliminado)
Mejorar claridad visual de formularios
Asegurar navegación clara entre pantallas
🟢 Fase 13 — Preparación para producción
Configurar entorno de producción
Revisar variables de entorno
Hacer deploy de la aplicación
Probar login en producción
Probar CRUD completo en producción
Probar páginas públicas
Corregir errores críticos
Verificar rendimiento básico