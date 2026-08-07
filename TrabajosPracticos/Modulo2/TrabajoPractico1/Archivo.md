# Adivina el Pokémon

## Descripción del Proyecto

**Adivina el Pokémon** es una aplicación web interactiva donde el usuario deberá identificar un Pokémon observando únicamente su silueta.

El juego seleccionará un Pokémon aleatorio utilizando la **PokeAPI** y ocultará su imagen mediante una silueta. El usuario deberá escribir el nombre del Pokémon y presionar el botón **Adivinar**.

La aplicación verificará automáticamente si la respuesta es correcta. Luego revelará la imagen original del Pokémon y mostrará información relevante como su nombre, número de Pokédex, tipos, altura y peso.

Además, llevará un registro de aciertos y errores durante la partida, permitiendo jugar tantas veces como el usuario desee.

El objetivo del proyecto es desarrollar una aplicación web dinámica que consuma una API pública, manipule datos en JavaScript y ofrezca una experiencia entretenida para los usuarios.

---

# Objetivos

- Consumir datos desde una API REST.
- Manipular el DOM utilizando JavaScript.
- Crear una interfaz moderna y responsive.
- Implementar lógica de juego.
- Practicar el uso de peticiones HTTP asíncronas.


---

# Tecnologías

- HTML
- CSS
- JavaScript
- PokeAPI

---

# Funcionalidades

## Funcionalidades principales

- Obtener un Pokémon aleatorio desde la PokeAPI.
- Mostrar únicamente la silueta del Pokémon.
- Permitir que el usuario escriba una respuesta.
- Validar la respuesta ingresada.
- Informar si la respuesta fue correcta o incorrecta.
- Revelar la imagen original.
- Mostrar información del Pokémon.
- Llevar un contador de aciertos.
- Llevar un contador de errores.
- Permitir cargar un nuevo Pokémon.

# Flujo de funcionamiento

1. La aplicación solicita un Pokémon aleatorio a la PokeAPI.
2. Obtiene toda la información necesaria.
3. Convierte la imagen en una silueta.
4. El usuario escribe el nombre del Pokémon.
5. Presiona el botón **Adivinar**.
6. La aplicación compara la respuesta con el nombre recibido desde la API.
7. Informa si el usuario acertó o no.
8. Revela la imagen original.
9. Muestra la información del Pokémon.
10. Actualiza el marcador.
11. El usuario puede cargar otro Pokémon y repetir el proceso.

---

# Requisitos funcionales

- Obtener datos desde la PokeAPI.
- Mostrar una silueta del Pokémon.
- Validar respuestas.
- Mostrar información del Pokémon.
- Llevar un contador de aciertos y errores.
- Permitir partidas ilimitadas.

---

# Requisitos no funcionales

- Interfaz intuitiva.
- Diseño responsive.
- Código organizado.
- Fácil mantenimiento.
- Compatible con navegadores modernos.
- Tiempo de carga reducido.

---

# Prompt para un agente de IA

## Rol

Eres un desarrollador web experto en HTML, CSS y JavaScript. Debes desarrollar una aplicación web completa siguiendo exactamente las especificaciones indicadas.

## Objetivo

Crear una aplicación web llamada **Adivina el Pokémon**, donde el usuario deberá adivinar el nombre de un Pokémon observando únicamente su silueta.

## Requisitos

La aplicación debe estar desarrollada utilizando únicamente:

- HTML
- CSS
- JavaScript

Debe consumir información desde la **PokeAPI**.

La estructura del proyecto deberá estar organizada en archivos separados:

```
/
│── index.html
│── css/
│   └── style.css
│── js/
│   └── script.js
│── assets/
```

## Funcionamiento

Al iniciar la aplicación:

- Obtener un Pokémon aleatorio desde la PokeAPI.
- Mostrar solamente la silueta del Pokémon.
- Permitir que el usuario escriba el nombre.
- Incluir un botón llamado **Adivinar**.

Cuando el usuario responda:

- Comparar el texto ingresado con el nombre real.
- Ignorar diferencias entre mayúsculas y minúsculas.
- Informar si la respuesta es correcta o incorrecta.
- Revelar la imagen original.
- Mostrar:

  - Nombre
  - Número de Pokédex
  - Tipos
  - Altura
  - Peso

Después deberá aparecer un botón **Siguiente Pokémon** para comenzar otra ronda.

## Marcador

La aplicación deberá mantener:

- Cantidad de aciertos.
- Cantidad de errores.

El marcador deberá actualizarse automáticamente.

## Diseño

La interfaz debe ser:

- Moderna.
- Responsive.
- Clara.
- Fácil de usar.
- Compatible con dispositivos móviles y escritorio.

## Buenas prácticas

El código debe:

- Estar comentado cuando sea necesario.
- Utilizar funciones reutilizables.
- Evitar código duplicado.
- Separar correctamente HTML, CSS y JavaScript.
- Tener nombres descriptivos para variables y funciones.

