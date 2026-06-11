# TRABAJO PRÁCTICO — Diseñando un Equipo de Agentes IA

## Aplicación para Gestión de Turnos Médicos Online

> **Objetivo del proyecto:** Comprender cómo diferentes agentes especializados pueden colaborar para resolver un problema complejo mediante inteligencia artificial distribuida.

---

## 1. Introducción: ¿Qué es un sistema multiagente?

Un sistema multiagente (SMA) es una arquitectura de inteligencia artificial en la que múltiples agentes autónomos trabajan de forma coordinada para resolver problemas que serían demasiado complejos para un solo agente.

Cada agente está especializado en una tarea específica, posee sus propias herramientas y conocimientos, y se comunica con los demás a través de un componente central llamado Orquestador.

**Características clave de un agente:**

- **Autonomía:** toma decisiones dentro de su dominio sin intervención humana.
- **Especialización:** tiene un objetivo y un conjunto de herramientas acotados.
- **Reactividad:** responde a eventos o solicitudes del entorno.
- **Comunicación:** reporta sus resultados al Orquestador.

---

## 2. El equipo de agentes diseñado

Para el sistema de gestión de turnos médicos online se diseñó un equipo de 5 agentes especializados, coordinados por un Orquestador central. Cada agente es responsable de un dominio específico del sistema.

| # | Agente | Responsabilidad principal | Tecnología clave |
|---|--------|--------------------------|-----------------|
| 1 | Orquestador | Coordina tareas, gestiona dependencias y flujo general | Motor de workflows / LLM |
| 2 | Recepcionista IA | Primer contacto con el paciente, entiende su solicitud | NLP / Procesamiento de lenguaje natural |
| 3 | Gestión de Agenda | Consulta y reserva de turnos disponibles | Base de datos / Calendario API |
| 4 | Perfil Médico | Datos de médicos, especialidades y obras sociales | Base de datos médica |
| 5 | Notificaciones | Confirma, recuerda y cancela turnos al paciente | Email / SMS API |
| 6 | Seguridad y Datos | Autenticación, privacidad y registros de auditoría | Auth / Encriptación / Logs |

---

## 3. Función detallada de cada agente

### 3.0 Orquestador (Agente coordinador)

El Orquestador es el cerebro del sistema. No ejecuta tareas directamente, sino que recibe la solicitud inicial, la descompone en subtareas y las delega a los agentes especializados en el orden correcto, gestionando las dependencias entre ellos.

**Responsabilidades:**

- Recibir y analizar la solicitud del paciente.
- Planificar el flujo de trabajo: qué agente actúa primero y cuáles después.
- Pasar el contexto acumulado de un agente al siguiente.
- Integrar los resultados parciales en una respuesta final coherente.
- Detectar errores y relanzar tareas si un agente falla.

---

### 3.1 Agente Recepcionista IA

| | |
|---|---|
| **🤖 Agente Recepcionista IA** | Primer contacto con el paciente. Interpreta el lenguaje natural, valida datos básicos e identifica la intención. |
| **Entradas** | Mensaje del paciente (texto libre), datos de sesión. |
| **Salidas** | Intención estructurada (especialidad, urgencia, preferencia horaria), datos del paciente. |
| **Herramientas** | NLP / Modelo de lenguaje, formulario de datos básicos, verificación de identidad básica. |
| **Comunica con** | Orquestador (reporta la intención), Agente de Perfil Médico (solicita especialidades disponibles). |

**Ejemplo de interacción:**

> *Paciente:* "Necesito turno con un cardiólogo para la semana que viene, de mañana."
>
> *Agente:* Detecta especialidad = Cardiología, franja = mañana, urgencia = baja. Pasa datos al Orquestador.

---

### 3.2 Agente de Gestión de Agenda

