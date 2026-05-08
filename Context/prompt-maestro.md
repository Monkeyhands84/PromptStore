# PromptStore — Documento base de vibe coding

## 1. Explicación en lenguaje natural: 

Quiero crear una aplicación web sencilla llamada PromptStore donde los usuarios puedan registrarse, iniciar sesión y guardar los prompts que utilizan con herramientas de inteligencia artificial.

Cada prompt tendrá un título, una descripción, el texto completo del prompt, una categoría y la posibilidad de marcarlo como favorito.

También quiero que algunos prompts puedan hacerse públicos para compartirlos mediante una URL propia. Estas páginas públicas deberán estar preparadas para SEO, con título, descripción y una estructura clara.

La app debe incluir funciones de inteligencia artificial para mejorar prompts, generar variantes, sugerir títulos y proponer categorías.

El objetivo final es tener una aplicación funcional, clara, sencilla de usar y publicable online.

## 2. Briefing de producto

## 🎯 Objetivo de la app

Crear una aplicación web sencilla y funcional que permita a los usuarios **guardar, organizar y mejorar sus prompts de inteligencia artificial**, con opción de compartirlos públicamente.

El objetivo es convertirse en una **biblioteca personal de prompts** con capacidades de mejora mediante IA y posibilidad de descubrimiento público.

---

## 👤 Usuario objetivo

* Usuarios habituales de herramientas de IA como ChatGPT, Midjourney o Claude
* Perfiles principales:

  * Creadores de contenido
  * Desarrolladores
  * Marketers
  * Diseñadores
  * Usuarios avanzados de IA

Nivel técnico: medio (acostumbrados a usar herramientas digitales, pero no necesariamente programadores)

---

## ❗ Problema que resuelve

Actualmente los usuarios:

* Pierden prompts útiles o los tienen dispersos (notas, docs, chats)
* No tienen una forma estructurada de organizarlos
* No optimizan sus prompts (falta de calidad o consistencia)
* No pueden compartirlos fácilmente de forma limpia y reusable

👉 PromptStore centraliza, organiza y mejora prompts en un solo lugar.

---

## ⚙️ Funcionalidades principales

### 1. Gestión de usuario

* Registro
* Login / Logout
* Recuperación de contraseña

### 2. CRUD de prompts

* Crear prompt
* Editar prompt
* Eliminar prompt
* Listar prompts

Cada prompt incluye:

* Título
* Descripción
* Texto completo
* Categoría
* Favorito (booleano)
* Público / privado

---

### 3. Organización

* Filtrado por categoría
* Búsqueda por texto
* Filtro de favoritos

---

### 4. Compartición pública

* Generación de URL única (slug)
* Página pública accesible sin login
* Contenido optimizado para SEO

---

### 5. Funciones de IA (core diferencial)

* Mejorar prompt (rewrite)
* Generar variantes
* Sugerir título
* Sugerir categoría

---

## 🖥️ Pantallas necesarias

### Públicas

* Home (explicación + CTA)
* Login / Registro
* Página pública de prompt (SEO)

### Privadas (dashboard)

* Dashboard (lista de prompts)
* Crear / editar prompt
* Vista detalle de prompt
* Perfil usuario (básico)

---

## 🗂️ Datos que hay que guardar

### Usuario

* id
* email
* password (hash)
* fecha de creación

### Prompt

* id
* user_id
* título
* descripción
* contenido
* categoría
* favorito (boolean)
* público (boolean)
* slug (para URL pública)
* fecha creación / actualización

---

## 🌍 Parte pública y SEO

### Página pública de prompt

Cada prompt público tendrá:

* URL tipo: `/prompt/{slug}`
* Meta title (basado en título)
* Meta description (basado en descripción)
* Contenido estructurado:

  * H1 (título)
  * Descripción
  * Prompt completo (bien formateado)

Objetivo:

* Indexación en Google
* Compartición directa
* Potencial tráfico orgánico

---

## 🤖 Funciones de IA

Integración con API tipo OpenAI o similar:

### Acciones disponibles:

* ✨ “Mejorar prompt”
* 🔁 “Generar variantes”
* 🧠 “Sugerir título”
* 🗂️ “Sugerir categoría”

