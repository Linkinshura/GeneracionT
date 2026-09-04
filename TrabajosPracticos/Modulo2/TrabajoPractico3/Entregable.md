# Modulo 2 Trabajo Practico 3: Multiverse

Alumno: Ian Gutierrez

Año: 2026

## Consigna
Realizar el modelo de una base de datos para una aplicacion que engloba personajes de universos ficticios donde se registran los personajes con su informacion basica, su universo, su poder y clasificarlos segun su peligrosidad

Sin escribir SQL ni utilizar la IA(Solo al finalizar para que evalue el resultado)

### Tablas

<details>
<summary> Personajes </summary> 
<ul>
<li>Id - Primary Key - INT</li>
<li>Nombre - VARCHAR</li>
<li>Universo - FOREIGN KEY - INT</li>
</ul>
</details>

<details>
<summary> Universos </summary>
<ul>
<li>Id - Primary Key - INT</li>
<li>Nombre - VARCHAR</li>
</ul>
</details>

<details>
<summary> Poderes </summary>
<ul>
<li>Id - Primary Key - INT</li>
<li>Habilidad - VARCHAR</li>
<li>NivelPeligroso - VARCHAR</li>
</ul>
</details>

<details>
<summary> PoderesPersonajes </summary>
<ul>
<li>Id - Primary Key - INT</li>
<li>Personaje - FOREIGN KEY - INT</li>
<li>Poder - FOREIGN KEY - INT </li>
</ul>
</details>

### Relaciones

Personajes 1:M PoderesPersonajes
Poderes 1:M PoderesPersonajes
Universos 1:M Personajes 