| | |
|---|---|
| **🤖 Agente de Gestión de Agenda** | Consulta la disponibilidad real de médicos, ofrece opciones de turno y confirma la reserva. |
| **Entradas** | Especialidad requerida, franja horaria preferida, ID del médico (si aplica). |
| **Salidas** | Lista de turnos disponibles, confirmación de reserva, ID del turno creado. |
| **Herramientas** | API de calendario médico, base de datos de turnos, motor de búsqueda de disponibilidad. |
| **Comunica con** | Orquestador, Agente de Perfil Médico (para validar médico), Agente de Notificaciones (para confirmar). |

**Lógica interna:**

- Consulta disponibilidad en tiempo real en la base de datos de turnos.
- Filtra por especialidad, obra social y franja horaria solicitada.
- Bloquea el turno temporalmente mientras el paciente confirma.
- Libera el turno si no hay confirmación en el tiempo límite.

---

### 3.3 Agente de Perfil Médico

| | |
|---|---|
| **🤖 Agente de Perfil Médico** | Administra la información de los profesionales: especialidades, obras sociales, duración de consulta y disponibilidad. |
| **Entradas** | Consulta por especialidad, nombre de médico o ID. |
| **Salidas** | Ficha del médico (especialidades, obras sociales, duración, días de atención). |
| **Herramientas** | Base de datos médica, API de matrículas, sistema de gestión de profesionales. |
| **Comunica con** | Agente de Agenda (provee datos de médicos), Agente Recepcionista (responde consultas de disponibilidad). |

**Datos que maneja:**

- Nombre, matrícula y especialidades del médico.
- Obras sociales y prepagas aceptadas.
- Duración estándar de cada tipo de consulta.
- Días y horarios de atención habituales.

---

### 3.4 Agente de Notificaciones

| | |
|---|---|
| **🤖 Agente de Notificaciones** | Envía confirmaciones, recordatorios y avisos de cancelación al paciente por múltiples canales. |
| **Entradas** | Tipo de evento (confirmación, recordatorio, cancelación), datos del turno, datos de contacto del paciente. |
| **Salidas** | Mensaje enviado, estado de entrega (OK / error). |
| **Herramientas** | API de email (SMTP), API de SMS, servicio de push notifications. |
| **Comunica con** | Solo recibe instrucciones del Orquestador. No inicia comunicaciones por cuenta propia. |

**Tipos de notificaciones:**

- Confirmación inmediata al reservar el turno.
- Recordatorio 24 horas antes de la consulta.
- Recordatorio 1 hora antes (opcional, configurable).
- Aviso de cancelación o reprogramación con nueva propuesta.
- Solicitud de confirmación de asistencia ("¿Confirma su turno? Responda SÍ/NO").

---

### 3.5 Agente de Seguridad y Datos

| | |
|---|---|
| **🤖 Agente de Seguridad y Datos** | Autentica usuarios, verifica permisos y protege los datos personales y médicos en todo el flujo. |
| **Entradas** | Credenciales del usuario, operaciones solicitadas, datos sensibles a persistir. |
| **Salidas** | Token de sesión válido, resultado de la verificación de permisos, logs de auditoría. |
| **Herramientas** | Sistema de autenticación (OAuth / JWT), motor de encriptación, base de datos de logs. |
| **Comunica con** | Todos los agentes lo consultan antes de ejecutar operaciones con datos sensibles. |

**Principios de diseño:**

- Ningún agente accede a datos personales sin pasar por este agente primero.
- Todos los datos médicos se encriptan en tránsito y en reposo.
- Se registra un log de auditoría por cada operación sensible.
- Cumplimiento con normativas de protección de datos (ej. Ley 25.326 en Argentina).

---

## 4. ¿Cómo se comunican los agentes?

El flujo de trabajo es centralizado en el Orquestador. Cada agente recibe instrucciones claras, trabaja de forma autónoma en su especialidad y reporta sus avances. El Orquestador integra todos los resultados y gestiona las dependencias entre tareas.

**Flujo completo: solicitud de turno nuevo**

