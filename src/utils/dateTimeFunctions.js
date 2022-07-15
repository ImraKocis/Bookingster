export const days = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];

export const formatTimeString = (date) =>
  `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`;

export const formatDateString = (date) =>
  `${days[date.getDay()].slice(0, 3)} ${date.getMonth() + 1}.${date.getFullYear()}.`;

export const formatForLongCardReservation = (date) =>
  `${days[date.getDay()].slice(0, 3)} ${date.getDate()}.${
    date.getMonth() + 1
  }. u ${formatTimeString(date)}`;
