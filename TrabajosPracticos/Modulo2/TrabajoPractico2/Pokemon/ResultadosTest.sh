$ npm test obtenerPokemon.test.js

 PASS  ./obtenerPokemon.test.js
  Tests unitarios para obtenerPokemon() (Refactoring)
    ✓ Caso correcto: Resuelve la promesa y devuelve el JSON cuando la petición es exitosa (15 ms)
    ✓ Caso con datos inválidos: Lanza un error si la API devuelve texto plano (ej. error 404) en lugar de JSON (3 ms)
    ✓ Caso límite: Rechaza la promesa si se pasa una URL vacía (provocando un fallo de red/TypeError en fetch) (2 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.435 s
Ran all test suites matching /obtenerPokemon.test.js/i.
