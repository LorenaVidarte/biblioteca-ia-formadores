# Empieza aquí

## ¿Para quién es esta guía?

Para formadores y formadoras de personas adultas (formación ocupacional, continua, en empresas, idiomas y talleres, entre otros).

Especialmente útil si impartes varios cursos, colaboras con distintas entidades o repites una formación con diferentes grupos. La organización propuesta es adaptable.

## ¿Cómo utilizarla?

Sigue los pasos en orden. Las instrucciones explican qué hacer y las fichas identifican los recursos para copiar, completar o descargar.

Puedes empezar en una conversación con tu asistente de IA. No necesitas crear un proyecto ni instalar una skill.

Facilita los documentos necesarios e indica que aplique Instrucciones-formaciones.md. Comprueba que pueda leerlos.

## Cómo reconocer los materiales

Las instrucciones explican qué hacer. Los prompts son textos para copiar y enviar al asistente. Los archivos descargables son guías, configuración o skills.

## Paso 1. Reúne y organiza la documentación

Reúne la documentación disponible de tus formaciones en una carpeta: programas, requisitos de los centros, plantillas, calendarios y materiales.

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

Conviene guardar cada documento común en su lugar y utilizar enlaces o accesos directos cuando sea necesario. Así podrás reutilizar materiales y localizar los requisitos correctos, reduciendo duplicados y evitando trasladar por error fechas o datos de otro grupo.

### Prompt: Organiza las carpetas de tus formaciones

Ayúdame a organizar la documentación de mis formaciones. Te facilito una carpeta con los archivos o, si no puedes acceder, una lista de los documentos.

Propón una estructura que relacione lo común a mi trabajo, los requisitos de cada centro, los programas y materiales de cada curso y la información de cada edición (grupo, fechas, recursos y programación).

Utiliza como referencia esta estructura. Los nombres entre corchetes indican datos que debes preguntarme; no crees carpetas con nombres de ejemplo:

FORMACIONES
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
        └── 05_Borradores

Comprueba qué información puedes consultar. Pregunta los nombres y códigos que necesites y señala lo que no puedas identificar. No inventes datos ni dupliques carpetas existentes.

Presenta primero la organización propuesta en el chat. No muevas, renombres ni elimines archivos sin mi autorización.

Si tienes acceso y permisos, después de que confirme la propuesta podrás crear las carpetas y realizar únicamente los movimientos que autorice. Si no puedes hacerlo directamente, indícame qué carpetas debo crear y dónde colocar cada documento.

Archivo de apoyo: [01_Prepara-tu-entorno/Crear-estructura-carpetas.md](01_Prepara-tu-entorno/Crear-estructura-carpetas.md).

**Antes de continuar:** Comprueba que puedes identificar a qué centro, curso o edición pertenece cada documento. Si no está claro, déjalo pendiente de revisar.

## Paso 2. Establece cómo nombrar archivos y carpetas

Utiliza nombres coherentes para que tú y el asistente podáis identificar a qué centro, curso y edición pertenece cada documento.

- Separa los bloques de información con `_` y las palabras de un mismo bloque con `-`.
- Escribe las fechas como `AAAA-MM-DD` y utiliza versiones como `v01`, `v02`.
- Añade el estado cuando sea útil: `borrador`, `revisado` o `aprobado`.
- Conserva sin cambios los documentos oficiales recibidos del centro.
- Evita nombres, documentos de identidad u otros datos personales del alumnado.

Ejemplo (el código y el centro son ilustrativos):

`CUR001_Competencias-digitales_CENTRO_2026-E01_Programacion_v02_aprobado.docx`

No todos los archivos necesitan incluir todos estos datos. El nombre debe aportar la información necesaria para distinguirlo sin hacerse demasiado largo.

Guarda esta guía en `FORMACIONES/00_Configuracion-general`, porque sus criterios se aplican a todas tus formaciones.

Material para leer y descargar: [Guía para nombrar archivos y carpetas](01_Prepara-tu-entorno/Guia-nombrar-archivos-carpetas.md).

**Antes de continuar:** Comprueba que los nombres permiten reconocer el documento y su contexto.

## Paso 3. Define cómo quieres que trabaje tu asistente

Establece unas reglas para que consulte las fuentes, pregunte cuando falte información, respete tus criterios y espere tu revisión antes de generar archivos.

Puedes crear tus propias instrucciones. Te recomendamos leer nuestra propuesta para decidir qué mantener, adaptar o añadir.

**Cómo utilizarla**

1. Lee las instrucciones y adáptalas a tu forma de trabajar.
2. Facilita el archivo al asistente o incorpora su contenido en el apartado de instrucciones de tu herramienta.
3. Pídele que confirme que puede leerlo y aplicarlo.

