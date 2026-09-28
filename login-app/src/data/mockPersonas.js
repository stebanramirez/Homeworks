export function generarFechaLlegada() {
  const ahora = new Date();
  const minutosAleatorios = Math.floor(Math.random() * 60);
  ahora.setMinutes(ahora.getMinutes() + minutosAleatorios);
  return ahora;
}

export const mockPersonas = [
  { id: 1, name: "Marcela Gutierrez", withdrawalAmount: 150000, arrivalDate: generarFechaLlegada() },
  { id: 2, name: "Felipe Arango", withdrawalAmount: 80000, arrivalDate: generarFechaLlegada() },
  { id: 3, name: "Natalia Correa", withdrawalAmount: 200000, arrivalDate: generarFechaLlegada() },
  { id: 4, name: "Ricardo Salazar", withdrawalAmount: 50000, arrivalDate: generarFechaLlegada() },
];
