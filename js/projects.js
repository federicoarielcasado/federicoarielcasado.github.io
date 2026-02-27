/* ================================================================
   PROJECTS.JS — Datos de proyectos
   Federico Ariel Casado · 2025

   ¿CÓMO AÑADIR UN PROYECTO?
   ──────────────────────────
   1. Copiar el bloque de plantilla del final del archivo
   2. Pegarlo dentro del array PROJECTS (antes del cierre de `]`)
   3. Completar los campos
   4. Subir la imagen a la carpeta assets/img/
   5. Guardar y subir a GitHub

   CAMPOS:
     title        → Nombre visible del proyecto
     category     → Array con una o más categorías:
                    "python" | "autocad" | "revit" | "data"
     tags         → Array de strings mostrados como chips en la tarjeta
     description  → Descripción corta (2-3 oraciones)
     image        → Ruta relativa a la imagen (ej: "assets/img/p01.jpg")
                    Dejar "" para mostrar placeholder con textura
     link         → URL del repo/demo (ej: "https://github.com/...")
                    Poner "" si no tiene enlace todavía
     linkLabel    → Texto del botón principal (ej: "Ver GitHub", "Ver demo")
     linkAlt      → URL secundaria opcional (ej: demo además de GitHub)
     linkAltLabel → Texto del botón secundario
================================================================ */

const PROJECTS = [

  /* ────────────────────────────────────────────────────────────
     PROYECTO 1 — Python
  ──────────────────────────────────────────────────────────── */
  {
    title: "Automatización de Reportes SAP2000",
    category: ["python"],
    tags: ["Python", "Pandas", "ReportLab", "SAP2000"],
    description:
      "Script que lee archivos de salida de SAP2000, procesa los datos de esfuerzos y genera reportes PDF con tablas y gráficos automáticamente. Redujo el tiempo de documentación en un 60%.",
    image: "",                          // 👈 reemplazar: "assets/img/p01.jpg"
    link: "",                           // 👈 reemplazar con URL de GitHub
    linkLabel: "Ver GitHub",
    linkAlt: "",
    linkAltLabel: ""
  },

  /* ────────────────────────────────────────────────────────────
     PROYECTO 2 — Revit / BIM
  ──────────────────────────────────────────────────────────── */
  {
    title: "Familia Revit — Viga Cajón Paramétrica",
    category: ["revit"],
    tags: ["Revit", "Dynamo", "Python", "BIM"],
    description:
      "Familia paramétrica de viga cajón de acero para Revit con control de dimensiones, material y refuerzos desde una tabla Excel externa via Dynamo. Facilita el ajuste rápido de secciones en diseño.",
    image: "",                          // 👈 reemplazar: "assets/img/p02.jpg"
    link: "",
    linkLabel: "Ver proyecto",
    linkAlt: "",
    linkAltLabel: ""
  },

  /* ────────────────────────────────────────────────────────────
     PROYECTO 3 — Data + Python
  ──────────────────────────────────────────────────────────── */
  {
    title: "Dashboard de Monitoreo Estructural",
    category: ["data", "python"],
    tags: ["Power BI", "Python", "SQL", "DAX"],
    description:
      "Dashboard interactivo para monitoreo de deformaciones en tiempo real de estructuras instrumentadas. Integra datos de sensores vía SQL con visualizaciones dinámicas en Power BI.",
    image: "",                          // 👈 reemplazar: "assets/img/p03.jpg"
    link: "",
    linkLabel: "Ver demo",
    linkAlt: "",
    linkAltLabel: ""
  },

  /* ────────────────────────────────────────────────────────────
     PROYECTO 4 — AutoCAD
  ──────────────────────────────────────────────────────────── */
  {
    title: "Planos Estructurales — Edificio Residencial",
    category: ["autocad"],
    tags: ["AutoCAD", "Civil 3D", "Detallado estructural"],
    description:
      "Juego completo de planos estructurales para edificio de 8 pisos. Incluye fundaciones, losas, vigas, columnas y detalles constructivos conforme a normas CIRSOC.",
    image: "",                          // 👈 reemplazar: "assets/img/p04.jpg"
    link: "",
    linkLabel: "Ver galería",
    linkAlt: "",
    linkAltLabel: ""
  },

  /* ════════════════════════════════════════════════════════════
     ✦ PLANTILLA PARA NUEVO PROYECTO
     Copiar este bloque completo, pegar arriba del cierre `]`
     y completar todos los campos.
  ════════════════════════════════════════════════════════════

  {
    title: "Nombre del proyecto",
    category: ["python"],               // opciones: "python" | "autocad" | "revit" | "data"
    tags: ["Tag1", "Tag2", "Tag3"],
    description:
      "Descripción breve del proyecto. Qué problema resuelve, qué tecnologías usaste, "
      + "y cuál fue el resultado o impacto.",
    image: "assets/img/nombre-imagen.jpg",
    link: "https://github.com/federicoarielcasado/nombre-repo",
    linkLabel: "Ver GitHub",
    linkAlt: "https://mi-demo.com",     // dejar "" si no hay demo
    linkAltLabel: "Ver demo"
  },

  ════════════════════════════════════════════════════════════ */

];