**Dónde guardarla**

`FORMACIONES/00_Configuracion-general/Instrucciones-formaciones.md`

Va en esta carpeta porque contiene reglas comunes para todas tus formaciones.

Material para leer y descargar: [Instrucciones para el asistente](01_Prepara-tu-entorno/Instrucciones-formaciones.md).

**Antes de continuar:** Comprueba que refleja tus criterios y que el asistente puede consultarla.

## Paso 4. Describe el perfil del alumnado

Conocer al grupo ayuda a ajustar las actividades, el lenguaje, los tiempos y los apoyos. Te recomendamos leer la guía para decidir qué información conviene recoger.

Si todavía no conoces al alumnado, el perfil será provisional. Distingue los datos confirmados de las hipótesis y ajústalo después de la evaluación inicial.

**Cómo utilizar la guía**

1. Lee los criterios propuestos.
2. Redacta tú el perfil con la información relevante que tengas.
3. Describe al grupo de forma anónima, sin detalles que permitan identificar a participantes.
4. Facilita el perfil al asistente cuando necesite adaptar la formación.

**Dónde guardar el perfil que redactes**

`FORMACIONES/03_Ediciones/[EDICION]/00_Contexto/Perfil-del-alumnado.md`

Va en esta carpeta porque describe a un grupo concreto y puede cambiar en cada edición.

Material para leer y descargar: [Guía del perfil del alumnado](01_Prepara-tu-entorno/Guia-perfil-del-alumnado.md).

**Antes de continuar:** Comprueba que el perfil sea útil, diferencie hechos e hipótesis y no permita identificar a nadie.

## Paso 5. Comprueba la información antes de programar

Con la documentación organizada, las instrucciones definidas y el perfil del grupo preparado, pide al asistente que revise las fuentes.

**El objetivo de este paso es comprobar la información de partida.** La programación se elaborará después, cuando hayas revisado los datos y resuelto las dudas necesarias.

Pídele que identifique qué archivos puede leer, los requisitos del curso y del centro, las condiciones de esta edición, los datos pendientes o contradictorios y qué aspectos del perfil son provisionales.

El asistente podría utilizar un calendario antiguo, confundir una plantilla de ejemplo con un requisito o tratar una previsión sobre el grupo como un hecho. Comprobar las fuentes ahora evita trasladar esos errores a la programación.

### Prompt: Revisa la información de la formación

Lee y aplica las instrucciones de trabajo que te he facilitado. Confirma cuáles puedes consultar.

Revisa la documentación de esta formación y el perfil del alumnado. Indica qué archivos puedes leer y resume la información necesaria para preparar la programación, señalando la fuente de cada dato.

Distingue los requisitos de los documentos, las decisiones que yo haya confirmado y las hipótesis pendientes de comprobar. Identifica la información que falta y las contradicciones. No inventes datos.

No prepares todavía la programación. Presenta la revisión en el chat y espera a que compruebe y confirme la información.

Archivo de apoyo: [02_Instrucciones-para-tareas/Revisar-informacion.md](02_Instrucciones-para-tareas/Revisar-informacion.md).

**Antes de continuar:** Contrasta la respuesta con los originales, corrige las interpretaciones y resuelve los datos necesarios para programar.

## Paso 6. Prepara la programación del curso

Con la información verificada, pide una programación que relacione las sesiones con los objetivos, las competencias, los contenidos, las actividades y la evaluación.

**Si utilizas `Instrucciones-formaciones.md`:** después de revisar el borrador, escribe **APROBADO: genera el documento**. Si el asistente tiene acceso a la plantilla, creará el archivo en `05_Borradores`, manteniendo la estructura, los logotipos, el encabezado y el pie de página.

Revísalo antes de moverlo a `02_Programacion-aprobada`. Va en esa carpeta porque será la referencia para desarrollar las sesiones de esa edición.

Si utilizas otra configuración, establece expresamente cómo revisarás los borradores, autorizarás los archivos y utilizarás la plantilla.

### Prompt: Crea la programación del curso

Prepara la programación del curso [nombre del curso], edición [centro, grupo o fechas], de acuerdo con el programa oficial, las especificaciones del centro, el calendario y el perfil del alumnado.

Relaciona las sesiones con los objetivos, las competencias y los contenidos que deben alcanzarse. Incorpora las actividades ya definidas y, cuando sea necesario, propón otras adecuadas al grupo, al tiempo y a los recursos disponibles.

Utiliza la plantilla oficial y el documento de referencia que te he facilitado para mantener la estructura requerida. No copies del modelo fechas, nombres ni datos de otra edición.

Presenta primero el borrador en el chat, distingue los requisitos de tus propuestas y señala la información que falte. No generes el archivo hasta que lo apruebe.