```
Paciente        →  Orquestador      →  Seguridad         →  Recepcionista
(Solicita turno)   (Analiza solicitud) (Autentica usuario)   (Detecta intención)
                                                                      ↓
Notificaciones  ←  Orquestador      ←  Agenda            ←  Perfil Médico
(Confirma al       (Integra resultado) (Reserva el turno)    (Provee disponibilidad)
 paciente)
```

**Principios del flujo de comunicación**

| Principio | Descripción |
|-----------|-------------|
| **Centralización** | Todo mensaje entre agentes pasa por el Orquestador. No hay comunicación directa peer-to-peer. |
| **Contexto acumulativo** | El Orquestador pasa el historial de resultados previos a cada nuevo agente. |
| **Ejecución secuencial** | Las tareas con dependencias se ejecutan en orden; las independientes pueden paralelizarse. |
| **Idempotencia** | Si un agente falla, el Orquestador puede relanzarlo sin duplicar efectos (ej. no enviar dos confirmaciones). |
| **Reporte de estado** | Cada agente devuelve: resultado, estado (éxito/error) y tiempo de ejecución. |

---

## 5. Ventajas de esta arquitectura multiagente

| ✓ Ventajas | ⚠ Desafíos |
|------------|-----------|
| **Escalabilidad:** se puede agregar un nuevo agente sin rediseñar el sistema. | **Coordinación:** el Orquestador puede ser un cuello de botella si no está bien optimizado. |
| **Mantenibilidad:** cada agente es independiente y puede actualizarse solo. | **Latencia:** encadenar agentes agrega tiempo de procesamiento. |
| **Especialización:** cada agente usa las herramientas más adecuadas para su tarea. | **Depuración:** rastrear errores en flujos multiagente puede ser complejo. |
| **Resiliencia:** si un agente falla, el Orquestador puede redirigir la tarea. | **Costo:** varios modelos de IA corriendo simultáneamente tiene un costo computacional mayor. |

---

## 6. Conclusión

La arquitectura multiagente diseñada para el sistema de gestión de turnos médicos demuestra cómo la IA distribuida puede resolver problemas complejos de forma modular y eficiente.

Cada agente aporta una especialización que, en conjunto, cubre todo el ciclo de vida de un turno médico: desde que el paciente hace su solicitud hasta que recibe la confirmación, con la seguridad y privacidad de sus datos garantizadas en todo momento.

El rol del Orquestador es fundamental: sin una coordinación centralizada, los agentes no podrían colaborar de manera coherente ni garantizar la consistencia del sistema.

---
---

# DESAFÍO EXTRA — Diseñando un Equipo de Agentes IA

## Organización de un Evento Musical

> **Problema elegido:** Diseñar un equipo de agentes de IA que colabore para organizar un evento musical de principio a fin: desde la convocatoria de artistas hasta la comunicación con el público y el cierre financiero.

---

## 1. Descripción del problema

Organizar un evento musical es un proceso extremadamente complejo que involucra múltiples dominios simultáneos: contratación artística, logística técnica, ventas de entradas, comunicación masiva, gestión financiera y operaciones en tiempo real el día del evento.

La coordinación manual de todas estas áreas es propensa a errores, demoras y desincronizaciones. Un equipo de agentes de IA permite automatizar y coordinar estas tareas de manera eficiente, reduciendo el margen de error y liberando al equipo humano para decisiones estratégicas.

**El sistema debe gestionar:**

- La convocatoria y contratación de artistas y bandas.
- La reserva y acondicionamiento del venue (espacio físico).
- La puesta en venta de entradas y control de aforo.
- La campaña de marketing y comunicación con el público.
- El presupuesto, pagos a proveedores y balance final.
- La coordinación operativa el día del evento.

---

## 2. El equipo de agentes diseñado

Se diseñó un equipo de 6 agentes especializados más el Orquestador central. Cada agente es responsable de un dominio completo del evento musical.

