const materias = {
  // 1° Cuatrimestre
  "Taller de Introducción a la Economía y los Negocios": [],
  "Fundamentos de Marketing": [],
  "Administración General": [],
  "Introducción al Comercio Internacional": [],
  "Contabilidad General": [],

  // 2° Cuatrimestre
  "Principios de Economía": [],
  "Historia Económica y Social": [],
  "Matemática 1": [],
  "Administración Estratégica": [],
  "Informática Aplicada": [],

  // 3° Cuatrimestre
  "Problemática del Mundo Actual": [],
  "Matemática 2": ["Matemática 1"],
  "Inglés 1": [],
  "Marco Legal de la Empresa": [],
  "Psicología de la Organización": [],

  // 4° Cuatrimestre
  "Negocios Digitales": ["Administración Estratégica"],
  "Estadística": [],
  "Inglés 2": ["Inglés 1"],
  "Metodología de la Investigación": [],
  "Competencias Gerenciales": ["Administración General", "Psicología de la Organización"],
  "Taller de Integración": [],

  // 5° Cuatrimestre
  "Legislación Aduanera 1": ["Introducción al Comercio Internacional"],
  "Integración y Cooperación": ["Introducción al Comercio Internacional"],
  "Logística Internacional": ["Introducción al Comercio Internacional"],
  "Economía Mundial": ["Principios de Economía"],
  "Inglés 3": ["Inglés 2"],

  // 6° Cuatrimestre
  "Legislación Aduanera 2": ["Legislación Aduanera 1"],
  "Clasificación Arancelaria": ["Introducción al Comercio Internacional"],
  "Valoración": ["Introducción al Comercio Internacional"],
  "Costos y Precios": ["Introducción al Comercio Internacional", "Contabilidad General"],
  "Seminario de Integración": [
    "Taller de Introducción a la Economía y los Negocios", "Fundamentos de Marketing", "Administración General", "Introducción al Comercio Internacional",
    "Contabilidad General", "Principios de Economía", "Historia Económica y Social", "Matemática 1", "Administración Estratégica", "Informática Aplicada",
    "Problemática del Mundo Actual", "Matemática 2", "Inglés 1", "Marco Legal de la Empresa", "Psicología de la Organización", "Negocios Digitales",
    "Estadística", "Inglés 2", "Metodología de la Investigación", "Competencias Gerenciales", "Taller de Integración", "Legislación Aduanera 1",
    "Integración y Cooperación", "Logística Internacional", "Economía Mundial", "Inglés 3"
  ],

  // 7° Cuatrimestre
  "Administración Financiera": [],
  "Derecho Aplicado al Comercio Internacional": ["Marco Legal de la Empresa"],
  "Política de Negocios": ["Administración Estratégica"],
  "Técnicas Cuantitativas": ["Estadística"],
  "Taller de Trabajo Final": ["Metodología de la Investigación"],

  // 8° Cuatrimestre
  "Régimen Económico Financiero del Comercio Internacional": ["Introducción al Comercio Internacional", "Administración Financiera"],
  "Planeamiento y Evaluación de Proyectos": ["Administración Financiera", "Política de Negocios"],
  "Dirección Estratégica de Negocios Internacionales": ["Competencias Gerenciales", "Política de Negocios"],
  "Seminario de Práctica Profesional": ["Seminario de Integración"],
  "Trabajo Final": ["Taller de Trabajo Final"],
  "Experiencias Formativas Obligatorias de Carácter Electivo": []
};

const materiasPorCuatri = {
  1: ["Taller de Introducción a la Economía y los Negocios", "Fundamentos de Marketing", "Administración General", "Introducción al Comercio Internacional", "Contabilidad General"],
  2: ["Principios de Economía", "Historia Económica y Social", "Matemática 1", "Administración Estratégica", "Informática Aplicada"],
  3: ["Problemática del Mundo Actual", "Matemática 2", "Inglés 1", "Marco Legal de la Empresa", "Psicología de la Organización"],
  4: ["Negocios Digitales", "Estadística", "Inglés 2", "Metodología de la Investigación", "Competencias Gerenciales", "Taller de Integración"],
  5: ["Legislación Aduanera 1", "Integración y Cooperación", "Logística Internacional", "Economía Mundial", "Inglés 3"],
  6: ["Legislación Aduanera 2", "Clasificación Arancelaria", "Valoración", "Costos y Precios", "Seminario de Integración"],
  7: ["Administración Financiera", "Derecho Aplicado al Comercio Internacional", "Política de Negocios", "Técnicas Cuantitativas", "Taller de Trabajo Final"],
  8: ["Régimen Económico Financiero del Comercio Internacional", "Planeamiento y Evaluación de Proyectos", "Dirección Estratégica de Negocios Internacionales", "Seminario de Práctica Profesional", "Trabajo Final", "Experiencias Formativas Obligatorias de Carácter Electivo"]
};

const cuatrimestreDe = {};
Object.keys(materias).forEach(materia => {
  for (let i = 1; i <= 8; i++) {
    if (!cuatrimestreDe[materia] && materiasPorCuatri[i].includes(materia)) {
      cuatrimestreDe[materia] = i;
    }
  }
});

const estadoMaterias = {};

function crearGrilla() {
  const contenedor = document.getElementById("contenedor-cuatrimestres");
  contenedor.innerHTML = "";

  for (let i = 1; i <= 8; i++) {
    const seccion = document.createElement("div");
    seccion.className = "cuatrimestre";
    seccion.innerHTML = `<h2>${i}° Cuatrimestre</h2><div class="grid" id="grid-cuatri-${i}"></div>`;
    contenedor.appendChild(seccion);
  }

  Object.keys(materias).forEach(nombre => {
    const div = document.createElement("div");
    div.className = "materia bloqueada";
    div.textContent = nombre;
    div.id = nombre;
    div.onclick = () => toggleMateria(nombre);
    estadoMaterias[nombre] = "bloqueada";
    const cuatri = cuatrimestreDe[nombre];
    const grid = document.getElementById(`grid-cuatri-${cuatri}`);
    if (grid) grid.appendChild(div);
  });

  actualizarEstados();
}

function actualizarEstados() {
  for (const nombre in materias) {
    const requisitos = materias[nombre];
    const aprobadas = requisitos.every(req => estadoMaterias[req] === "aprobada");
    if (estadoMaterias[nombre] !== "aprobada") {
      estadoMaterias[nombre] = aprobadas ? "habilitada" : "bloqueada";
    }
    const div = document.getElementById(nombre);
    div.className = "materia " + estadoMaterias[nombre];
    div.style.textDecoration = estadoMaterias[nombre] === "aprobada" ? "line-through" : "none";
  }
}

function toggleMateria(nombre) {
  if (estadoMaterias[nombre] === "habilitada") {
    estadoMaterias[nombre] = "aprobada";
    actualizarEstados();
  }
}

function resetMaterias() {
  for (const nombre in estadoMaterias) {
    estadoMaterias[nombre] = "bloqueada";
  }
  actualizarEstados();
}

crearGrilla();
