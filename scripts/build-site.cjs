/* Los Markdown de la biblioteca son las fuentes. npm install && npm run build. */
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const root = path.resolve(__dirname, '..');
const repo = 'https://github.com/LorenaVidarte/biblioteca-ia-formadores';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const resources = [
 ['Empieza-aqui.md','empieza-aqui','Empieza aquí','Un recorrido paso a paso para organizar tu trabajo con la IA.','inicio'],
 ['01_Prepara-tu-entorno/Instrucciones-formaciones.md','instrucciones-formaciones','Instrucciones para el asistente','Establece cómo trabajar, consultar las fuentes y esperar tu aprobación.','entorno'],
 ['01_Prepara-tu-entorno/Guia-nombrar-archivos-carpetas.md','nombrar-archivos','Nombra tus archivos y carpetas','Usa criterios sencillos para localizar los documentos y distinguir versiones.','entorno'],
 ['01_Prepara-tu-entorno/Guia-perfil-del-alumnado.md','perfil-del-alumnado','Prepara el perfil del alumnado','Describe la información relevante del grupo protegiendo su privacidad.','entorno'],
 ['01_Prepara-tu-entorno/Crear-estructura-carpetas.md','crear-carpetas','Crea tu estructura de carpetas','Una petición para organizar FORMACIONES con ayuda del asistente.','entorno'],
 ['02_Instrucciones-para-tareas/Preparar-una-actividad.md','preparar-actividad','Prepara una actividad','Parte de los objetivos, el tiempo, los recursos y las características del grupo.','tareas'],
 ['02_Instrucciones-para-tareas/Adaptar-un-material.md','adaptar-material','Adapta un material','Revisa qué cambios necesita un recurso antes de pedir su adaptación.','tareas'],
 ['02_Instrucciones-para-tareas/Revisar-actividad-y-evaluacion.md','revisar-actividad','Revisa una actividad y su evaluación','Comprueba su relación con los objetivos y los criterios de evaluación.','tareas'],
 ['02_Instrucciones-para-tareas/Elaborar-una-rubrica.md','elaborar-rubrica','Elabora una rúbrica','Define criterios, niveles de logro y puntuación con revisión del formador.','tareas'],
 ['02_Instrucciones-para-tareas/Organizar-la-semana.md','organizar-semana','Organiza la semana','Prepara una propuesta realista de tareas y prioridades.','tareas'],
 ['03_Skills/Diseno-guiado-evaluaciones/SKILL.md','diseno-evaluaciones','Diseño guiado de evaluaciones','Un procedimiento para diseñar pruebas, rúbricas y guías de corrección.','skills','03_Skills/Diseno-guiado-evaluaciones/diseno-guiado-evaluaciones.zip'],
 ['03_Skills/Revision-guiada-escritos/SKILL.md','revision-escritos','Revisión guiada de escritos','Revisa escritos digitales o manuscritos con evidencias y validación docente.','skills','03_Skills/Revision-guiada-escritos/revision-guiada-escritos.zip'],
].map(([file,slug,title,description,group,zip])=>({file,slug,title,description,group,zip}));
const groups = {entorno:'Prepara tu entorno',tareas:'Instrucciones para tareas',skills:'Skills'};
const folderRoutes = {'01_Prepara-tu-entorno':'entorno.html','02_Instrucciones-para-tareas':'tareas.html','03_Skills':'skills.html','03_Skills/Diseno-guiado-evaluaciones':'guias/diseno-evaluaciones.html','03_Skills/Revision-guiada-escritos':'guias/revision-escritos.html'};
const route = r => `guias/${r.slug}.html`;
function nav(prefix, active) {
 return [['index.html','Inicio','inicio'],['guias/empieza-aqui.html','Empieza aquí','guia'],['entorno.html','Tu entorno','entorno'],['tareas.html','Tareas','tareas'],['skills.html','Skills','skills'],['descargas.html','Descargas','descargas']].map(([url,label,id])=>`<a href="${prefix}${url}"${active===id?' aria-current="page"':''}>${label}</a>`).join('');
}
function layout(title,body,{prefix='',active='',wide=false}={}) {
 return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)} | Biblioteca de IA para Formadores</title><meta name="description" content="Recursos de Lorena Vidarte para formadores y formadoras: organización documental, actividades, evaluación y skills con revisión humana."><meta name="color-scheme" content="light"><link rel="stylesheet" href="${prefix}assets/site.css"></head>
