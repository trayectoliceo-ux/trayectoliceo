# Trayecto Liceo · trayectoliceo.com

Sitio institucional de **Trayecto Liceo**, marca de detección, formación y
acompañamiento del talento infantil, operada por Gebenz Consultoría y
Negocios, S.A. de C.V.

Next.js 15 (App Router) · TypeScript estricto · Tailwind CSS 3.4 ·
`motion/react` (Framer Motion) · Español de México · Diseño primero móvil.

---

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # compilación de producción
npm run start      # servir la compilación
npm run typecheck  # tsc --noEmit
npm run lint
```

Requiere Node 18.18 o superior.

> **Nota sobre las fuentes.** `next/font/google` descarga Petrona e IBM Plex
> en tiempo de compilación. Si tu red bloquea `fonts.googleapis.com`, el
> build falla en `src/app/layout.tsx`. En ese caso, autoalojar las fuentes
> con `next/font/local` es la alternativa.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel, *Add New → Project* e importar el repositorio.
3. Framework detectado automáticamente: Next.js. No hay variables de entorno
   pendientes mientras el formulario siga sin backend.
4. Asignar el dominio `trayectoliceo.com` en *Settings → Domains*.

Antes de publicar, actualizar `sitio.dominio` en `src/content/sitio.ts`: de
ahí salen los metadatos de Open Graph, el `sitemap.xml` y el `robots.txt`.

---

## Dónde se edita cada cosa

Ningún texto de marca vive dentro de un componente. Todo el contenido está
en `src/content/`.

| Qué cambiar | Archivo |
|---|---|
| Nombre, descriptor, correo, teléfono, WhatsApp, menú, enlace a PsicoMetrics | `src/content/sitio.ts` |
| Mensajes precargados de WhatsApp por página | `src/content/sitio.ts` → `mensajesWhatsApp` |
| Portada, los tres datos del problema, método, PsicoMetrics, testimonios | `src/content/inicio.ts` |
| Talleres: edades, duración, cupo, temario, precio, `slug` | `src/content/talleres.ts` |
| Diplomados y cursos: requisitos, temario, precio, **constancia** | `src/content/formacion.ts` |
| Colegios, orientación de trayectoria, equipo, marcos teóricos, artículos, materiales | `src/content/institucional.ts` |
| Paleta y escala tipográfica | `tailwind.config.ts` |
| Duraciones, curvas, escalonado y distancias de animación | `src/lib/motion.ts` |
| Reglas de validación del formulario | `src/lib/validacion.ts` |
| **Conexión con el backend** | `src/lib/enviarFormulario.ts` |

### Añadir un taller

Agregar un objeto al arreglo `talleres` en `src/content/talleres.ts`. La
página de detalle, la ruta estática y la entrada del `sitemap.xml` se
generan solas a partir del `slug`.

### Añadir un artículo

Agregar un objeto al arreglo `articulos` en `src/content/institucional.ts`.
Cuando el volumen lo justifique, sustituir ese arreglo por MDX o un CMS sin
tocar la vista: solo cambia el origen de los datos.

---

## Pendientes antes de publicar

Están marcados en el código entre corchetes. Tres bloquean la publicación:

1. **Los tres datos del problema** (`inicio.ts`) están como `[00 %]` con
   `[Fuente pendiente de verificación]`. Si un dato no se puede acreditar,
   se elimina la tarjeta completa en vez de publicarlo aproximado.
2. **El campo `constancia`** de cada programa (`formacion.ts`) lleva un
   `[AJUSTAR]`. Debe decir exactamente lo que la institución puede emitir.
   Si no hay reconocimiento oficial, es «constancia de participación» y
   nada más.
3. **La declaración de conflicto de interés** (`institucional.ts` →
   `trayectoria.declaracion`) tiene `[Universidad]` por sustituir. Se
   muestra en `/trayectoria` antes de la llamada a la acción, no en el pie.

Además: testimonios y logotipos son marcadores; no publicar sin
autorización por escrito. Los datos del equipo requieren cédula profesional
verificable para cualquier persona presentada como evaluadora.

---

## Conectar el formulario

Hoy no hay servidor. `src/lib/enviarFormulario.ts` simula el envío para que
el formulario tenga estados reales de carga, éxito y error.

Para conectarlo se sustituye **solo** el cuerpo de `enviarFormulario` (y de
`suscribirCorreo`, para los materiales descargables), entre los comentarios
`SUSTITUIR DESDE AQUÍ` / `HASTA AQUÍ`. Ningún componente conoce el
transporte, así que no hay que tocar la interfaz.

Al conectar, recordar: protección anti-spam, límite de peticiones por IP y
registro del consentimiento, que ya se recoge en el formulario.

---

## SEO

Lo que ya está implementado:

- **Metadatos por página** con un solo constructor (`src/lib/metadatos.ts`):
  título, descripción, URL canónica, Open Graph y Twitter Card. Ninguna
  página se queda sin canónica, que es el error más caro y más común.
- **Datos estructurados JSON-LD** (`src/lib/schema.tsx`): organización
  educativa con ficha local —dirección, coordenadas, horario, redes—,
  `Course` en cada taller y programa, `BreadcrumbList` en todas las páginas
  interiores, `FAQPage` en el inicio y `Article` en el blog.
- **Preguntas frecuentes visibles** en el inicio. Google solo acepta el
  marcado FAQPage si el visitante puede leer las respuestas, así que el
  texto está siempre en el DOM y solo se recorta la altura.
- **`sitemap.xml`** con prioridades que reflejan la intención comercial, y
  **`robots.txt`** que excluye el aviso legal del rastreo.
- **Imagen social** (`public/og.png`) para vistas previas en WhatsApp,
  Facebook y LinkedIn.
- **Rendimiento**, que hoy es factor de posicionamiento: todas las rutas se
  generan estáticas, las fuentes usan `font-display: swap` y las imágenes
  declaran dimensiones.

Al editar títulos y descripciones conviene respetar tres reglas: título por
debajo de 60 caracteres, descripción entre 140 y 158, y **una sola idea por
página**. Dos páginas compitiendo por el mismo término se canibalizan.

### Pasos que hay que dar fuera del código

1. Dar de alta el sitio en **Google Search Console** y enviar
   `https://trayectoliceo.com/sitemap.xml`.
