const compactBodies={
config:`Establece unas reglas para que consulte las fuentes, pregunte cuando falte información, respete tus criterios y espere tu revisión antes de generar archivos.

Puedes crear tus propias instrucciones. Te recomendamos leer nuestra propuesta para decidir qué mantener, adaptar o añadir.

**Cómo utilizarla**

1. Lee las instrucciones y adáptalas a tu forma de trabajar.
2. Facilita el archivo al asistente o incorpora su contenido en el apartado de instrucciones de tu herramienta.
3. Pídele que confirme que puede leerlo y aplicarlo.

**Dónde guardarla**

\`FORMACIONES/00_Configuracion-general/Instrucciones-formaciones.md\`

Va en esta carpeta porque contiene reglas comunes para todas tus formaciones.`,
perfil:`Conocer al grupo ayuda a ajustar las actividades, el lenguaje, los tiempos y los apoyos. Te recomendamos leer la guía para decidir qué información conviene recoger.

Si todavía no conoces al alumnado, el perfil será provisional. Distingue los datos confirmados de las hipótesis y ajústalo después de la evaluación inicial.

**Cómo utilizar la guía**

1. Lee los criterios propuestos.
2. Redacta tú el perfil con la información relevante que tengas.
3. Describe al grupo de forma anónima, sin detalles que permitan identificar a participantes.
4. Facilita el perfil al asistente cuando necesite adaptar la formación.

**Dónde guardar el perfil que redactes**

\`FORMACIONES/03_Ediciones/[EDICION]/00_Contexto/Perfil-del-alumnado.md\`

Va en esta carpeta porque describe a un grupo concreto y puede cambiar en cada edición.`
};
const skillDesign={
diseno:{
 what:'Un procedimiento para diseñar pruebas, rúbricas y guías de corrección.',
 purpose:'Relacionar los aprendizajes previstos con las tareas, las evidencias y los criterios de valoración.',
 how:'Comprueba las fuentes, acuerda contigo el diseño y después prepara el borrador.',
 pedagogy:'Primero necesitamos decidir qué aprendizaje queremos comprobar. Por eso no impone una rúbrica ni cinco niveles por defecto, y pide tu validación antes de desarrollar el instrumento.',
 short:'Utiliza esta skill cuando quieras diseñar una evaluación a partir de las fuentes de tu formación. Facilita el programa, las condiciones y los aprendizajes que quieres comprobar. Revisa sus propuestas antes de desarrollar el instrumento.'
},
revision:{
 what:'Un procedimiento para revisar producciones digitales o manuscritas a partir de una consigna y unos criterios.',
 purpose:'Señalar evidencias, puntos fuertes y prioridades de mejora.',
 how:'Comprueba la lectura, presenta una valoración justificada y espera tu confirmación antes de redactar el comentario para el alumnado.',
 pedagogy:'Una duda de lectura no debe convertirse en un error del alumnado. La revisión distingue errores, alternativas válidas y preferencias de estilo; el comentario final se centra en acciones concretas para mejorar.',
 short:'Utiliza esta skill para revisar un escrito con una consigna y unos criterios explícitos. Facilita únicamente la información necesaria mediante una herramienta autorizada. Valida la revisión antes de pedir el comentario para el alumnado.'
}
};
const installPrompt='Quiero utilizar esta skill en [nombre de la aplicación]. Indícame cómo instalarla y activarla. Comprueba si mi herramienta admite este formato y, si no es compatible, explícame cómo utilizar sus instrucciones como texto.';
const skillModals={
 'skills-why':{title:'¿Por qué se han vuelto importantes?',html:`<p>Permiten conservar y compartir formas de trabajo sin tener que explicarlas desde cero en cada conversación.</p><p>Su utilidad aumenta cuando una tarea tiene varios pasos, criterios que deben respetarse y momentos de revisión. Distintas herramientas están adoptando un formato común, lo que facilita trasladarlas entre aplicaciones compatibles.</p><p>Para un formador, esto permite convertir una práctica revisada (por ejemplo, diseñar una evaluación) en un procedimiento reutilizable.</p><a class="source-link" href="https://agentskills.io/home">Consultar el estándar Agent Skills →</a>`},
 'skills-how':{title:'¿Cómo funcionan?',html:`<p>En las herramientas compatibles, el proceso habitual es:</p><ol><li>El asistente conoce el nombre y la descripción de las skills disponibles.</li><li>Cuando una tarea encaja, o se lo pides expresamente, consulta las instrucciones completas.</li><li>Sigue el procedimiento y utiliza los recursos necesarios.</li><li>Tú compruebas el resultado.</li></ol><p>Esta carga por etapas evita incorporar todo el contenido de todas las skills desde el principio. Aun así, utilizarlas consume recursos y <strong>no garantiza por sí solo un ahorro de tokens</strong> (las unidades con las que el modelo procesa el texto).</p><p>Una skill orienta al asistente. Su funcionamiento también depende de sus capacidades, del acceso a los documentos y de las herramientas disponibles.</p><a class="source-link" href="https://learn.chatgpt.com/docs/build-skills">Consultar la explicación de OpenAI →</a>`},
 'skills-where':{title:'¿Dónde puedo utilizarlas?',html:`<p>La compatibilidad depende de la <strong>aplicación que utiliza el modelo</strong>, no solo del nombre del LLM.</p><div class="platform-list"><section><h3>Claude</h3><p>Permite cargar skills en ZIP desde su apartado de personalización y activarlas. Puede utilizarlas cuando una tarea coincide con su descripción. Requiere las capacidades correspondientes habilitadas.</p><a href="https://support.claude.com/en/articles/12512180-use-skills-in-claude">Guía oficial de Claude →</a></section><section><h3>ChatGPT y Codex</h3><p>Admiten skills en los entornos compatibles. Pueden seleccionarse expresamente o activarse por la tarea. Su distribución e instalación varían entre skills independientes y skills incluidas en plugins.</p><a href="https://learn.chatgpt.com/docs/build-skills">Guía oficial de OpenAI →</a></section><section><h3>Gemini</h3><p>Su documentación contempla crear skills o cargar un SKILL.md, una carpeta o un ZIP desde su apartado de personalización. Comprueba su disponibilidad en tu cuenta.</p><a href="https://support.google.com/gemini/answer/17094296?hl=es">Guía oficial de Gemini →</a></section><section><h3>GitHub Copilot</h3><p>Utiliza skills personales o asociadas a un proyecto en sus aplicaciones y entornos compatibles. Las consulta cuando resultan pertinentes para la tarea.</p><a href="https://docs.github.com/en/copilot/concepts/customizations/agent-skills">Guía oficial de GitHub Copilot →</a></section></div><p class="source-date">Información consultada el 21 de octubre de 2026. Las opciones pueden variar según la aplicación, la versión y tu cuenta.</p><p><strong>Descargar una skill no la instala.</strong> Si tu aplicación no admite este formato, puedes facilitarle las instrucciones como texto, aunque eso no equivale a disponer de su activación y gestión nativas.</p>`},
 'skills-install':{title:'¿Cómo la instalo en mi herramienta?',html:`<p>Puedes preguntarle a tu propio asistente cómo instalarla y seguir sus indicaciones. Por ejemplo:</p><article class="usable-card prompt-card install-prompt"><div class="material-label"><span aria-hidden="true">▣</span> PROMPT PARA COPIAR</div><h3>Pregunta cómo utilizar esta skill</h3><p id="text-install-skill">${installPrompt}</p><button class="copy-button" type="button" data-copy="text-install-skill">▣ Copiar texto</button></article><p>Los pasos pueden variar según la aplicación, la versión y tu cuenta.</p>`}
};
function skillsLanding(cards){return `<section class="page-intro skills-intro"><p class="eyebrow">DEL PROMPT AL PROCEDIMIENTO REUTILIZABLE</p><h1>Skills</h1><p class="lead">Guarda y reutiliza una forma de trabajar.</p><a class="text-link itinerary-return" href="guias/empieza-aqui.html">Ir al recorrido paso a paso →</a><p>Una <strong>skill</strong> reúne instrucciones para realizar una tarea siguiendo un procedimiento: qué información consultar, qué pasos seguir, qué comprobar y cuándo pedir tu intervención.</p><p>Se organiza alrededor de un archivo llamado <code>SKILL.md</code>, que contiene su nombre, descripción e instrucciones. Puede incluir también ejemplos, plantillas y otros recursos.</p><p>Un prompt pide una tarea; una skill permite reutilizar un procedimiento que has definido y probado.</p><div class="skill-info-links"><button type="button" data-dialog="info-skills-why"><span aria-hidden="true">01</span> Por qué son importantes</button><button type="button" data-dialog="info-skills-how"><span aria-hidden="true">02</span> Cómo funcionan</button><button type="button" data-dialog="info-skills-where"><span aria-hidden="true">03</span> Dónde utilizarlas</button><button type="button" data-dialog="info-skills-install"><span aria-hidden="true">04</span> Cómo instalarlas</button></div></section><section class="skills-examples"><div class="section-heading"><p class="eyebrow">DECISIONES DOCENTES DENTRO DEL PROCEDIMIENTO</p><h2>Dos ejemplos con criterio pedagógico</h2><p>Estas skills muestran cómo incorporar nuestras decisiones como formadores a un procedimiento reutilizable.</p></div><div class="skill-examples-grid">${cards}</div></section><section class="skills-improve"><p class="eyebrow">PROBAR · REFLEXIONAR · MEJORAR</p><h2>Las skills también se revisan</h2><p>Prueba el procedimiento, observa dónde falla y detente a reflexionar. Puedes preguntar al asistente qué cambiaría para hacerlo más claro y eficaz.</p><p>Aplica la mejora solo si mantiene tus objetivos y produce resultados adecuados. Conserva la versión anterior y vuelve a probarla.</p><p><strong>La eficacia también consiste en evitar trabajo innecesario sin perder calidad ni criterio pedagógico.</strong></p></section>`;}
module.exports={compactBodies,skillDesign,skillModals,skillsLanding};