<body><a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${prefix}index.html"><span class="brand-icon" aria-hidden="true">lv<span>·</span></span><span>Biblioteca de IA<span class="brand-sub">PARA FORMADORES</span></span></a><nav aria-label="Navegación principal">${nav(prefix,active)}</nav></div></header>
<main id="contenido" class="${wide?'reading-layout':'container'}">${body}</main>
<footer class="site-footer"><div><strong>Lorena Vidarte</strong><span>Recursos para la formación</span></div><div><a href="${repo}">Ver el repositorio en GitHub</a><span>Actualización: 20 de octubre de 2026</span></div></footer></body></html>\n`;
}
function card(r,prefix='') {
 return `<article class="resource-card"><span class="file-label">${r.group==='skills'?'PROCEDIMIENTO REUTILIZABLE':'GUÍA PRÁCTICA'}</span><h2><a href="${prefix}${route(r)}">${esc(r.title)}</a></h2><p>${esc(r.description)}</p><a class="text-link" href="${prefix}${route(r)}">Leer ${r.group==='skills'?'la skill':'la guía'} <span aria-hidden="true">↗</span></a></article>`;
}
function write(file,content){const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,content,'utf8');}
async function build(){
 const mod = process.env.MARKED_MODULE ? await import(pathToFileURL(process.env.MARKED_MODULE).href) : await import('marked');
 const {marked} = mod;
 marked.setOptions({gfm:true,breaks:false});
 const illustration = `<div class="hero-art" aria-hidden="true"><div class="art-dot"></div><div class="paper paper-back"><span></span><span></span><span></span></div><div class="paper paper-front"><div class="paper-tag">TU FORMACIÓN</div><div class="paper-title">Ideas claras.<br>Fuentes a mano.<br>Criterio propio.</div><div class="paper-rule"></div><div class="paper-check">✓ <span>Revisar antes de aprobar</span></div></div><div class="art-note">La IA acompaña.<br>Tú decides.</div></div>`;
 write('index.html',layout('Inicio',`<section class="hero"><div class="hero-copy"><p class="eyebrow">LORENA VIDARTE · RECURSOS PARA LA FORMACIÓN</p><h1>Biblioteca de IA<br><span>para Formadores</span></h1><p class="lead">Guías y procedimientos para formadores y formadoras que imparten cursos para distintas entidades y grupos.</p><p>Organiza tu documentación y trabaja con asistentes de IA para preparar la programación, los materiales, las actividades y la evaluación.</p><div class="actions"><a class="button primary" href="guias/empieza-aqui.html">Empieza aquí <span aria-hidden="true">→</span></a><a class="button secondary" href="Biblioteca-IA-para-Formadores.zip" download>Descargar la biblioteca</a></div></div>${illustration}</section><section class="journey"><div class="section-heading"><p class="eyebrow">PASO A PASO, A TU RITMO</p><h2>Un lugar para preparar tu próxima formación</h2><p>No necesitas leerlo todo de una vez. Empieza por la guía y vuelve cuando necesites un recurso.</p></div><div class="journey-grid"><a class="journey-card" href="entorno.html"><span class="step">01</span><h3>Prepara tu entorno</h3><p>Reúne las fuentes, organiza tus carpetas, prepara el perfil del alumnado y establece las instrucciones del asistente.</p><span class="text-link">Ver los recursos <span aria-hidden="true">→</span></span></a><a class="journey-card" href="tareas.html"><span class="step">02</span><h3>Elige una tarea</h3><p>Encuentra propuestas para preparar actividades, adaptar materiales, elaborar rúbricas y organizar tu trabajo.</p><span class="text-link">Elegir una tarea <span aria-hidden="true">→</span></span></a><a class="journey-card" href="skills.html"><span class="step">03</span><h3>Explora las skills</h3><p>Conoce procedimientos reutilizables para diseñar evaluaciones y revisar escritos con validación docente.</p><span class="text-link">Conocer las skills <span aria-hidden="true">→</span></span></a></div></section><section class="principle"><span class="principle-mark" aria-hidden="true">✓</span><div><p class="eyebrow">EL CRITERIO SIGUE SIENDO TUYO</p><h2>Tú marcas los objetivos y revisas el resultado</h2><p>La IA puede ayudarte a preparar y revisar propuestas. Tu criterio como formador o formadora orienta las decisiones y la adaptación al grupo.</p></div></section>`,{active:'inicio'}));
 const intros = {entorno:'Reúne la documentación, conoce al grupo y establece una forma de trabajo antes de pedir propuestas a la IA.',tareas:'Elige una tarea, completa los datos de tu formación y copia la petición en tu asistente. Revisa el resultado antes de aprobarlo.',skills:'Una skill reúne instrucciones para realizar una tarea siguiendo un procedimiento. Estas dos skills mantienen la revisión y las decisiones en manos del formador o la formadora.'};
 for(const group of Object.keys(groups)){
  const extra=group==='skills'?'<div class="note"><strong>Dos formatos del mismo procedimiento.</strong> El Markdown (.md) permite leer las instrucciones. El ZIP es un paquete comprimido para herramientas compatibles. Descargar una skill no la instala ni la activa.</div>':'';
  write(`${group}.html`,layout(groups[group],`<section class="page-intro"><p class="eyebrow">BIBLIOTECA DE IA PARA FORMADORES</p><h1>${groups[group]}</h1><p class="lead">${intros[group]}</p><a class="text-link" href="guias/empieza-aqui.html">Consultar la guía de inicio <span aria-hidden="true">→</span></a></section>${extra}<section class="resource-grid" aria-label="Recursos disponibles">${resources.filter(r=>r.group===group).map(r=>card(r)).join('')}</section>`,{active:group}));
 }
 write('descargas.html',layout('Descargas',`<section class="page-intro"><p class="eyebrow">LLEVA LOS RECURSOS CONTIGO</p><h1>Descargas</h1><p class="lead">Guarda la biblioteca completa o elige los archivos que necesites.</p></section><section class="download-banner"><div><h2>La biblioteca completa</h2><p>Un ZIP con las guías, las instrucciones y las dos skills. Descomprímelo para acceder a sus archivos.</p></div><a class="button primary" href="Biblioteca-IA-para-Formadores.zip" download>Descargar ZIP <span aria-hidden="true">↓</span></a></section><div class="note"><strong>¿Qué es un Markdown?</strong> Es un archivo de texto (.md) que utiliza marcas sencillas para títulos y listas. Puedes abrirlo con un editor de texto o facilitarlo a tu asistente.</div><section class="download-list" aria-label="Archivos para descargar">${resources.map(r=>`<article><div><h2><a href="${route(r)}">${esc(r.title)}</a></h2><p>${esc(r.description)}</p></div><div class="file-actions"><a href="${r.file}" download>Markdown <span aria-hidden="true">↓</span></a>${r.zip?`<a href="${r.zip}" download>ZIP de la skill <span aria-hidden="true">↓</span></a>`:''}</div></article>`).join('')}</section>`,{active:'descargas'}));
 for(let i=0;i<resources.length;i++){
  const r=resources[i];
  let md=fs.readFileSync(path.join(root,r.file),'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
  let html=marked.parse(md);
  if(r.slug==='empieza-aqui')html=html.replace(/<p>GitHub es un servicio[\s\S]*?<\/p>/,'<p>En esta web puedes leer las guías y descargar sus archivos. GitHub conserva los materiales y su historial de cambios. <strong>No necesitas saber utilizar GitHub para seguir esta guía.</strong></p>');
  const ids=new Set();const toc=[];
  html=html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g,(all,level,label)=>{
   const clean=label.replace(/<[^>]+>/g,'');let id=clean.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
   while(ids.has(id))id+='-2';ids.add(id);
   if(Number(level)===2||Number(level)===3)toc.push({label:clean,id,level});
   return `<h${level} id="${id}">${label}</h${level}>`;
  });
  html=html.replace(/href="([^"#]+)(#[^"]*)?"/g,(all,href,hash='')=>{
   if(/^[a-z]+:/.test(href))return all;
   const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(r.file),href)).replace(/\/$/,'');
   const match=resources.find(x=>x.file===resolved);
   let dest=match?route(match):folderRoutes[resolved]||resolved;
   return `href="../${esc(dest)}${hash}"`;
  });
  html=html.replace(/<table>/g,'<div class="table-scroll" role="region" aria-label="Tabla de consulta" tabindex="0"><table>').replace(/<\/table>/g,'</table></div>');
  const prev=resources[i-1],next=resources[i+1];
  const side=`<aside class="reader-sidebar"><a class="back" href="../index.html">← Volver al inicio</a><p class="eyebrow">EN ESTA BIBLIOTECA</p><nav aria-label="Secciones de la biblioteca">${nav('../',r.group==='inicio'?'guia':r.group)}</nav>${toc.length?`<details open class="toc"><summary>En esta guía</summary><nav aria-label="Contenido de la guía">${toc.map(h=>`<a href="#${h.id}">${esc(h.label)}</a>`).join('')}</nav></details>`:''}</aside>`;
  const actions=`<div class="reader-tools"><span>${r.group==='skills'?'SKILL · PROCEDIMIENTO REUTILIZABLE':'GUÍA DE CONSULTA'}</span><div><a href="../${r.file}" download>Descargar Markdown ↓</a>${r.zip?`<a href="../${r.zip}" download>Descargar ZIP ↓</a>`:''}</div></div>`;
  const pagination=`<nav class="pagination" aria-label="Continuar por la biblioteca">${prev?`<a href="${prev.slug}.html"><span>← Anterior</span><strong>${esc(prev.title)}</strong></a>`:'<a href="../index.html"><span>← Inicio</span><strong>Volver a la portada</strong></a>'}${next?`<a href="${next.slug}.html"><span>Siguiente →</span><strong>${esc(next.title)}</strong></a>`:'<a href="../descargas.html"><span>Descargas →</span><strong>Guarda tus recursos</strong></a>'}</nav>`;
  write(route(r),layout(r.title,`${side}<div class="reader-main">${actions}<article class="prose">${html}</article>${pagination}</div>`,{prefix:'../',active:r.group==='inicio'?'guia':r.group,wide:true}));
 }
 write('404.html',layout('Página no encontrada','<section class="page-intro"><p class="eyebrow">PÁGINA NO ENCONTRADA</p><h1>Volvamos a la biblioteca</h1><p class="lead">Esta dirección no corresponde a una página disponible.</p><a class="button primary" href="/biblioteca-ia-formadores/index.html">Ir al inicio</a></section>',{prefix:'/biblioteca-ia-formadores/'}));
 write('.nojekyll','');
 console.log(`Generadas 18 páginas HTML a partir de ${resources.length} Markdown.`);
}
build().catch(e=>{console.error(e);process.exitCode=1;});
