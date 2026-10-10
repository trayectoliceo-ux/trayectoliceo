# Imágenes del sitio

Coloca aquí las fotos y añade la ruta en el archivo de contenido
correspondiente. El marcador desaparece solo en cuanto haya `src`.

| Hueco | Archivo de contenido | Campo |
|---|---|---|
| Portada del inicio | `src/content/inicio.ts` | `portada.imagen.src` |
| Tres bloques «Qué hacemos» | `src/content/inicio.ts` | `queHacemos.bloques[].imagen` |
| Panel de PsicoMetrics | `src/content/psicometrics.ts` | `portada.imagen.src` |
| Cada taller | `src/content/talleres.ts` | `marcador` / `imagen` |
| Equipo | `src/content/institucional.ts` | `nosotros.equipo[].marcador` |

Ejemplo:

```ts
imagen: {
  src: '/imagenes/portada.jpg',
  descripcion: 'Dos niños con bata trabajando con instrumental',
},
```

## Requisitos

- **Formato**: JPG o WebP. Ancho mínimo 1600 px en las fotos grandes.
- **Peso**: por debajo de 400 KB cada una. Next.js las optimiza al servir,
  pero conviene no partir de archivos de 5 MB.
- **`descripcion`** se usa como texto alternativo: describe lo que se ve,
  no repitas el nombre de la marca.
- **Sin marcas de terceros.** Escudos, logotipos institucionales o
  emblemas de organismos —NASA, UNESCO, SEP y similares— no pueden
  aparecer sin autorización escrita, y sugieren un respaldo que no existe.
- **Con menores identificables**, hace falta autorización firmada de quien
  ejerce la patria potestad, y conviene archivarla.
