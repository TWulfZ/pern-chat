export function extractTime(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  // if 'Today' or 'Yesterday'
  let formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  if (date.toDateString() === new Date().toDateString()) {
    formatedDate = 'Hoy';
  } else if (date.toDateString() === new Date(Date.now() - 86400000).toDateString()) {
    formatedDate ='Ayer';
  }
  
  
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formatedDate} ${formattedHours}:${formattedMinutes} ${ampm}`;
}

