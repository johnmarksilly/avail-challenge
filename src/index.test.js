const outputJson = require('../test/encrypted_sentence.json')
const { encrypt, encryptSentence, left, right, encryptWord } = require('./index');

const KEY = '60436e3f7db323b6be0874483cc2275b14bca67413d41bfe79b65aebdbfdb18b'

const EXPECTED_FIRST = '2e896d68f1e10ade78add4efebf051e8'
const EXPECTED_SECOND = '113d446d7e00018fd11ff4a8403eaf97'
const EXPECTED_JOIN = '2e896d68f1e10ade78add4efebf051e8113d446d7e00018fd11ff4a8403eaf97'
const EXPECTED_FINAL = '363a14fda595583d4bdf28c86539b433a5304327aa47750e3dcbe950b93bef13f3b86e9b4a918a8ca6e3f9661ba6ebce39f54ec8f226088b379df3a015e4a95347c4b86ba2a80727a6c230a1f2251b6f'

test('Verify left returns left items', () => {
  expect(left(['left', 'right'])).toStrictEqual(['left'])
  expect(left(['left', 'center', 'right'])).toStrictEqual(['left'])
})

test('Verify right returns right items', () => {
  expect(right(['left', 'right'])).toStrictEqual(['right'])
  expect(right(['left', 'center', 'right'])).toStrictEqual(['center', 'right'])
})

test('Verify encryption works correctly', () => {
  expect(encryptWord('this', KEY)).toStrictEqual(EXPECTED_FIRST)
})

test('Verify word order', () => {
  const words = ['this', 'is', 'a', 'sentence']
  const verifyFirstWord = [words[0]]
  expect(encrypt(verifyFirstWord, KEY)).toBe(EXPECTED_FIRST)

  const verifySecondWord = [words[1]]
  expect(encrypt(verifySecondWord, KEY)).toBe(EXPECTED_SECOND)

  const joined = [EXPECTED_FIRST, EXPECTED_SECOND].join('')
  expect(joined).toStrictEqual(EXPECTED_JOIN)

  expect(encrypt([EXPECTED_JOIN], KEY)).toStrictEqual(EXPECTED_FINAL)

  const verifyBothWords = Array.from(words.slice(0, 2))
  expect(verifyBothWords).toStrictEqual(['this', 'is'])
  expect(encrypt(verifyBothWords, KEY)).toStrictEqual(EXPECTED_FINAL)
})

test('Test encrypting a sentence', () => {
  expect(encryptSentence('this is', KEY)).toStrictEqual(EXPECTED_FINAL)
  expect(encryptSentence('The dog jumped over the fence too', KEY)).toStrictEqual(outputJson.output)
})