Archivo de apoyo: [02_Instrucciones-para-tareas/Crear-programacion.md](02_Instrucciones-para-tareas/Crear-programacion.md).

**Antes de continuar:** Comprueba que cubre los objetivos y contenidos, respeta la duración, es viable para el grupo y utiliza la plantilla correcta.

## Paso 7. Resume la información de la edición

Cuando la programación esté aprobada, prepara un resumen que permita localizar rápidamente la información de esa edición.

Incluye el curso, centro y edición; fechas, horario, duración y modalidad; recursos disponibles; enlace al perfil del alumnado; enlaces a los documentos oficiales, calendario y programación aprobada; decisiones confirmadas y cuestiones pendientes.

El resumen orienta al asistente y al formador, pero no sustituye los documentos originales ni debe duplicar el perfil del alumnado.

Guárdalo en `00_Contexto` de la edición, porque sirve como punto de entrada para comprender la formación y localizar sus documentos.

### Prompt: Prepara el resumen de la edición

Prepara un resumen de la edición [curso, centro y fechas] utilizando la información verificada y la programación aprobada.

Incluye los datos principales, los recursos disponibles, las decisiones confirmadas y los enlaces a los documentos correspondientes. Señala lo que siga pendiente.

No inventes información ni reproduzcas los datos del perfil del alumnado. Presenta primero el borrador en el chat.

Archivo de apoyo: [02_Instrucciones-para-tareas/Resumen-edicion.md](02_Instrucciones-para-tareas/Resumen-edicion.md).

**Antes de continuar:** Revisa los datos y los enlaces del resumen antes de autorizar su archivo, según las instrucciones que utilices.

## Paso 8. Desarrolla las actividades y los materiales

Utiliza la programación aprobada para preparar cada sesión. Indica la sesión y el objetivo, el tiempo disponible, la metodología, los recursos, las características relevantes del grupo y los criterios que debe respetar.

Puedes crear una actividad nueva o adaptar un material existente. Si falta información, el asistente debe preguntarla o distinguir sus propuestas de los datos confirmados.

Si utilizas `Instrucciones-formaciones.md`, el asistente presentará primero el borrador. Después de aprobarlo con **APROBADO: genera el documento**, guardará el archivo en `05_Borradores`.

Cuando lo hayas comprobado, muévelo a `03_Materiales-del-grupo`, porque reúne los materiales adaptados a esa edición.

### Prompt: Prepara una actividad

Quiero preparar una actividad para [curso, edición y sesión].

El objetivo es [objetivo]. Disponemos de [tiempo] y utilizaremos [metodología]. Los recursos disponibles son [recursos]. Debes respetar estas condiciones: [condiciones o criterios].

Consulta la programación aprobada, el perfil del alumnado y las fuentes pertinentes. Antes de diseñar, comprueba si tienes la información necesaria. Pregunta por los datos que falten y espera mi respuesta.

Cuando la información esté confirmada, presenta una propuesta con:

- Objetivo de aprendizaje.
- Duración total y distribución del tiempo.
- Recursos y preparación necesaria.
- Instrucciones para el alumnado.
- Desarrollo de la actividad.
- Resultado esperado.
- Criterios observables para comprobar el aprendizaje.
- Apoyos o adaptaciones que recomiendes para el grupo.

Distingue los requisitos de las fuentes de tus propuestas. No inventes información.

Presenta el borrador completo en el chat y espera mi revisión. No generes archivos.

Archivo de apoyo: [02_Instrucciones-para-tareas/Preparar-una-actividad.md](02_Instrucciones-para-tareas/Preparar-una-actividad.md).

### Prompt: Adapta un material

Quiero adaptar [material] para [curso, edición y sesión].

El objetivo es [objetivo]. Necesito modificar [aspectos] porque [motivo]. Disponemos de [tiempo], trabajaremos mediante [metodología] y contamos con [recursos].

Debes conservar [contenidos, requisitos o elementos].

Consulta el material original, la programación aprobada, el perfil del alumnado y las fuentes pertinentes. Comprueba qué puedes leer. Si falta información necesaria, pregúntamela y espera mi respuesta.

Primero presenta un análisis breve: qué partes conviene conservar, cuáles necesitan cambios y por qué. No prepares todavía la versión adaptada. Espera a que confirme los criterios de adaptación.

Cuando los confirme, presenta el contenido adaptado en el chat y una relación breve de los cambios realizados.

Puedes proponer ajustes de vocabulario, ejemplos, extensión, instrucciones, apoyos y dificultad. Conserva los objetivos y requisitos obligatorios. Si alguna adaptación entra en conflicto con ellos, señala el problema antes de continuar.

No inventes información ni atribuyas al original contenido que no aparece en él. Distingue los cambios que he solicitado de tus recomendaciones.