### UX recomendada:

* Botones dentro del editor de prompt
* Resultado editable antes de guardar

---

## 🚀 MVP (Primera versión mínima)

Para lanzar rápido:

### Incluye:

* Registro / login
* CRUD básico de prompts
* Favoritos
* Público / privado
* Página pública con SEO básico
* 1 función de IA: “Mejorar prompt”

### NO incluye aún:

* Variantes múltiples
* Sistema avanzado de categorías
* Perfil complejo
* Social / comunidad

👉 Objetivo: validar uso real y necesidad

---

## 🧩 Stack sugerido (vibe coding friendly)

* Frontend + backend: Next.js
* Auth + DB: Supabase
* IA: OpenAI API
* Hosting: Vercel

---

## 🏁 Resultado final esperado

Una aplicación web que:

* Permite guardar y organizar prompts de forma clara
* Mejora la calidad de los prompts con IA
* Facilita compartir prompts públicamente
* Tiene una UX simple, rápida y sin fricción
* Está lista para escalar (features y usuarios)

## 3. Prompt maestro de desarrollo

Estoy construyendo una aplicación web llamada **PromptStore** y quiero que actúes como mi asistente técnico y de producto para desarrollarla paso a paso.

## 🧠 Contexto general

Quiero crear una app sencilla donde los usuarios puedan guardar, organizar y mejorar los prompts que utilizan con herramientas de inteligencia artificial.

La app debe ser simple, clara y funcional, pensada para lanzarse rápido (MVP) y evolucionar después.

---

## 🎯 Objetivo de la aplicación

Permitir a los usuarios:

* Guardar sus prompts en un solo lugar
* Organizarlos fácilmente
* Mejorarlos usando IA
* Compartir algunos prompts públicamente mediante URL

---

## ⚙️ Funcionalidades del MVP

Quiero centrarme solo en lo esencial:

### Usuarios

* Registro
* Login / logout

### Prompts

* Crear prompt
* Editar prompt
* Eliminar prompt
* Listar prompts

Cada prompt debe tener:

* Título
* Descripción
* Contenido (prompt completo)
* Categoría (texto simple)
* Favorito (booleano)
* Público / privado (booleano)

---

## 🌍 Parte pública (SEO)

* Cada prompt público debe tener una URL única tipo: `/prompt/{slug}`
* La página debe incluir:

  * Title (SEO)
  * Meta description
  * H1 con el título
  * Descripción
  * Prompt completo bien formateado

---

## 🤖 Funciones de IA (MVP)

Solo necesito una inicialmente:

* Botón para “mejorar prompt” usando un modelo de IA (por ejemplo OpenAI)

El resultado debe poder editarse antes de guardarse.

---

## 🖥️ Pantallas necesarias

* Home (explicación + CTA)
* Login / registro
* Dashboard (lista de prompts)
* Crear / editar prompt
* Página pública de prompt

---

## 🗂️ Base de datos

Necesito al menos:

* Tabla de usuarios
* Tabla de prompts (relacionada con usuarios)

Incluye campos necesarios para:

* Contenido del prompt
* Estado público/privado
* Slug para URLs públicas

---

## ⚙️ Requisitos técnicos

Quiero algo simple y rápido de construir.

Puedes usar un stack tipo:

* Next.js
* Supabase para auth + base de datos
* API de IA (OpenAI o similar)

Pero estoy abierto a alternativas si simplifican el desarrollo.

---

## 🚨 Instrucciones importantes

* NO sobrecomplicar la arquitectura
* Priorizar simplicidad y velocidad de desarrollo
* Evitar patrones enterprise innecesarios
* Todo debe ser entendible y mantenible

---

## 🔄 Forma de trabajar contigo

Quiero que trabajemos así:

1. Primero propón un **plan de desarrollo paso a paso**
2. Divide el trabajo en fases pequeñas
3. Antes de hacer cambios grandes, pregúntame
4. Explica cada decisión de forma simple (como si fuera producto, no solo código)
5. No generes todo el código de golpe
6. Avanza iterativamente

---

## 🧩 Qué necesito ahora

Empieza por:

* Proponer la arquitectura más simple posible
* Definir las primeras fases de desarrollo
* Sugerir estructura de carpetas
* Definir el esquema inicial de base de datos