| # | Agente | Responsabilidad | Fase del evento |
|---|--------|----------------|----------------|
| 0 | **Orquestador** | Coordina todos los agentes y el cronograma general | Todo el proceso |
| 1 | **Agente Artístico** | Contratación de artistas, riders y horarios de show | Pre-producción |
| 2 | **Agente de Venue** | Reserva del espacio, sonido, iluminación y catering | Pre-producción y día del evento |
| 3 | **Agente de Entradas** | Boletería, precios, cupos, preventas y control de acceso | Pre-venta y día del evento |
| 4 | **Agente de Marketing** | Redes sociales, prensa, publicidad y comunicación al público | Pre-producción y post-evento |
| 5 | **Agente Financiero** | Presupuesto, pagos a proveedores y balance final | Todo el proceso |
| 6 | **Agente Operativo** | Coordinación logística el día del evento en tiempo real | Día del evento |

---

## 3. Función detallada de cada agente

### 3.0 Orquestador

El Orquestador es quien recibe el brief inicial del evento (fecha, ciudad, presupuesto, estilo musical, capacidad estimada) y lo descompone en proyectos paralelos para cada agente. Gestiona el cronograma de producción, detecta dependencias críticas (no se puede vender entradas sin confirmar el venue) y actúa como punto de integración de toda la información.

**Dependencias críticas que gestiona:**

- El Agente de Marketing no puede publicar el line-up hasta que el Agente Artístico confirme los contratos.
- El Agente de Entradas no puede abrir la venta hasta que el Agente de Venue confirme el aforo máximo.
- El Agente Financiero debe aprobar cada gasto antes de que el agente correspondiente lo ejecute.
- El Agente Operativo recibe el plan definitivo solo cuando todos los agentes han completado su etapa de pre-producción.

---

### 3.1 Agente Artístico

| | |
|---|---|
| **♪ Agente Artístico** | Gestiona la contratación de artistas, coordina los riders técnicos y define el order of play del evento. |
| **Entradas** | Brief del evento (estilo, presupuesto artístico, fecha), lista de artistas candidatos. |
| **Salidas** | Contratos firmados, riders técnicos consolidados, order of play (cronograma de shows). |
| **Herramientas** | Base de datos de artistas, sistema de contratos digitales, calendario de disponibilidad. |
| **Comunica con** | Orquestador (reporta contratos), Agente de Venue (pasa riders técnicos), Agente de Marketing (confirma line-up). |

**Tareas principales:**

- Identificar artistas disponibles en la fecha y dentro del presupuesto.
- Negociar cachés, condiciones de contrato y cláusulas de cancelación.
- Procesar y consolidar los riders técnicos (requerimientos de sonido, iluminación, camerino).
- Definir el order of play: qué artista abre, cuál es el headliner y los tiempos de cada set.

---

### 3.2 Agente de Venue y Logística

| | |
|---|---|
| **♪ Agente de Venue y Logística** | Reserva y prepara el espacio físico del evento: sonido, iluminación, escenario, catering y seguridad. |
| **Entradas** | Fecha, ciudad, capacidad estimada, riders técnicos de los artistas. |
| **Salidas** | Contrato del venue firmado, presupuesto de producción técnica, plan de disposición del espacio. |
| **Herramientas** | Plataformas de reserva de venues, proveedores de sonido e iluminación, empresas de catering y seguridad. |
| **Comunica con** | Orquestador, Agente Artístico (recibe riders), Agente Financiero (valida costos de producción), Agente Operativo (pasa plano del evento). |

**Checklist de producción:**

- Escenario principal y escenario secundario (si aplica).
- Sistema de sonido: PA, monitores, consola FOH y consola de monitores.
- Diseño de iluminación: rigs, movers, followspots y efectos especiales.
- Servicios de catering: bares, food trucks y áreas VIP.
- Personal de seguridad privada y coordinación con autoridades locales.

---

### 3.3 Agente de Venta de Entradas

