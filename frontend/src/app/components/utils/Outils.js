export function formatPhone(phoneNumber) {
  return phoneNumber.toString().replace(/\d{2}(?=.)/g, "$& ");
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatProfil(profil) {
  profil.firstName = capitalize(profil.firstName);
  profil.lastName = capitalize(profil.lastName);
  profil.picture = profil.picture.url;

  return profil;
}

export function normalizePhone(phoneNumber) {
  const number = phoneNumber.replaceAll(/^[.\s]$/g, "");
  return number;
}

export function showDate(string) {
  const array = string.split(" ");
  return array[0].toString();
}

export function showHours(string) {
  const array = string.split(" ");
  return array[1].toString();
}

export function formatHours(dateTimeString){
  const dateTimeParts = dateTimeString.split(' ')[1].split(':');
  const hours = dateTimeParts[0];
  const minutes = dateTimeParts[1];

  return `${hours}:${minutes}`;
}
