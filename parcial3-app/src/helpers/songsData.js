// Datos de ejemplo (canciones ficticias) para la mini plataforma.
export const CANCIONES = [
  { titulo: 'Aurora Digital', artista: 'Luna Roja', reproducciones: 9400 },
  { titulo: 'Atardecer en Cali', artista: 'Los Cafeteros', reproducciones: 8700 },
  { titulo: 'Amanecer Electrico', artista: 'Luna Roja', reproducciones: 5200 },
  { titulo: 'Bailando Bajo la Lluvia', artista: 'Mar Abierto', reproducciones: 7600 },
  { titulo: 'Brisa de Verano', artista: 'Mar Abierto', reproducciones: 4300 },
  { titulo: 'Corazon de Neon', artista: 'Pulso 90', reproducciones: 9900 },
  { titulo: 'Cumbia del Futuro', artista: 'Los Cafeteros', reproducciones: 6100 },
  { titulo: 'Estrella Fugaz', artista: 'Nova', reproducciones: 3500 },
  { titulo: 'Fuego Lento', artista: 'Pulso 90', reproducciones: 5800 },
  { titulo: 'Mapa de Estrellas', artista: 'Nova', reproducciones: 2900 },
  { titulo: 'Noche en Calma', artista: 'Luna Roja', reproducciones: 4800 },
  { titulo: 'Ritmo de Ciudad', artista: 'Pulso 90', reproducciones: 7100 },
  { titulo: 'Sol de Medianoche', artista: 'Nova', reproducciones: 6600 },
  { titulo: 'Viaje Sin Retorno', artista: 'Mar Abierto', reproducciones: 3900 },
]

// Cada par es una arista del grafo: "estas dos canciones se parecen".
export const SIMILARES = [
  ['Aurora Digital', 'Amanecer Electrico'],
  ['Aurora Digital', 'Corazon de Neon'],
  ['Aurora Digital', 'Sol de Medianoche'],
  ['Amanecer Electrico', 'Estrella Fugaz'],
  ['Atardecer en Cali', 'Cumbia del Futuro'],
  ['Atardecer en Cali', 'Brisa de Verano'],
  ['Bailando Bajo la Lluvia', 'Brisa de Verano'],
  ['Bailando Bajo la Lluvia', 'Ritmo de Ciudad'],
  ['Corazon de Neon', 'Fuego Lento'],
  ['Corazon de Neon', 'Ritmo de Ciudad'],
  ['Cumbia del Futuro', 'Ritmo de Ciudad'],
  ['Estrella Fugaz', 'Mapa de Estrellas'],
  ['Estrella Fugaz', 'Sol de Medianoche'],
  ['Fuego Lento', 'Noche en Calma'],
  ['Mapa de Estrellas', 'Viaje Sin Retorno'],
  ['Noche en Calma', 'Viaje Sin Retorno'],
]