No escribas aún toda la implementación. Quiero primero el plan claro.

---

## 4. Plan de desarrollo por fases

## 🟢 Fase 0 — Definición rápida y setup inicial

### 🎯 Objetivo

Tener una base clara y un entorno listo para empezar sin fricción.

### 🧱 Qué se construye

* Repo/proyecto inicial
* Estructura base (frontend + backend integrado o simple)
* Conexión inicial a base de datos
* Variables de entorno

### 🤔 Decisiones clave

* ¿Arquitectura monolítica simple o separada?
* ¿Dónde vivirán auth y DB? (servicio gestionado vs propio)
* ¿Cómo se gestionarán entornos (local / producción)?

### ✅ Resultado tangible

* Proyecto arranca en local
* Conexión a DB funcionando
* Deploy básico posible (aunque vacío)

### 🔍 Validar antes de avanzar

* ¿El proyecto levanta sin errores?
* ¿Puedes hacer una query simple a la DB?

---

## 🟢 Fase 1 — Autenticación de usuarios

### 🎯 Objetivo

Permitir que los usuarios creen cuenta e inicien sesión.

### 🧱 Qué se construye

* Registro de usuario
* Login / logout
* Gestión de sesión
* Protección de rutas privadas

### 🤔 Decisiones clave

* ¿Email/password únicamente?
* ¿Persistencia de sesión (cookies vs token)?
* ¿Flujo simple o con verificación email?

### ✅ Resultado tangible

* Usuario puede registrarse
* Usuario puede iniciar sesión
* Existe una ruta protegida accesible solo con sesión

### 🔍 Validar antes de avanzar

* ¿La sesión se mantiene tras refrescar?
* ¿Las rutas privadas están protegidas correctamente?

---

## 🟢 Fase 2 — Modelo de datos (Prompts)

### 🎯 Objetivo

Definir y crear la estructura de datos central de la app.

### 🧱 Qué se construye

* Tabla/colección de prompts
* Relación usuario → prompts
* Campos:

  * título
  * descripción
  * contenido
  * categoría
  * favorito
  * público
  * slug
  * timestamps

### 🤔 Decisiones clave

* ¿Slug generado automáticamente o editable?
* ¿Categoría libre o lista cerrada?
* ¿Soft delete o borrado real?

### ✅ Resultado tangible

* Puedes crear registros de prompts directamente en la DB
* Relación con usuario funcionando

### 🔍 Validar antes de avanzar

* ¿Cada prompt pertenece a un usuario?
* ¿Los campos cubren todos los casos del MVP?

---

## 🟢 Fase 3 — CRUD básico de prompts

### 🎯 Objetivo

Permitir al usuario gestionar sus prompts desde la UI.

### 🧱 Qué se construye

* Crear prompt (formulario)
* Listar prompts (dashboard)
* Editar prompt
* Eliminar prompt

### 🤔 Decisiones clave

* ¿Edición en la misma pantalla o separada?
* ¿Confirmación al eliminar?
* ¿Orden por defecto (fecha, favoritos…)?

### ✅ Resultado tangible

* Usuario puede gestionar completamente sus prompts
* Flujo CRUD completo funcional

### 🔍 Validar antes de avanzar

* ¿Los datos se guardan correctamente?
* ¿Hay errores al editar o borrar?
* ¿La UX es clara sin explicación?

---

## 🟢 Fase 4 — Organización y usabilidad

### 🎯 Objetivo

Hacer que la app sea útil en el día a día.

### 🧱 Qué se construye

* Marcar como favorito
* Filtro por favoritos
* Búsqueda por texto
* Filtro por categoría (simple)

### 🤔 Decisiones clave

* ¿Búsqueda en frontend o backend?
* ¿Filtros combinables?
* ¿UI minimalista o más explícita?

### ✅ Resultado tangible

* Usuario encuentra fácilmente sus prompts
* Dashboard usable con muchos prompts

### 🔍 Validar antes de avanzar

* ¿La búsqueda responde rápido?
* ¿Los filtros son intuitivos?

---

## 🟢 Fase 5 — Compartición pública

### 🎯 Objetivo

