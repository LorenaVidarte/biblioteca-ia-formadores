# Guía para nombrar archivos y carpetas

Utiliza nombres breves que permitan reconocer el contenido. Mantén siempre el mismo criterio.

## Reglas comunes

| Elemento | Cómo escribirlo |
|---|---|
| Orden de carpetas | Dos cifras: `00`, `01`, `02`. |
| Separación entre bloques | Guion bajo: `_`. |
| Separación entre palabras | Guion: `-`. |
| Fechas | Año-mes-día: `2026-10-20`. |
| Versiones | `v01`, `v02`, `v03`. |
| Estados | `borrador`, `revisado`, `aprobado`. |

En los nombres utiliza letras sin tildes, números, guiones y guiones bajos. Dentro de los documentos escribe con la ortografía habitual.

## Carpetas generales

```text
00_Configuracion-general
01_Centros
02_Cursos
03_Ediciones
```

El número `00` identifica la configuración o información de entrada de cada nivel. Por ejemplo: `00_Contexto` dentro de una edición.

## Cursos

Formato:

```text
CODIGO_Nombre-breve
```

Ejemplo ficticio:

```text
CUR001_Uso-del-smartphone
```

Utiliza el código oficial cuando corresponda. Si no existe, asigna uno interno y regístralo en un listado de cursos.

## Ediciones

Una edición es una impartición del curso a un grupo concreto.

Formato:

```text
CODIGO_Nombre-breve_CENTRO_AAAA-E01
```

Ejemplo ficticio:

```text
CUR001_Smartphone_IDFO_2026-E01
```

`E01` identifica la primera edición de ese curso en ese centro durante ese año. La siguiente será `E02`.

Anota el significado de los códigos y abreviaturas en el resumen de contexto.

## Documentos de una edición

Formato:

```text
CODIGO_CENTRO_EDICION_Documento_v01_estado
```

Ejemplos:

```text
CUR001_IDFO_2026-E01_Programacion_v01_borrador.docx
CUR001_IDFO_2026-E01_Evaluacion-final_v02_aprobado.docx
```

- **Borrador:** está en preparación.
- **Revisado:** se ha comprobado; puede seguir pendiente de aprobación.
- **Aprobado:** la persona responsable ha autorizado esa versión para el uso previsto.

Evita nombres como `final2` o `definitivo-ahora-si`.

## Recursos generales o reutilizables

Añade únicamente la información necesaria:

```text
Ficha-de-contexto.md
CUR001_Actividad-correo_v01.docx
```

Utiliza fechas cuando ayuden a identificar el contenido, por ejemplo, en actas y grabaciones.

## Conserva los originales

No renombres los documentos originales del centro. Si preparas una adaptación, crea una copia identificada.

Conserva la extensión del archivo: `.docx`, `.pdf`, `.md` u otra. Esa terminación indica su formato; cambiarla no convierte el documento a otro formato.
