const crypto = require('crypto')

function toBuffer(hex) {
  return Buffer.from(hex, 'hex')
}
const iv = toBuffer('2c0faa70f727323e4ea400a7b4784a6d')

/** Recursively encrypts each word in a sentence while joining and encrypting them on the bubbled return. 
 * @param {string} sentence - The sentence to encrypt without punctuation.
 * @param {string} secret - A 32 byte hexidecimal key to be used for encryption.
*/
function encryptSentence(sentence, secret) {
  const words = sentence.split(' ')
  return encrypt(words, secret)
}

/** Returns the left side of an array
 * @param {Array} array - An array to take the left half of.
 */
function left(array) {
  return array.slice(0, Math.floor(array.length / 2))
}

/** Returns the right side of an array
 * @param {Array} array - An array to take the right half of.
 */
function right(array) {
  return array.slice(Math.floor(array.length / 2))
}

/** Recursively encrypts each word while joining and encrypting them on the bubbled return. 
 * @param {Array} arr - An array of words to be encrypted together.
 * @param {string} secret - A 32 byte hexidecimal key to be used for encryption.
*/
function encrypt(arr, secret) {
  if (arr.length === 1) {
    return encryptWord(arr[0], secret)
  }
  return encrypt([encrypt(left(arr), secret) + encrypt(right(arr), secret)], secret)
}

/** Encrypts a string using a 32 byte key using the Crypto library.
 * @param {string} word - The word to be encrypted.
 * @param {string} secret - A 32 byte hexidecimal key to be used for encryption.
 */
function encryptWord(word, secret) {
  const cipher = crypto.createCipheriv('aes-256-cbc', toBuffer(secret), iv);
  const encrypted = Buffer.concat([cipher.update(word), cipher.final()]);
  return encrypted.toString('hex')
}

module.exports = {
  encrypt,
  encryptWord,
  encryptSentence,
  left,
  right,
}