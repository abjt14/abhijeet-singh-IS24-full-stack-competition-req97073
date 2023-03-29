export function processBody(data: any) {
  if(data.developers) {
    data.developers = JSON.parse(JSON.stringify(data.developers).replace(/'/g, '"'));
  }
  return data;
}

export function getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function generateID(name: string): string {
  const words = name.split(' ');
  const firstLetters = words.map(word => word.charAt(0).toUpperCase());
  const id = `P-${firstLetters.join('')}-${Math.floor(Math.random() * 9000) + 1000}`;

  return id;
}

interface GenerateRandomDateParams {
  start: Date;
  end: Date;
}
export function generateRandomDate({start, end}: GenerateRandomDateParams) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}