export function format(date: Date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
}
