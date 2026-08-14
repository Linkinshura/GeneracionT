import { obtenerPokemon } from './pokedex.js';

describe('Tests unitarios para obtenerPokemon() (Refactoring)', () => {

  beforeEach(() => {
    // Mockeamos la función fetch global antes de cada test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Limpiamos los mocks para que no interfieran entre tests
    jest.clearAllMocks();
  });

  // 1. CASO CORRECTO (Happy Path)
  test('Caso correcto: Resuelve la promesa y devuelve el JSON cuando la petición es exitosa', async () => {
    // Preparación (Arrange)
    const mockPokemonData = { id: 1, name: 'bulbasaur', height: 7 };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPokemonData)
    };
    global.fetch.mockResolvedValue(mockResponse);
    const url = 'https://pokeapi.co/api/v2/pokemon/1';

    // Ejecución (Act)
    const resultado = await obtenerPokemon(url);

    // Verificación (Assert)
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(resultado).toEqual(mockPokemonData);
  });

  // 2. CASO CON DATOS INVÁLIDOS
  test('Caso con datos inválidos: Lanza un error si la API devuelve texto plano (ej. error 404) en lugar de JSON', async () => {
    // Preparación (Arrange)
    // Cuando PokéAPI no encuentra un Pokémon, devuelve un 404 con el texto "Not Found".
    // Al intentar hacer response.json(), JavaScript lanza un SyntaxError.
    const mockResponse = {
      ok: false,
      status: 404,
      json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token N in JSON at position 0'))
    };
    global.fetch.mockResolvedValue(mockResponse);
    const urlInvalida = 'https://pokeapi.co/api/v2/pokemon/pokemon-invalido';

    // Ejecución y Verificación (Act & Assert)
    // Esperamos que la función propague el error de parseo del JSON
    await expect(obtenerPokemon(urlInvalida)).rejects.toThrow(SyntaxError);
    await expect(obtenerPokemon(urlInvalida)).rejects.toThrow('Unexpected token N');
  });

  // 3. CASO LÍMITE (Edge Case)
  test('Caso límite: Rechaza la promesa si se pasa una URL vacía (provocando un fallo de red/TypeError en fetch)', async () => {
    // Preparación (Arrange)
    // Si fetch recibe una URL vacía o hay un corte de internet, lanza un TypeError
    const errorDeRed = new TypeError('Failed to fetch');
    global.fetch.mockRejectedValue(errorDeRed);
    const urlVacia = '';

    // Ejecución y Verificación (Act & Assert)
    // Aseguramos que el error subyacente no es tragado ni modificado por la función
    await expect(obtenerPokemon(urlVacia)).rejects.toThrow(TypeError);
    await expect(obtenerPokemon(urlVacia)).rejects.toThrow('Failed to fetch');
  });

});