Permitir compartir prompts mediante URL pública.

### 🧱 Qué se construye

* Generación de slug único
* Toggle público/privado
* Página pública `/prompt/{slug}`

### 🤔 Decisiones clave

* ¿Slug basado en título o aleatorio?
* ¿Qué pasa si cambia el título?
* ¿Control de acceso si es privado?

### ✅ Resultado tangible

* Un prompt público se puede abrir sin login
* URL compartible funcional

### 🔍 Validar antes de avanzar

* ¿Los prompts privados están protegidos?
* ¿Las URLs funcionan correctamente?

---

## 🟢 Fase 6 — SEO básico

### 🎯 Objetivo

Hacer que los prompts públicos puedan indexarse.

### 🧱 Qué se construye

* Meta title dinámico
* Meta description
* Estructura HTML clara (H1, contenido)
* URLs limpias

### 🤔 Decisiones clave

* ¿Plantilla única o adaptable?
* ¿Descripción automática o editable?

### ✅ Resultado tangible

* Página pública optimizada para buscadores
* Lista para indexación

### 🔍 Validar antes de avanzar

* ¿El HTML es limpio?
* ¿Los metadatos se generan correctamente?

---

## 🟢 Fase 7 — Integración de IA (MVP)

### 🎯 Objetivo

Añadir valor diferencial con mejora de prompts.

### 🧱 Qué se construye

* Botón “Mejorar prompt”
* Llamada a API de IA
* Inserción del resultado en el editor

### 🤔 Decisiones clave

* ¿Sobrescribe o crea versión alternativa?
* ¿Mostrar comparación o no?
* ¿Coste por uso controlado?

### ✅ Resultado tangible

* Usuario puede mejorar un prompt con un clic

### 🔍 Validar antes de avanzar

* ¿El resultado es útil?
* ¿La latencia es aceptable?
* ¿El flujo es claro?

---

## 🟢 Fase 8 — Pulido de UX y estabilidad

### 🎯 Objetivo

Hacer la app agradable, clara y sin fricción.

### 🧱 Qué se construye

* Estados de carga
* Manejo de errores
* Feedback visual (guardado, acciones)
* Mejoras de UI básicas

### 🤔 Decisiones clave

* ¿Qué feedback necesita cada acción?
* ¿Qué errores mostrar al usuario?

### ✅ Resultado tangible

* App usable sin confusión
* Flujo fluido

### 🔍 Validar antes de avanzar

* ¿Se entiende todo sin explicación?
* ¿Hay puntos de fricción?

---

## 🟢 Fase 9 — Preparación para producción

### 🎯 Objetivo

Dejar la app lista para ser publicada.

### 🧱 Qué se construye

* Deploy en entorno real
* Configuración de dominio
* Variables de entorno producción
* Revisión básica de seguridad

### 🤔 Decisiones clave

* ¿Dónde desplegar?
* ¿Logs y monitoring básicos?

### ✅ Resultado tangible

* App accesible públicamente
* Usuarios reales pueden usarla

### 🔍 Validar antes de avanzar

* ¿Todo funciona en producción?
* ¿Hay errores críticos?

---

# 🏁 Resultado final

Al completar estas fases tendrás:

* Una app funcional de gestión de prompts
* Sistema de usuarios
* Compartición pública con SEO
* Integración básica de IA
* Base sólida para iterar

---

## 💡 Cómo usar este plan en vibe coding

* Ejecuta **una fase por vez**
* Pide a la herramienta IA que implemente SOLO esa fase
* Revisa el resultado antes de continuar
* Ajusta decisiones sobre la marcha

---

## 5. Reglas de trabajo con IA

- Trabajar siempre por pasos pequeños.
- No construir funcionalidades que no estén en el MVP sin confirmación.
- Explicar cada cambio antes de aplicarlo.
- Evitar arquitecturas demasiado complejas.
- Priorizar claridad, sencillez y facilidad de mantenimiento.
- Revisar errores después de cada cambio importante.
- Mantener separadas las partes privadas y públicas de la app.
- No exponer claves privadas ni datos sensibles.
- Pedir confirmación antes de cambios estructurales grandes.
- Mantener el objetivo final: una app funcional, clara y publicable online.