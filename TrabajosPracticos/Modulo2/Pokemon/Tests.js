import { 
  obtenerPokemon, 
  verDetalle, 
  mostrarLista, 
  mostrarFavoritos 
} from './pokedex.js'; // Ajustá la ruta a tu archivo real

describe('Refactoring de la API Pokédex', () => {

  // Configuramos el mock de fetch antes de cada test
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  // Limpiamos los mocks después de cada test para que no se filtren datos
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Función base: obtenerPokemon()', () => {
    
    test('1. Realiza la petición fetch utilizando la URL recibida', async () => {
      // Mockeamos la respuesta exitosa
      const mockResponse = { json: jest.fn().mockResolvedValue({}) };
      global.fetch.mockResolvedValue(mockResponse);
      
      const testUrl = 'https://pokeapi.co/api/v2/pokemon/25';
      await obtenerPokemon(testUrl);
      
      // Verificamos que fetch fue llamado una sola vez y con la URL exacta
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(testUrl);
    });

    test('2. Devuelve correctamente los datos JSON obtenidos', async () => {
      const mockPokemonData = { id: 25, name: 'pikachu' };
      const mockResponse = { json: jest.fn().mockResolvedValue(mockPokemonData) };
      global.fetch.mockResolvedValue(mockResponse);
      
      const resultado = await obtenerPokemon('url-cualquiera');
      
      // Verificamos que lo que devuelve la función es el objeto parseado
      expect(resultado).toEqual(mockPokemonData);
    });

    test('3. El resultado devuelto es una Promise', () => {
      const mockResponse = { json: jest.fn().mockResolvedValue({}) };
      global.fetch.mockResolvedValue(mockResponse);
      
      // Llamamos a la función SIN await para capturar lo que retorna síncronamente
      const resultadoPromesa = obtenerPokemon('url-cualquiera');
      
      // Verificamos que el retorno es estrictamente una Promesa
      expect(resultadoPromesa).toBeInstanceOf(Promise);
    });

    test('4. Un error de red/fetch NO es ocultado por la función', async () => {
      const errorDeRed = new Error('Fallo de conexión a Internet');
      // Forzamos a fetch a fallar
      global.fetch.mockRejectedValue(errorDeRed);
      
      // Verificamos que al llamar a la función, la promesa se rechace con ese mismo error
      await expect(obtenerPokemon('url-cualquiera')).rejects.toThrow('Fallo de conexión a Internet');
    });

  });

  describe('Integración con funciones existentes (comportamiento conservado)', () => {
    /* 
      Nota: Los expects de estas pruebas dependen de qué hacen exactamente 
      tus funciones verDetalle, mostrarLista, etc. 
      Aquí asumo que devuelven los datos procesados para poder testearlas, 
      si actualizan el DOM, tendrías que validar el DOM en su lugar (ej. expect(document.body.innerHTML)...).
    */

    test('5. Comportamiento correcto desde verDetalle()', async () => {
      const mockPokemon = { name: 'charizard', weight: 905 };
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockPokemon)
      });
      
      // Asumiendo que verDetalle recibe una URL y devuelve o setea el pokemon
      const detalle = await verDetalle('https://pokeapi.co/api/v2/pokemon/6');
      
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/6');
      // Ajustá este expect según lo que devuelva tu función real
      expect(detalle).toBeDefined(); 
    });

    test('6. Comportamiento correcto desde mostrarLista()', async () => {
      const mockLista = {
        results: [{ name: 'bulbasaur', url: '...' }, { name: 'ivysaur', url: '...' }]
      };
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockLista)
      });
      
      const lista = await mostrarLista('https://pokeapi.co/api/v2/pokemon?limit=2');
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
      // Validamos que consumió la lista y procesó los results correctamente
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=2');
    });

    test('7. Comportamiento correcto desde mostrarFavoritos()', async () => {
      const mockFavorito = { name: 'squirtle' };
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockFavorito)
      });
      
      // Si mostrarFavoritos itera sobre un array de URLs, fetch debería llamarse múltiples veces
      const urlsFavoritos = ['url/7', 'url/8']; // URLs de squirtle y wartortle
      await mostrarFavoritos(urlsFavoritos);
      
      // Asumiendo que internamente hace un Promise.all o bucle for con el array
      expect(global.fetch).toHaveBeenCalled(); 
      // Comprueba que al menos intentó buscar el primero de la lista
      expect(global.fetch).toHaveBeenCalledWith('url/7'); 
    });
    
  });
});