Espera mi revisión. No generes archivos ni modifiques el original.

Archivo de apoyo: [02_Instrucciones-para-tareas/Adaptar-un-material.md](02_Instrucciones-para-tareas/Adaptar-un-material.md).

**Antes de continuar:** Comprueba la relación con el objetivo, la adecuación al grupo, el tiempo, los recursos y la claridad de las instrucciones.

## Paso 9. Prepara y revisa la evaluación

A partir de la programación aprobada, concreta cómo comprobarás el aprendizaje y qué criterios utilizarás para valorar los resultados.

Indica al asistente los objetivos y competencias que quieres evaluar, el momento de la evaluación, el tipo de actividad o prueba y el tiempo disponible.

Revisa que las tareas permitan demostrar lo aprendido y que los criterios sean claros y adecuados al grupo.

Si utilizas la configuración recomendada, revisarás primero el borrador y autorizarás el archivo con **APROBADO: genera el documento**.

El archivo se guardará en `05_Borradores`. Cuando compruebes que está correcto, muévelo a `04_Evaluacion`, porque reúne los instrumentos y criterios de evaluación de esa edición.

### Prompt: Elabora una rúbrica

Quiero elaborar una rúbrica para [actividad], correspondiente a [curso, edición y sesión].

Quiero evaluar [objetivos o aprendizajes]. La finalidad es [finalidad] y las condiciones de realización son [condiciones].

Consulta la actividad, las fuentes pertinentes, la programación aprobada y el perfil del alumnado. Si falta información necesaria, pregúntamela y espera mi respuesta.

Primero presenta los criterios que propones evaluar y su relación con los aprendizajes. Indica cuáles proceden de las fuentes y cuáles son propuestas tuyas.

Recomienda un número de niveles que permita distinguir diferencias claras. No utilices cinco niveles por defecto. Si una rúbrica no es adecuada, explica qué instrumento recomiendas y por qué.

No prepares todavía la tabla completa. Espera a que confirme los criterios y los niveles.

Cuando los confirme, redacta la rúbrica. Para cada criterio y nivel, describe qué podrá observarse en el trabajo del alumnado. Evita expresiones vagas como «bien», «regular» o «excelente» sin explicar qué significan.

No añadas criterios de ortografía, presentación, velocidad o autonomía si no son pertinentes para los aprendizajes y las condiciones acordadas. Evita valorar dos veces el mismo aspecto.

Si corresponde puntuar, respeta las escalas, los pesos y los requisitos confirmados. Si faltan, pregúntamelos o presenta una propuesta justificada para que la valide. No inventes umbrales de aprobado ni penalizaciones.

Presenta la rúbrica completa en el chat, con las decisiones pendientes. No corrijas respuestas reales, no asignes calificaciones al alumnado y no generes archivos.

Archivo de apoyo: [02_Instrucciones-para-tareas/Elaborar-una-rubrica.md](02_Instrucciones-para-tareas/Elaborar-una-rubrica.md).

### Prompt: Revisa una actividad y su evaluación

Quiero revisar la relación entre los objetivos, la actividad y la evaluación de [curso, edición y sesión].

Consulta los documentos que te facilito y las fuentes pertinentes. Comprueba qué puedes leer. Si falta información necesaria, pregúntamela y espera mi respuesta.

No diseñes otra actividad ni modifiques la evaluación durante esta revisión.

Presenta una tabla con:

- Objetivo o aprendizaje que se quiere comprobar y su fuente.
- Parte de la actividad que permite trabajarlo.
- Evidencia esperada (qué hará, dirá o entregará el alumnado para mostrar su aprendizaje).
- Criterio del instrumento que permite valorar esa evidencia.
- Relación cubierta, parcial o ausente, con una justificación basada en los documentos.

Si falta información para valorar una relación, indícala como «No se puede comprobar». No la confundas con una ausencia demostrada.

Señala también criterios que evalúen aspectos ajenos a los objetivos, instrucciones ambiguas, posibles dobles penalizaciones y dificultades de tiempo, recursos o accesibilidad.

No inventes objetivos, requisitos ni criterios. Distingue lo que dicen las fuentes de tus recomendaciones.

Termina con una lista breve de ajustes propuestos, ordenados por importancia. Presenta la revisión en el chat y espera mi valoración antes de desarrollar cambios. No generes archivos.

Archivo de apoyo: [02_Instrucciones-para-tareas/Revisar-actividad-y-evaluacion.md](02_Instrucciones-para-tareas/Revisar-actividad-y-evaluacion.md).

**Antes de continuar:** Verifica que se evalúa lo previsto, que los criterios son observables y que las condiciones y la puntuación son comprensibles.

*Biblioteca IA para Formadores · Lorena Vidarte*
