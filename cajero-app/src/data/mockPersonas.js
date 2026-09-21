export function generarFechaLlegada() {
  const ahora = Date.now();
  const minutosAleatorios = Math.floor(Math.random() * 20);
  return new Date(ahora + minutosAleatorios * 60000);
}

export const mockPersonas = [
  { id: 1, name: "Marcela Gutierrez", withdrawalAmount: 150000, arrivalDate: generarFechaLlegada() },
  { id: 2, name: "Felipe Arango", withdrawalAmount: 80000, arrivalDate: generarFechaLlegada() },
  { id: 3, name: "Natalia Correa", withdrawalAmount: 300000, arrivalDate: generarFechaLlegada() },
  { id: 4, name: "Ricardo Salazar", withdrawalAmount: 50000, arrivalDate: generarFechaLlegada() },
];
