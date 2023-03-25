export function processBody(data: any) {
  if(data.developers) {
    data.developers = JSON.parse(data.developers.replace(/'/g, '"'));
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
