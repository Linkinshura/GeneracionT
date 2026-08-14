# Trabajo Practico 2 Modulo 2 Generacion T

Alumno: Ian Gutierrez

Año: 2026

## Codigo

[CodigoPokemonAnterior](https://github.com/Linkinshura/GeneracionT/tree/main/TrabajosPracticos/TrabajoPractico1/Caso1/Mejorado)

[CodigoPokemonRefactorizado](https://github.com/Linkinshura/GeneracionT/tree/main/TrabajosPracticos/Modulo2/TrabajoPractico2/Pokemon)

## Mejora realizada: eliminación de código duplicado

La mejora consiste en **centralizar la lógica repetida de acceso a la PokéAPI**, aplicando el principio de reutilización de código.

El refactoring no modifica la funcionalidad existente: la búsqueda, los filtros, los favoritos y la visualización de información continúan funcionando de la misma manera.

### Beneficios

- **Menos duplicación:** se elimina código repetido.
- **Mayor legibilidad:** las funciones son más fáciles de entender.
- **Mejor mantenimiento:** cualquier cambio relacionado con las peticiones a la API puede realizarse en un único lugar.

- **Reutilización:** la misma lógica puede utilizarse desde diferentes partes de la aplicación.
- **Facilita los tests:** la obtención de datos puede probarse de forma independiente.
- **Mismo comportamiento:** la funcionalidad de la Pokédex no cambia.

## Test Unitarios:

[TestUnitarios](https://github.com/Linkinshura/GeneracionT/blob/main/TrabajosPracticos/Modulo2/TrabajoPractico2/Pokemon/Test.js)

## Resultado:

[SimulacionTest](https://github.com/Linkinshura/GeneracionT/blob/main/TrabajosPracticos/Modulo2/TrabajoPractico2/Pokemon/ResultadosTest.sh)