2. Crear o reclamar el **perfil de Google Business** con la dirección de la
   31 Poniente. Para búsquedas locales tipo «altas capacidades Puebla» pesa
   más que cualquier cosa que se haga en la página.
3. Verificar el marcado en
   https://search.google.com/test/rich-results
4. Publicar contenido en `/recursos`. Las plantillas están listas y vacías;
   el posicionamiento en este sector se gana respondiendo preguntas reales
   de familias, no optimizando etiquetas.

---

## Decisiones de diseño

**Paleta.** Se deriva del logotipo. Analizado por matiz, el logotipo es en un
63 % azul, índigo y turquesa, y solo un 18 % cálido: no es un arcoíris, es
una familia fría con un acento ámbar concentrado en el anillo. El sitio
adopta esa misma proporción —índigo `#363C8E` como institucional, turquesa
`#166F84` como secundario, ámbar `#8C5809` reservado a acreditación y
llamadas—, sobre papel neutro frío `#F1F2F5` y tinta `#151827`. Todos los
colores cumplen contraste AA sobre los dos fondos del sitio. El logotipo
queda como el único punto de la página donde aparecen todos esos colores
juntos, y por eso destaca.

**Tipografía.** Petrona en titulares: serif de baja modulación dibujada en
Latinoamérica, con carácter pero sin el contraste extremo que habría llevado
el diseño al aspecto genérico. IBM Plex Sans en cuerpo. IBM Plex Mono en
etiquetas, edades, cupos y numeración: es el hilo conductor que hace que cada
bloque se lea como una entrada de expediente, y lo que le da a PsicoMetrics
su lenguaje de producto sin salirse de la familia.

**Momento firma.** Una sola secuencia orquestada, en la portada: la línea de
trayecto se dibuja de arriba abajo y sobre ella el titular sube línea a línea
desde dentro de su propia máscara —se compone, no aparece—; al final se
marcan los cuatro hitos, escalonados 80 ms. En móvil la misma figura gira a
horizontal. El resto del sitio es discreto a propósito.

**Movimiento.** Todas las animaciones derivan de `src/lib/motion.ts`. Solo se
animan `transform` y `opacity`; las salidas duran el 70 % de las entradas;
las revelaciones por scroll usan `once: true`; el escalonado total de
cualquier grupo se mantiene bajo 400 ms y pasa a modo denso automáticamente
con más de seis elementos. `prefers-reduced-motion` elimina desplazamiento y
escalado conservando opacidad y cambios de estado.

**Accesibilidad.** Foco de teclado propio y visible en todo elemento
interactivo, con variante clara sobre superficies oscuras. Objetivos táctiles
de 44 px como mínimo. Enlace de salto al contenido. El menú móvil atrapa el
scroll, cierra con Escape y devuelve el foco al botón que lo abrió. La
validación ocurre al salir del campo, los errores aparecen junto al campo y
el envío bloquea el botón.

---

## Lo que el sitio no hace, por decisión

- No hay cuestionario ni test que el visitante responda y reciba un
  resultado: eso es evaluación y exige profesional acreditado.
- No hay afirmaciones sobre resultados ni porcentajes de éxito.
- No hay contadores, valoraciones ni cifras sin acreditar.
- No hay precios tachados ni cuentas atrás.
- No hay pago en línea: la inscripción es siempre por contacto.
