/* ================================================================
   PROJECTS.JS — Datos de proyectos
   Federico Ariel Casado · 2026

   ¿CÓMO AÑADIR UN PROYECTO?
   ──────────────────────────
   1. Copiar el bloque de PLANTILLA al final del archivo
   2. Pegarlo dentro del array PROJECTS (antes del cierre `]`)
   3. Completar todos los campos
   4. Subir las imágenes a assets/img/
   5. Guardar y recargar la página

   CAMPOS:
     title           → Nombre visible del proyecto
     category        → Array con categorías: "python" | "autocad" | "revit" | "data"
     tags            → Chips mostrados en la tarjeta y en el modal
     description     → Texto corto para la tarjeta (2-3 oraciones)
     descriptionFull → Texto largo para el modal (separá párrafos con \n\n)
                       Si está vacío, el modal muestra `description`
     image           → Imagen principal de la tarjeta (ej: "assets/img/p01.jpg")
                       Dejar "" para placeholder
     images          → Array de capturas para la galería del modal
                       Si está vacío, usa `image` como única foto
                       Ej: ["assets/img/p01a.jpg", "assets/img/p01b.jpg"]
     link            → URL principal (GitHub, demo, etc.) — dejar "" si no aplica
     linkLabel       → Texto del botón principal
     linkAlt         → URL secundaria opcional
     linkAltLabel    → Texto del botón secundario
================================================================ */

const PROJECTS = [

  /* ════════════════════════════════════════════════════════════
     ✦ PLANTILLA — copiar este bloque completo para añadir un proyecto

  {
    title: "Nombre del proyecto",
    category: ["python"],             // opciones: "python" | "autocad" | "revit" | "data"
    tags: ["Tag1", "Tag2", "Tag3"],
    description:
      "Descripción breve que aparece en la tarjeta. "
      + "2 o 3 oraciones que resuman el proyecto.",
    descriptionFull:
      "Primer párrafo con más detalle sobre el proyecto. "
      + "Podés extenderte todo lo que necesites.\n\n"
      + "Segundo párrafo: tecnologías utilizadas, metodología, resultados obtenidos.\n\n"
      + "Tercer párrafo: impacto, aprendizajes, próximos pasos.",
    image: "assets/img/nombre-portada.jpg",
    images: [
      "assets/img/nombre-01.jpg",
      "assets/img/nombre-02.jpg",
      "assets/img/nombre-03.jpg",
    ],
    link: "https://github.com/federicoarielcasado/nombre-repo",
    linkLabel: "Ver GitHub",
    linkAlt: "",
    linkAltLabel: "",
  },

  ════════════════════════════════════════════════════════════ */

];
