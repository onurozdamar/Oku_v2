const months = [
  'Oca',
  'Şub',
  'Mar',
  'Nis',
  'May',
  'Haz',
  'Tem',
  'Ağu',
  'Eyl',
  'Eki',
  'Kas',
  'Ara',
];

export function formatDate(dateStr) {
  if (!dateStr) {
    return '-';
  }

  var date = new Date(dateStr);
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = months[date.getMonth()];
  var yyyy = date.getFullYear();

  var h = String(date.getHours()).padStart(2, '0');
  var m = String(date.getMinutes()).padStart(2, '0');

  return dd + ' ' + mm + ' ' + yyyy + ' ' + h + ':' + m;
}
