# Optimización de rendimiento

- Peso anterior del proyecto: **5.4 MB**
- Peso optimizado: **0.61 MB**
- Reducción aproximada: **88.7%**
- Imágenes convertidas a WebP: **10**

## Cambios aplicados

- Conversión y compresión de imágenes a WebP
- Dimensiones explícitas para evitar redistribuciones
- Lazy loading fuera del primer pantallazo
- Texto del hero visible desde el primer render
- Animaciones internas conservadas
- Fuente de Google cargada de forma no bloqueante
- JavaScript con `defer`
- CSS minificado
- `content-visibility` para secciones fuera del viewport
- Versionado de CSS y JavaScript para caché segura en GitHub Pages
