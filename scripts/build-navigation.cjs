/* Vista previa. Los archivos de origen se mantienen separados de la web publicada. */
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const repo='https://github.com/LorenaVidarte/biblioteca-ia-formadores';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const resources=[
 {id:'config',file:'01_Prepara-tu-entorno/Instrucciones-formaciones.md',slug:'instrucciones-formaciones',title:'Instrucciones para el asistente',type:'Configuración',why:'Establecer cómo debe consultar las fuentes, preguntar y esperar tu aprobación.',group:'entorno',step:3},
 {id:'nombres',file:'01_Prepara-tu-entorno/Guia-nombrar-archivos-carpetas.md',slug:'nombrar-archivos',title:'Guía para nombrar archivos y carpetas',type:'Guía para leer',why:'Localizar los documentos y distinguir cursos, centros, ediciones y versiones.',group:'entorno',step:2},
 {id:'perfil',file:'01_Prepara-tu-entorno/Guia-perfil-del-alumnado.md',slug:'perfil-del-alumnado',title:'Guía del perfil del alumnado',type:'Guía para leer',why:'Redactar tú el perfil del grupo, distinguiendo lo conocido de lo provisional y protegiendo la privacidad.',group:'entorno',step:4},
 {id:'carpetas',file:'01_Prepara-tu-entorno/Crear-estructura-carpetas.md',slug:'crear-carpetas',title:'Organiza las carpetas de tus formaciones',type:'Prompt y explicación de uso',why:'Relacionar la configuración general, los centros, los cursos y sus ediciones.',group:'entorno',step:1},
 {id:'verificar',file:'02_Instrucciones-para-tareas/Revisar-informacion.md',slug:'revisar-informacion',title:'Revisa la información de la formación',type:'Prompt y explicación de uso',why:'Detectar datos pendientes, contradicciones y posibles confusiones antes de programar.',group:'tareas',step:5},
 {id:'programacion',file:'02_Instrucciones-para-tareas/Crear-programacion.md',slug:'crear-programacion',title:'Crea la programación del curso',type:'Prompt y explicación de uso',why:'Distribuir las sesiones de acuerdo con las fuentes y el perfil del grupo.',group:'tareas',step:6},
 {id:'resumen',file:'02_Instrucciones-para-tareas/Resumen-edicion.md',slug:'resumen-edicion',title:'Prepara el resumen de la edición',type:'Prompt y explicación de uso',why:'Reunir los datos principales y los enlaces a la documentación de una edición.',group:'tareas',step:7},
 {id:'actividad',file:'02_Instrucciones-para-tareas/Preparar-una-actividad.md',slug:'preparar-actividad',title:'Prepara una actividad',type:'Prompt y explicación de uso',why:'Relacionar el objetivo, el tiempo, la metodología, los recursos y la evaluación.',group:'tareas',step:8},
 {id:'adaptar',file:'02_Instrucciones-para-tareas/Adaptar-un-material.md',slug:'adaptar-material',title:'Adapta un material',type:'Prompt y explicación de uso',why:'Revisar qué conservar o cambiar antes de adaptar un material al grupo y a la sesión.',group:'tareas',step:8},
 {id:'rubrica',file:'02_Instrucciones-para-tareas/Elaborar-una-rubrica.md',slug:'elaborar-rubrica',title:'Elabora una rúbrica',type:'Prompt y explicación de uso',why:'Definir criterios, niveles de logro y puntuación relacionados con los aprendizajes.',group:'tareas',step:9},
 {id:'revisar',file:'02_Instrucciones-para-tareas/Revisar-actividad-y-evaluacion.md',slug:'revisar-actividad',title:'Revisa una actividad y su evaluación',type:'Prompt y explicación de uso',why:'Comprobar la relación entre los objetivos, la actividad y los criterios de evaluación.',group:'tareas',step:9},
 {id:'semana',file:'02_Instrucciones-para-tareas/Organizar-la-semana.md',slug:'organizar-semana',title:'Organiza la semana',type:'Prompt y explicación de uso',why:'Preparar una propuesta de tareas y prioridades.',group:'tareas'},
 {id:'diseno',file:'03_Skills/Diseno-guiado-evaluaciones/SKILL.md',slug:'diseno-evaluaciones',title:'Diseño guiado de evaluaciones',type:'Skill',why:'Guiar el diseño de pruebas, rúbricas y guías de corrección con validación docente.',group:'skills',zip:'03_Skills/Diseno-guiado-evaluaciones/diseno-guiado-evaluaciones.zip'},
 {id:'revision',file:'03_Skills/Revision-guiada-escritos/SKILL.md',slug:'revision-escritos',title:'Revisión guiada de escritos',type:'Skill',why:'Revisar escritos digitales o manuscritos con evidencias y validación antes del feedback.',group:'skills',zip:'03_Skills/Revision-guiada-escritos/revision-guiada-escritos.zip'},
];
const byId=id=>resources.find(r=>r.id===id);
const route=r=>`guias/${r.slug}.html`;
const prompt={};
const tree=`FORMACIONES
├── 00_Configuracion-general
├── 01_Centros
│   └── [CENTRO]
│       ├── 00_Instrucciones-del-centro
│       ├── 01_Plantillas-oficiales
│       └── 02_Ejemplos-de-referencia
├── 02_Cursos
│   └── [CODIGO_Nombre-del-curso]
│       ├── 01_Programa-oficial
│       └── 02_Materiales-reutilizables
│           ├── 01_Teoria
│           ├── 02_Actividades
│           ├── 03_Modelos-de-evaluacion
│           └── 04_Recursos-complementarios
└── 03_Ediciones
    └── [CODIGO_Nombre-breve_CENTRO_2026-E01]
        ├── 00_Contexto
        ├── 01_Documentacion-y-calendario
        ├── 02_Programacion-aprobada
        ├── 03_Materiales-del-grupo
        ├── 04_Evaluacion
        └── 05_Borradores`;