| | |
|---|---|
| **♪ Agente de Venta de Entradas** | Gestiona toda la cadena de boletería: tipos de entrada, precios, cupos, preventas y acceso el día del evento. |
| **Entradas** | Capacidad del venue (del Agente de Venue), estrategia de precios, tipos de sectores. |
| **Salidas** | Entradas vendidas, ingresos por boletería, reporte de ocupación en tiempo real. |
| **Herramientas** | Plataforma de ticketing (ej. Ticketek / Eventbrite), sistema de QR y control de acceso, pasarelas de pago. |
| **Comunica con** | Orquestador, Agente de Venue (confirma aforo), Agente Financiero (reporta ingresos), Agente Operativo (control de acceso el día del evento). |

**Tipos de entrada que gestiona:**

- Preventa 1 y Preventa 2 (precios escalonados).
- Entradas generales, platea, campo y sector VIP.
- Abonos con beneficios especiales (meet & greet, acceso anticipado).
- Invitaciones de cortesía y acreditaciones de prensa.
- Control de reventas y entradas fraudulentas (validación por QR único).

---

### 3.4 Agente de Marketing y Comunicación

| | |
|---|---|
| **♪ Agente de Marketing** | Diseña y ejecuta la campaña de comunicación: redes sociales, prensa, publicidad paga y contenido post-evento. |
| **Entradas** | Line-up confirmado, fecha, venue, tipos de entrada, identidad visual del evento. |
| **Salidas** | Calendario de publicaciones, notas de prensa enviadas, métricas de alcance y conversión. |
| **Herramientas** | Herramientas de social media (Buffer / Hootsuite), generador de contenido IA, plataformas de ads (Meta, Google), bases de datos de medios. |
| **Comunica con** | Orquestador, Agente Artístico (necesita el line-up confirmado para publicar), Agente de Entradas (coordina comunicación de preventas). |

**Fases de la campaña:**

- Teaser (sin revelar artistas): generar expectativa 8 semanas antes.
- Anuncio del line-up: publicación masiva en redes y medios especializados.
- Apertura de preventa: comunicación urgente y cuenta regresiva.
- Semana del evento: contenido diario, detrás de escena, activaciones.
- Post-evento: reels, fotos profesionales, agradecimientos y encuesta de satisfacción.

---

### 3.5 Agente Financiero

| | |
|---|---|
| **♪ Agente Financiero** | Controla el presupuesto total del evento, aprueba pagos a proveedores y genera el balance final. |
| **Entradas** | Presupuesto inicial aprobado, solicitudes de pago de otros agentes, ingresos de boletería. |
| **Salidas** | Aprobaciones o rechazos de gastos, reportes de flujo de caja, balance final del evento. |
| **Herramientas** | Sistema contable, pasarelas de pago, herramientas de forecasting financiero. |
| **Comunica con** | Todos los agentes (cada uno solicita aprobación de gastos), Orquestador (reporta estado financiero del evento). |

**Categorías de presupuesto:**

- Cachés artísticos (típicamente 40–60% del presupuesto total).
- Producción técnica: sonido, iluminación, escenario.
- Venue: alquiler del espacio y permisos.
- Marketing y publicidad.
- Seguridad, personal y logística.
- Contingencia: reserva del 10% para imprevistos.

---

### 3.6 Agente Operativo (Día del Evento)

| | |
|---|---|
| **♪ Agente Operativo** | Coordina en tiempo real todas las operaciones el día del evento: cronograma, incidencias y comunicación entre equipos. |
| **Entradas** | Plan de producción definitivo, order of play, plano del venue, contactos de todos los equipos. |
| **Salidas** | Cronograma actualizado en tiempo real, alertas de incidencias, reportes de cada sector. |
| **Herramientas** | App de gestión de eventos en tiempo real, radio IP, sistema de tickets de incidencias, dashboard de control. |
| **Comunica con** | Todos los agentes (es el punto de contacto operativo el día del evento), Orquestador (reporta el estado general). |

