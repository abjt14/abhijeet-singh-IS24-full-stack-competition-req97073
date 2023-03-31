// replace all single quotes with double quotes in the developers field for zod to parse it correctly
export function processBody(data: any) {
  if(data.developers) {
    data.developers = JSON.parse(JSON.stringify(data.developers).replace(/'/g, '"'));
  }
  return data;
}

// get the current date in the format yyyy-mm-dd
export function getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// generate a random id for the product
export function generateID(name: string): string {
  const words = name.split(' ');
  const firstLetters = words.map(word => word.charAt(0).toUpperCase());
  const id = `P-${firstLetters.join('')}-${Math.floor(Math.random() * 9000) + 1000}`;

  return id;
}

// defines the parameters for the generateRandomDate function
interface GenerateRandomDateParams {
  start: Date;
  end: Date;
}
// generate a random date between the start and end dates
export function generateRandomDate({start, end}: GenerateRandomDateParams) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

// shuffle an array using the Fisher-Yates shuffle algorithm
export function ShuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}