prompt.carpetas=`Ayúdame a organizar la documentación de mis formaciones. Te facilito una carpeta con los archivos o, si no puedes acceder, una lista de los documentos.

Propón una estructura que relacione lo común a mi trabajo, los requisitos de cada centro, los programas y materiales de cada curso y la información de cada edición (grupo, fechas, recursos y programación).

Utiliza como referencia esta estructura. Los nombres entre corchetes indican datos que debes preguntarme; no crees carpetas con nombres de ejemplo:

${tree}

Comprueba qué información puedes consultar. Pregunta los nombres y códigos que necesites y señala lo que no puedas identificar. No inventes datos ni dupliques carpetas existentes.

Presenta primero la organización propuesta en el chat. No muevas, renombres ni elimines archivos sin mi autorización.

Si tienes acceso y permisos, después de que confirme la propuesta podrás crear las carpetas y realizar únicamente los movimientos que autorice. Si no puedes hacerlo directamente, indícame qué carpetas debo crear y dónde colocar cada documento.`;
prompt.verificar=`Lee y aplica las instrucciones de trabajo que te he facilitado. Confirma cuáles puedes consultar.

Revisa la documentación de esta formación y el perfil del alumnado. Indica qué archivos puedes leer y resume la información necesaria para preparar la programación, señalando la fuente de cada dato.

Distingue los requisitos de los documentos, las decisiones que yo haya confirmado y las hipótesis pendientes de comprobar. Identifica la información que falta y las contradicciones. No inventes datos.

No prepares todavía la programación. Presenta la revisión en el chat y espera a que compruebe y confirme la información.`;
prompt.programacion=`Prepara la programación del curso [nombre del curso], edición [centro, grupo o fechas], de acuerdo con el programa oficial, las especificaciones del centro, el calendario y el perfil del alumnado.

Relaciona las sesiones con los objetivos, las competencias y los contenidos que deben alcanzarse. Incorpora las actividades ya definidas y, cuando sea necesario, propón otras adecuadas al grupo, al tiempo y a los recursos disponibles.

Utiliza la plantilla oficial y el documento de referencia que te he facilitado para mantener la estructura requerida. No copies del modelo fechas, nombres ni datos de otra edición.

Presenta primero el borrador en el chat, distingue los requisitos de tus propuestas y señala la información que falte. No generes el archivo hasta que lo apruebe.`;
prompt.resumen=`Prepara un resumen de la edición [curso, centro y fechas] utilizando la información verificada y la programación aprobada.

Incluye los datos principales, los recursos disponibles, las decisiones confirmadas y los enlaces a los documentos correspondientes. Señala lo que siga pendiente.

No inventes información ni reproduzcas los datos del perfil del alumnado. Presenta primero el borrador en el chat.`;
for(const r of resources.filter(r=>['actividad','adaptar','rubrica','revisar','semana'].includes(r.id))){
 const md=fs.readFileSync(path.join(root,r.file),'utf8');
 const section=md.split(/## Instrucci[oó]n para copiar\s*\r?\n/)[1]?.split(/\r?\n## /)[0];
 if(!section)throw Error('Falta el prompt: '+r.file);
 prompt[r.id]=section.trim().split(/\r?\n/).map(x=>x.replace(/^> ?/,'')).join('\n').trim();
}
const about={
 audience:{title:'¿Para quién es esta guía?',text:'Para formadores y formadoras de personas adultas (formación ocupacional, continua, en empresas, idiomas y talleres, entre otros).\n\nEspecialmente útil si impartes varios cursos, colaboras con distintas entidades o repites una formación con diferentes grupos. La organización propuesta es adaptable.'},
 use:{title:'¿Cómo utilizarla?',text:'Sigue los pasos en orden. Las instrucciones explican qué hacer y las fichas identifican los recursos para copiar, completar o descargar.\n\nPuedes empezar en una conversación con tu asistente de IA. No necesitas crear un proyecto ni instalar una skill.\n\nFacilita los documentos necesarios e indica que aplique Instrucciones-formaciones.md. Comprueba que pueda leerlos.'}
};
const steps=[
 {n:1,title:'Reúne y organiza la documentación',body:`Reúne la documentación disponible de tus formaciones en una carpeta: programas, requisitos de los centros, plantillas, calendarios y materiales.

Puedes organizarla con ayuda de la IA de dos formas:

- **Si el asistente puede trabajar con tus carpetas:** dale acceso y pídele que revise los archivos y proponga cómo organizarlos. Comprueba la propuesta antes de autorizar que los mueva.
- **Si no puede hacerlo directamente:** facilítale la información necesaria y pídele que te indique qué carpetas crear y dónde guardar cada archivo.

**La estructura debe permitir relacionar la información sin mezclarla:**

| Información | Cómo se relaciona |
| --- | --- |
| Configuración general | Las instrucciones de trabajo se aplican a tus distintas formaciones. |
| Centro | Sus requisitos y plantillas se utilizan en los cursos que impartes para esa entidad. |
| Curso | Su programa y sus materiales reutilizables sirven de referencia para las distintas ocasiones en que lo impartes. |
| Edición | Cada impartición reúne el grupo, las fechas, los recursos y la programación específicos, y se relaciona con el curso y el centro correspondientes. |

Por ejemplo, puedes impartir **el mismo curso en dos centros**. Ambos comparten el programa y algunos materiales, pero cada centro puede exigir una plantilla diferente y cada grupo necesitar actividades adaptadas.

Conviene guardar cada documento común en su lugar y utilizar enlaces o accesos directos cuando sea necesario. Así podrás reutilizar materiales y localizar los requisitos correctos, reduciendo duplicados y evitando trasladar por error fechas o datos de otro grupo.`,prompts:['carpetas'],check:'Comprueba que puedes identificar a qué centro, curso o edición pertenece cada documento. Si no está claro, déjalo pendiente de revisar.'},
 {n:2,title:'Establece cómo nombrar archivos y carpetas',body:`Utiliza nombres coherentes para que tú y el asistente podáis identificar a qué centro, curso y edición pertenece cada documento.

- Separa los bloques de información con \`_\` y las palabras de un mismo bloque con \`-\`.
- Escribe las fechas como \`AAAA-MM-DD\` y utiliza versiones como \`v01\`, \`v02\`.
- Añade el estado cuando sea útil: \`borrador\`, \`revisado\` o \`aprobado\`.
- Conserva sin cambios los documentos oficiales recibidos del centro.
- Evita nombres, documentos de identidad u otros datos personales del alumnado.

Ejemplo (el código y el centro son ilustrativos):

\`CUR001_Competencias-digitales_CENTRO_2026-E01_Programacion_v02_aprobado.docx\`

No todos los archivos necesitan incluir todos estos datos. El nombre debe aportar la información necesaria para distinguirlo sin hacerse demasiado largo.

Guarda esta guía en \`FORMACIONES/00_Configuracion-general\`, porque sus criterios se aplican a todas tus formaciones.`,files:['nombres'],check:'Comprueba que los nombres permiten reconocer el documento y su contexto.'},
 {n:3,title:'Define cómo quieres que trabaje tu asistente',body:`Antes de pedirle tareas, conviene establecer unas reglas. Así podrá ajustar sus propuestas a tus objetivos, consultar la documentación adecuada y saber cuándo debe esperar tu revisión.

**¿Qué necesitas definir?**

- Qué fuentes debe consultar y cómo distinguir los datos confirmados de sus propuestas.
- Qué debe hacer si falta información: preguntar, señalar lo que desconoce y no inventar datos.
- Qué criterios debe respetar: tus decisiones y los requisitos de la entidad.
- Cómo revisaréis el trabajo: presentar primero el borrador en el chat y recoger tus correcciones.
- Cuándo puede generar archivos: esperar una autorización explícita.

Revisar el contenido antes de preparar los archivos evita dedicar tiempo al formato de una propuesta que todavía necesita cambios. También te ayuda a mantener el control sobre las decisiones.

**Puedes crear tus propias instrucciones**, con tus criterios y tu forma de trabajar. Te recomendamos leer el archivo que proponemos para entender qué conviene indicar al asistente y decidir qué mantener, adaptar o añadir.

Guarda tus instrucciones en:

\`FORMACIONES/00_Configuracion-general/Instrucciones-formaciones.md\`

**Van en esta carpeta porque son reglas comunes para todas tus formaciones, independientemente del centro, el curso o el grupo.**

Después, facilita el archivo al asistente y pídele que lo aplique. Guardarlo en una carpeta no garantiza que pueda leerlo ni que siga sus instrucciones.`,files:['config'],check:'Comprueba que las instrucciones reflejan cómo quieres trabajar y que el asistente puede consultarlas.'},
 {n:4,title:'Describe el perfil del alumnado',body:`Para preparar una formación, necesitamos conocer tanto el programa como las características del grupo. Esta información ayuda a ajustar las actividades, el lenguaje, los tiempos y los apoyos.

**Te recomendamos leer la guía del perfil del alumnado que encontrarás al final de este paso**, para conocer qué criterios conviene tener en cuenta.

Redacta un texto con la información relevante que tengas sobre el grupo. Si todavía no conoces al alumnado, parte de esa descripción será provisional: **distingue los datos confirmados de las previsiones o hipótesis y señala lo que desconoces**.

Podrás revisar y ajustar el perfil después de una **evaluación inicial** (actividades o preguntas que permiten conocer el punto de partida del grupo).

Describe al grupo de forma anónima, evitando nombres, diagnósticos o combinaciones de detalles que permitan identificar a una persona.

Guarda el texto como \`Perfil-del-alumnado.md\` en la carpeta \`00_Contexto\` de la edición.

**Va en esa carpeta porque describe a ese grupo concreto y puede cambiar cada vez que impartes el curso.**`,files:['perfil'],check:'Comprueba que el perfil distingue los datos confirmados de las hipótesis y no permite identificar a participantes. Si es provisional, recuerda revisarlo tras la evaluación inicial.'},
 {n:5,title:'Comprueba la información antes de programar',body:`Con la documentación organizada, las instrucciones definidas y el perfil del grupo preparado, pide al asistente que revise las fuentes.

**El objetivo de este paso es comprobar la información de partida.** La programación se elaborará después, cuando hayas revisado los datos y resuelto las dudas necesarias.

Pídele que identifique qué archivos puede leer, los requisitos del curso y del centro, las condiciones de esta edición, los datos pendientes o contradictorios y qué aspectos del perfil son provisionales.

El asistente podría utilizar un calendario antiguo, confundir una plantilla de ejemplo con un requisito o tratar una previsión sobre el grupo como un hecho. Comprobar las fuentes ahora evita trasladar esos errores a la programación.`,prompts:['verificar'],check:'Contrasta la respuesta con los originales, corrige las interpretaciones y resuelve los datos necesarios para programar.'},
 {n:6,title:'Prepara la programación del curso',body:`Con la información verificada, pide una programación que relacione las sesiones con los objetivos, las competencias, los contenidos, las actividades y la evaluación.

**Si utilizas \`Instrucciones-formaciones.md\`:** después de revisar el borrador, escribe **APROBADO: genera el documento**. Si el asistente tiene acceso a la plantilla, creará el archivo en \`05_Borradores\`, manteniendo la estructura, los logotipos, el encabezado y el pie de página.

Revísalo antes de moverlo a \`02_Programacion-aprobada\`. Va en esa carpeta porque será la referencia para desarrollar las sesiones de esa edición.

Si utilizas otra configuración, establece expresamente cómo revisarás los borradores, autorizarás los archivos y utilizarás la plantilla.`,prompts:['programacion'],check:'Comprueba que cubre los objetivos y contenidos, respeta la duración, es viable para el grupo y utiliza la plantilla correcta.'},
 {n:7,title:'Resume la información de la edición',body:`Cuando la programación esté aprobada, prepara un resumen que permita localizar rápidamente la información de esa edición.

Incluye el curso, centro y edición; fechas, horario, duración y modalidad; recursos disponibles; enlace al perfil del alumnado; enlaces a los documentos oficiales, calendario y programación aprobada; decisiones confirmadas y cuestiones pendientes.

El resumen orienta al asistente y al formador, pero no sustituye los documentos originales ni debe duplicar el perfil del alumnado.

Guárdalo en \`00_Contexto\` de la edición, porque sirve como punto de entrada para comprender la formación y localizar sus documentos.`,prompts:['resumen'],check:'Revisa los datos y los enlaces del resumen antes de autorizar su archivo, según las instrucciones que utilices.'},
 {n:8,title:'Desarrolla las actividades y los materiales',body:`Utiliza la programación aprobada para preparar cada sesión. Indica la sesión y el objetivo, el tiempo disponible, la metodología, los recursos, las características relevantes del grupo y los criterios que debe respetar.

Puedes crear una actividad nueva o adaptar un material existente. Si falta información, el asistente debe preguntarla o distinguir sus propuestas de los datos confirmados.

Si utilizas \`Instrucciones-formaciones.md\`, el asistente presentará primero el borrador. Después de aprobarlo con **APROBADO: genera el documento**, guardará el archivo en \`05_Borradores\`.

Cuando lo hayas comprobado, muévelo a \`03_Materiales-del-grupo\`, porque reúne los materiales adaptados a esa edición.`,prompts:['actividad','adaptar'],check:'Comprueba la relación con el objetivo, la adecuación al grupo, el tiempo, los recursos y la claridad de las instrucciones.'},
 {n:9,title:'Prepara y revisa la evaluación',body:`A partir de la programación aprobada, concreta cómo comprobarás el aprendizaje y qué criterios utilizarás para valorar los resultados.

Indica al asistente los objetivos y competencias que quieres evaluar, el momento de la evaluación, el tipo de actividad o prueba y el tiempo disponible.

Revisa que las tareas permitan demostrar lo aprendido y que los criterios sean claros y adecuados al grupo.

Si utilizas la configuración recomendada, revisarás primero el borrador y autorizarás el archivo con **APROBADO: genera el documento**.

El archivo se guardará en \`05_Borradores\`. Cuando compruebes que está correcto, muévelo a \`04_Evaluacion\`, porque reúne los instrumentos y criterios de evaluación de esa edición.`,prompts:['rubrica','revisar'],check:'Verifica que se evalúa lo previsto, que los criterios son observables y que las condiciones y la puntuación son comprensibles.'}
];
const {compactBodies,skillDesign,skillModals,skillsLanding}=require('./learning-content.cjs');
Object.assign(about,skillModals);
steps.find(s=>s.n===3).body=compactBodies.config;
steps.find(s=>s.n===4).body=compactBodies.perfil;
steps.find(s=>s.n===3).check='Comprueba que refleja tus criterios y que el asistente puede consultarla.';
steps.find(s=>s.n===4).check='Comprueba que el perfil sea útil, diferencie hechos e hipótesis y no permita identificar a nadie.';
function write(file,s){if(file==='index.html')s=s.replace(legend(),'');const f=path.join(root,file);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s,'utf8');}
function nav(prefix,active){return [['index.html','Inicio','inicio'],['guias/empieza-aqui.html','Paso a paso','pasos'],['tareas.html','Prompts para copiar','prompts'],['descargas.html','Archivos para descargar','archivos'],['skills.html','Skills','skills']].map(([u,t,id])=>`<a href="${prefix}${u}"${active===id?' aria-current="page"':''}>${t}</a>`).join('');}
function modals(active){return Object.entries(about).filter(([id])=>!id.startsWith('skills-')||active==='skills').map(([id,a])=>`<dialog id="info-${id}" aria-labelledby="title-${id}"><div class="modal-head"><h2 id="title-${id}">${a.title}</h2><button type="button" data-close-dialog aria-label="Cerrar ventana">Cerrar <span aria-hidden="true">×</span></button></div>${a.html||a.text.split('\n\n').map(p=>`<p>${esc(p)}</p>`).join('')}</dialog>`).join('');}
function infoButtons(){return '<div class="intro-links"><button type="button" data-dialog="info-audience">¿Para quién es esta guía?</button><button type="button" data-dialog="info-use">¿Cómo utilizarla?</button></div>';}
function itineraryLink(){return '<a class="text-link itinerary-return" href="guias/empieza-aqui.html">Ir al recorrido paso a paso →</a>';}
function legend(){return `<section class="legend" aria-labelledby="resource-legend-title"><h2 id="resource-legend-title">Qué encontrarás en esta guía</h2><div><span class="legend-dot white" aria-hidden="true"></span><span><strong>Instrucciones</strong><small>Explicaciones para saber qué hacer y en qué orden.</small></span></div><div><span class="legend-dot blue" aria-hidden="true"></span><span><strong>Prompts para copiar</strong><small>Textos para completar y enviar a tu asistente.</small></span></div><div><span class="legend-dot green" aria-hidden="true"></span><span><strong>Archivos para descargar</strong><small>Guías, configuraciones y skills para guardar y utilizar.</small></span></div></section>`;}
function layout(title,body,{prefix='',active='',reader=false}={}){return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | Biblioteca de IA para Formadores</title><meta name="description" content="Un itinerario para formadores y formadoras, con instrucciones, prompts para copiar y archivos para descargar."><link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg"><link rel="stylesheet" href="${prefix}assets/site.css"><link rel="stylesheet" href="${prefix}assets/navigation.css"><link rel="stylesheet" href="${prefix}assets/color.css"><script src="${prefix}assets/navigation.js" defer></script></head><body><a class="skip" href="#contenido">Saltar al contenido</a><header class="site-header"><div class="header-inner"><a class="brand" href="${prefix}index.html"><span class="brand-icon" aria-hidden="true">lv<span>·</span></span><span>Biblioteca de IA<span class="brand-sub">PARA FORMADORES</span></span></a><nav aria-label="Navegación principal">${nav(prefix,active)}</nav></div></header><main id="contenido" class="${reader?'itinerary-layout':'container'}">${body}</main><footer class="site-footer"><div><strong>Lorena Vidarte</strong><span>Recursos para la formación</span></div><div><a href="${repo}">Consultar los archivos en GitHub</a><span>Vista previa de navegación · 21 de octubre de 2026</span></div></footer>${modals(active)}<div id="copy-status" class="copy-status" role="status" aria-live="polite"></div></body></html>\n`;}
function promptCard(id,prefix='',context='step'){
 const r=byId(id),uid=`${context}-prompt-${id}`;
 return `<article class="usable-card prompt-card" aria-labelledby="heading-${uid}"><div class="material-label"><span aria-hidden="true">▣</span> PROMPT PARA COPIAR</div><h3 id="heading-${uid}">${esc(r.title)}</h3><dl><div><dt>Qué es</dt><dd>Un texto para completar y enviar a tu asistente de IA.</dd></div><div><dt>Para qué sirve</dt><dd>${esc(r.why)}</dd></div></dl><p class="before-use">Completa los datos entre corchetes, si los hay, antes de enviarlo.</p><div class="material-actions"><button class="view-button" type="button" data-toggle="details-${uid}" aria-expanded="false" aria-controls="details-${uid}">Ver texto</button><a class="download-button" href="${prefix}${r.file}" download>↓ Descargar Markdown</a></div><div id="details-${uid}" class="prompt-content" hidden><button class="copy-button" type="button" data-copy="text-${uid}">Copiar texto</button><pre id="text-${uid}" tabindex="0">${esc(prompt[id])}</pre></div></article>`;
}
function fileCard(id,prefix='',{full=false,context='step'}={}){
 const r=byId(id),uid=`${context}-file-${id}`;
 const design=skillDesign[id];
 full=true;
 const what=design?.what||(r.type==='Configuración'?'Una propuesta de reglas de trabajo para tu asistente.':r.type==='Prompt y explicación de uso'?'Un archivo de apoyo que incluye la explicación y el prompt para esta tarea.':'Una guía de consulta para leer y aplicar con tus propios criterios.');
 const text=prompt[id]||fs.readFileSync(path.join(root,r.file),'utf8');
 const isInstruction=r.type==='Configuración'||r.type==='Skill';
 const label=design?'Ver Skill':prompt[id]?'Ver texto':isInstruction?'Ver instrucciones':'Leer guía';
 const reader=full?`<button class="view-button" type="button" data-toggle="details-${uid}" aria-expanded="false" aria-controls="details-${uid}" data-open-label="${design?'Ocultar Skill':isInstruction?'Ocultar instrucciones':'Ocultar guía'}">${label}</button>`:`<a class="support-link" href="${prefix}${route(r)}">${label} →</a>`;
 return `<article class="usable-card file-card${design?' skill-card':''}" aria-labelledby="heading-${uid}"><div class="material-label"><span aria-hidden="true">↓</span> ARCHIVO PARA DESCARGAR <span class="format-tag">${design?'SKILL · ':''}${r.zip?'MD + ZIP':'MD'}</span></div><h3 id="heading-${uid}">${esc(r.title)}</h3><dl><div><dt>Qué es</dt><dd>${esc(what)}</dd></div><div><dt>Para qué sirve</dt><dd>${esc(design?.purpose||r.why)}</dd></div>${design?`<div><dt>Cómo trabaja</dt><dd>${esc(design.how)}</dd></div>`:''}</dl>${design?`<aside class="pedagogy"><p class="pedagogy-title">CON CRITERIO PEDAGÓGICO</p><p>${esc(design.pedagogy)}</p></aside>`:''}${r.type==='Configuración'?'<p class="before-use">Léelo antes de usarlo. Puedes crear tus propias instrucciones o adaptar esta propuesta.</p>':''}${r.type==='Skill'?'<p class="before-use">Descargar el ZIP no instala ni activa la skill. Comprueba cómo se utiliza en tu herramienta.</p>':''}<div class="material-actions">${reader}${design?'':`<a class="download-button" href="${prefix}${r.file}" download>↓ Descargar Markdown</a>`}${r.zip?`<a class="download-button" href="${prefix}${r.zip}" download>${design?'Descargar Skill (Zip)':'↓ Descargar ZIP'}</a>`:''}</div>${full?`<div id="details-${uid}" class="file-content" hidden><button type="button" class="copy-button" data-copy="text-${uid}">Copiar texto</button><pre id="text-${uid}" tabindex="0">${esc(text)}</pre></div>`:''}</article>`;
}
function approvalNote(){return 'Si utilizas Instrucciones-formaciones.md, revisa primero el borrador y utiliza la orden APROBADO: genera el documento para autorizar el archivo. Si usas otras instrucciones, acuerda expresamente la revisión y autorización.';}
async function build(){
 const {marked}=process.env.MARKED_MODULE?await import(pathToFileURL(process.env.MARKED_MODULE).href):await import('marked');
 marked.setOptions({gfm:true,breaks:false});
 const render=md=>marked.parse(md).replace(/<table>/g,'<div class="table-scroll" role="region" aria-label="Tabla de consulta" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
 for(const id of ['carpetas','verificar','programacion','resumen']){
  const r=byId(id);write(r.file,`# ${r.title}\n\n## Para qué sirve\n\n${r.why}\n\n## Instrucción para copiar\n\n${prompt[id].split('\n').map(l=>'> '+l).join('\n')}\n\n## Qué revisar\n\n${steps.find(s=>s.prompts?.includes(id)).check}\n\n*Biblioteca IA para Formadores · Lorena Vidarte*\n`);
 }
 const side=`<aside class="itinerary-sidebar"><a class="back" href="../index.html">← Volver al inicio</a><details class="step-index" open><summary>Los 9 pasos del recorrido</summary><nav aria-label="Pasos del itinerario">${steps.map(s=>`<a href="#paso-${s.n}"><span class="index-number">${s.n}</span><span>${s.title}</span></a>`).join('')}</nav></details><a class="all-files" href="../descargas.html">↓ Todos los archivos</a></aside>`;
 const stepHtml=steps.map(s=>`<section id="paso-${s.n}" class="itinerary-step" aria-labelledby="step-title-${s.n}"><div class="step-heading"><span class="step-number">${s.n}</span><div><p class="eyebrow">PASO ${s.n} DE 9</p><h2 id="step-title-${s.n}">${s.title}</h2></div></div><div class="prose step-instructions">${render(s.body)}</div><div class="step-materials"><p class="materials-heading">MATERIAL${(s.prompts?.length||s.files?.length)>1?'ES':''} DE ESTE PASO</p>${(s.prompts||[]).map(id=>promptCard(id,'../')).join('')}${(s.files||[]).map(id=>fileCard(id,'../',{full:id==='config'})).join('')}</div><div class="checkpoint"><span aria-hidden="true">✓</span><p><strong>Antes de continuar</strong><br>${s.check}</p></div>${s.n<9?`<a class="next-step" href="#paso-${s.n+1}">Continuar al paso ${s.n+1}: ${steps[s.n].title} <span aria-hidden="true">→</span></a>`:'<div class="finish-note"><strong>Ya tienes tu entorno de trabajo preparado.</strong><p>Puedes volver a cualquier paso o consultar las skills cuando quieras explorar procedimientos reutilizables.</p><a href="../skills.html">Explorar las skills →</a></div>'}</section>`).join('');
 write('guias/empieza-aqui.html',layout('Empieza aquí',`${side}<div class="itinerary-main"><div class="itinerary-intro"><p class="eyebrow">TU RECORRIDO POR LA BIBLIOTECA</p><h1>Empieza aquí</h1>${infoButtons()}${legend()}<p class="route-intro">Sigue los nueve pasos. Las explicaciones aparecen sobre fondo blanco; las fichas identifican los textos y archivos que puedes utilizar.</p><a class="button primary" href="#paso-1">Empezar por el paso 1 →</a></div>${stepHtml}</div>`,{prefix:'../',active:'pasos',reader:true}));
 const art='<div class="hero-art" aria-hidden="true"><div class="art-dot"></div><div class="paper paper-back"><span></span><span></span><span></span></div><div class="paper paper-front"><div class="paper-tag">TU FORMACIÓN</div><div class="paper-title">Ideas claras.<br>Fuentes a mano.<br>Criterio propio.</div><div class="paper-rule"></div><div class="paper-check">✓ <span>Revisar antes de aprobar</span></div></div><div class="art-note">La IA acompaña.<br>Tú decides.</div></div>';
 write('index.html',layout('Inicio',`<section class="hero"><div class="hero-copy"><p class="eyebrow">LORENA VIDARTE · RECURSOS PARA LA FORMACIÓN</p><h1>Biblioteca de IA<br><span>para Formadores</span></h1><p class="lead">Guías y procedimientos para formadores y formadoras que imparten cursos para distintas entidades y grupos.</p><p>Organiza tu documentación y trabaja con asistentes de IA para preparar la programación, los materiales, las actividades y la evaluación.</p><div class="actions"><a class="button primary" href="guias/empieza-aqui.html">Sigue los pasos →</a><a class="button secondary" href="descargas.html">Ver archivos para descargar</a></div></div>${art}</section>${legend()}<section class="journey"><div class="section-heading"><p class="eyebrow">SABER QUÉ HACER Y QUÉ UTILIZAR</p><h2>Un recorrido, dos tipos de recurso</h2><p>Si es tu primera visita, empieza por el itinerario. Después podrás volver directamente al recurso que necesites.</p></div><div class="journey-grid"><a class="journey-card" href="guias/empieza-aqui.html"><span class="step" aria-hidden="true">→</span><h3>Sigue el itinerario</h3><p>Nueve pasos para preparar tu entorno, la programación y los materiales de cada edición.</p><span class="text-link">Empezar el recorrido →</span></a><a class="journey-card category-prompt" href="tareas.html"><span class="step" aria-hidden="true">▣</span><h3>Copia un prompt</h3><p>Textos para completar y enviar al asistente. Las fichas azules te dicen para qué sirve cada uno.</p><span class="text-link">Elegir un prompt →</span></a><a class="journey-card category-file" href="descargas.html"><span class="step" aria-hidden="true">↓</span><h3>Descarga un archivo</h3><p>Guías, configuración y skills. Las fichas verdes explican qué contiene cada descarga.</p><span class="text-link">Ver los archivos →</span></a></div></section><section class="principle"><span class="principle-mark" aria-hidden="true">✓</span><div><p class="eyebrow">EL CRITERIO SIGUE SIENDO TUYO</p><h2>Tú marcas los objetivos y revisas el resultado</h2><p>La IA puede ayudarte a preparar y revisar propuestas. Tu criterio como formador o formadora orienta las decisiones y la adaptación al grupo.</p></div></section>`,{active:'inicio'}));
 write('tareas.html',layout('Prompts para copiar',`<section class="page-intro"><p class="eyebrow">TEXTOS PARA UTILIZAR CON TU ASISTENTE</p><h1>Prompts para copiar</h1><p class="lead">Un prompt es un texto para pedir una tarea a la IA. Lee qué hace, completa los datos y cópialo en tu asistente.</p>${itineraryLink()}</section><div class="catalogue">${resources.filter(r=>prompt[r.id]).map(r=>`<div class="catalogue-item">${r.step?`<a class="step-context" href="guias/empieza-aqui.html#paso-${r.step}">Se utiliza en el paso ${r.step} →</a>`:'<span class="step-context">Recurso complementario</span>'}${promptCard(r.id,'','catalogue')}</div>`).join('')}</div>`,{active:'prompts'}));
 write('descargas.html',layout('Archivos para descargar',`<section class="page-intro"><p class="eyebrow">GUÍAS, CONFIGURACIÓN Y PROCEDIMIENTOS</p><h1>Archivos para descargar</h1><p class="lead">Las fichas verdes explican qué es cada archivo y para qué sirve. Puedes leerlo en la web o guardarlo en tu ordenador.</p>${itineraryLink()}</section><section class="download-banner"><div><h2>La biblioteca completa</h2><p>Un ZIP con el itinerario, los prompts, las guías, la configuración y las dos skills.</p></div><a class="download-button" href="Biblioteca-IA-para-Formadores.zip" download>↓ Descargar la biblioteca completa</a></section><div class="note"><strong>Markdown (.md)</strong> es un archivo de texto. <strong>ZIP (.zip)</strong> es un paquete comprimido: extráelo para acceder a sus archivos.</div><div class="file-catalogue">${resources.map(r=>`<div>${r.step?`<a class="step-context" href="guias/empieza-aqui.html#paso-${r.step}">Relacionado con el paso ${r.step} →</a>`:''}${fileCard(r.id,'',{context:'catalogue'})}</div>`).join('')}</div>`,{active:'archivos'}));
 write('skills.html',layout('Skills',skillsLanding(['diseno','revision'].map(id=>fileCard(id,'',{full:true,context:'skills'})).join('')),{active:'skills'}));
 write('entorno.html',layout('Prepara tu entorno',`<section class="page-intro"><p class="eyebrow">LOS PRIMEROS PASOS</p><h1>Prepara tu entorno</h1><p class="lead">La organización, los nombres, las instrucciones y el perfil forman parte del itinerario.</p><a class="button primary" href="guias/empieza-aqui.html#paso-1">Seguir los pasos 1 a 4 →</a></section><div class="file-catalogue">${['nombres','config','perfil','carpetas'].map(id=>fileCard(id,'',{context:'entorno'})).join('')}</div>`,{active:'pasos'}));
 const routes={};for(const r of resources)routes[r.file]=route(r);
 routes['Empieza-aqui.md']='guias/empieza-aqui.html';
 const folders={'01_Prepara-tu-entorno':'entorno.html','02_Instrucciones-para-tareas':'tareas.html','03_Skills':'skills.html','03_Skills/Diseno-guiado-evaluaciones':'guias/diseno-evaluaciones.html','03_Skills/Revision-guiada-escritos':'guias/revision-escritos.html'};
 for(const r of resources){
  let md=fs.readFileSync(path.join(root,r.file),'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
  if(prompt[r.id])md=md.replace(/## Instrucci[oó]n para copiar\s*\r?\n[\s\S]*?(?=\r?\n## |$)/,'');
  if(compactBodies[r.id])md='# '+steps.find(s=>s.n===r.step).title+'\n\n'+compactBodies[r.id];
  if(skillDesign[r.id])md='# '+r.title+'\n\n'+skillDesign[r.id].short;
  let html=render(md).replace(/href="([^"#]+)(#[^"]*)?"/g,(all,href,hash='')=>{if(/^[a-z]+:/.test(href))return all;const f=path.posix.normalize(path.posix.join(path.posix.dirname(r.file),href)).replace(/\/$/,'');return `href="../${esc(routes[f]||folders[f]||f)}${hash}"`;});
  const context=r.step?`<a class="back" href="empieza-aqui.html#paso-${r.step}">← Volver al paso ${r.step}: ${steps[r.step-1].title}</a>`:'<a class="back" href="../index.html">← Volver al inicio</a>';
  const cards=prompt[r.id]?promptCard(r.id,'../','resource'):fileCard(r.id,'../',{full:!!compactBodies[r.id]||r.group==='skills',context:'resource'});
  const checkpoint=compactBodies[r.id]?`<div class="checkpoint"><span aria-hidden="true">✓</span><p><strong>Antes de continuar</strong><br>${steps.find(s=>s.n===r.step).check}</p></div>`:'';
  write(route(r),layout(r.title,`<div class="resource-reading">${context}<p class="eyebrow">EXPLICACIÓN DE USO</p><article class="prose">${html}</article><div class="resource-materials">${cards}</div>${checkpoint}${context}</div>`,{prefix:'../',active:r.group==='skills'?'skills':prompt[r.id]?'prompts':'archivos'}));
 }
 const introMd=`# Empieza aquí\n\n## ¿Para quién es esta guía?\n\n${about.audience.text}\n\n## ¿Cómo utilizarla?\n\n${about.use.text}\n\n## Cómo reconocer los materiales\n\nLas instrucciones explican qué hacer. Los prompts son textos para copiar y enviar al asistente. Los archivos descargables son guías, configuración o skills.\n\n`;
 const master=introMd+steps.map(s=>`## Paso ${s.n}. ${s.title}\n\n${s.body}\n\n${(s.prompts||[]).map(id=>`### Prompt: ${byId(id).title}\n\n${prompt[id]}\n\nArchivo de apoyo: [${byId(id).file}](${byId(id).file}).\n\n`).join('')}${(s.files||[]).map(id=>`Material para leer y descargar: [${byId(id).title}](${byId(id).file}).\n\n`).join('')}**Antes de continuar:** ${s.check}\n`).join('\n')+'\n*Biblioteca IA para Formadores · Lorena Vidarte*\n';
 write('Empieza-aqui.md',master);
 const JSZip=require(process.env.JSZIP_MODULE||'jszip');
 const zip=new JSZip();
 const archiveFiles=['Empieza-aqui.md','README.md',...resources.map(r=>r.file),...resources.filter(r=>r.zip).map(r=>r.zip)];
 for(const file of archiveFiles)zip.file('Biblioteca/'+file,fs.readFileSync(path.join(root,file)));
 fs.writeFileSync(path.join(root,'Biblioteca-IA-para-Formadores.zip'),await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'}));
 write('404.html',layout('Página no encontrada','<section class="page-intro"><h1>Volvamos al recorrido</h1><p>Esta dirección no corresponde a una página disponible.</p><a href="/biblioteca-ia-formadores/guias/empieza-aqui.html">Ir al itinerario →</a></section>',{prefix:'/biblioteca-ia-formadores/'}));
 console.log(JSON.stringify({steps:steps.length,prompts:Object.keys(prompt).length,resources:resources.length}));
}
build().catch(e=>{console.error(e);process.exitCode=1;});
