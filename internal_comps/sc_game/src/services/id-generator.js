export function generateGuid(prefix, length) {
  let randomCharacters = length - prefix.length - 1;
  if (randomCharacters <= 0) {
    return prefix;
  }
  return prefix + '_' + _getRandomString(randomCharacters);
}

const LETTER_RUNES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

function _getRandomString(length) {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += LETTER_RUNES[Math.floor((Math.random() * LETTER_RUNES.length) + 1)];
  }
  return str;
}