**Responsabilidades el día del evento:**

- Monitorear el cronograma de llegada de artistas y soundchecks.
- Coordinar la apertura de puertas y flujo de ingreso del público.
- Gestionar incidencias en tiempo real (retrasos, problemas técnicos, emergencias).
- Comunicar cambios de último momento a todos los equipos.
- Generar el reporte de cierre del evento para el Orquestador.

---

## 4. Flujo de comunicación

El flujo sigue el mismo modelo centralizado del sistema de turnos médicos: el Orquestador gestiona todas las interacciones entre agentes, respetando las dependencias críticas del proceso de producción de un evento.

**Fase 1: Pre-producción (semanas 1 a 8)**

```
Brief inicial  →  Orquestador         →  Ag. Artístico    →  Ag. Venue
(Cliente /        (Planifica el           (Contrata           (Reserva el
 Promotor)         proyecto)               artistas)           espacio)
```

**Fase 2: Lanzamiento (semanas 4 a 6)**

```
Ag. Financiero  →  Ag. Entradas   →  Ag. Marketing   →  Orquestador
(Aprueba           (Abre              (Lanza              (Monitorea
 presupuesto)       preventa)          campaña)            métricas)
```

**Fase 3: Día del evento**

```
Ag. Operativo        →  Ag. Entradas      →  Ag. Venue         →  Orquestador
(Coordina en            (Control de          (Gestiona el          (Supervisión
 tiempo real)            acceso)              espacio)              general)
```

**Dependencias críticas del flujo**

| Tarea bloqueada | Requiere que primero se complete... |
|----------------|-------------------------------------|
| **Marketing: publicar line-up** | Agente Artístico: contratos firmados y line-up confirmado. |
| **Entradas: abrir preventa** | Agente de Venue: aforo máximo del espacio confirmado. |
| **Cualquier pago a proveedor** | Agente Financiero: aprobación del gasto dentro del presupuesto. |
| **Agente Operativo: plan del evento** | Todos los agentes: pre-producción completada (contratos, venue, técnica). |
| **Marketing: campaña post-evento** | Agente Operativo: reporte de cierre del evento entregado al Orquestador. |

---

## 5. Comparación con el sistema de turnos médicos

La misma metodología de diseño multiagente aplicada a los turnos médicos se traslada con naturalidad a la organización de un evento musical. La siguiente tabla compara ambos sistemas:

| Componente | Turnos Médicos | Evento Musical |
|------------|---------------|----------------|
| **Orquestador** | Gestiona el ciclo del turno | Gestiona el proceso de producción |
| **Primer contacto** | Agente Recepcionista (paciente) | Brief inicial (promotor / cliente) |
| **Recursos** | Agente de Perfil Médico | Agente Artístico + Agente de Venue |
| **Reserva** | Agente de Agenda | Agente de Entradas |
| **Comunicación** | Agente de Notificaciones | Agente de Marketing |
| **Control** | Agente de Seguridad y Datos | Agente Financiero |
| **Operación en vivo** | (No aplica) | Agente Operativo (día del evento) |

---

## 6. Conclusión

La organización de un evento musical es un caso de uso ideal para demostrar la potencia de la inteligencia artificial distribuida. La complejidad del dominio — con múltiples actores, dependencias críticas, plazos estrictos y operación en tiempo real — hace que un único agente generalista sea insuficiente.

El diseño multiagente permite que cada especialidad (artística, logística, financiera, comunicacional y operativa) sea atendida por un agente con las herramientas y el conocimiento específicos para ese dominio, mientras el Orquestador garantiza que todo el sistema avance en la misma dirección y en el orden correcto.

La comparación con el sistema de turnos médicos confirma que la metodología es transferible: los mismos principios de especialización, orquestación centralizada y gestión de dependencias se aplican con éxito a problemas de naturaleza completamente diferente.
