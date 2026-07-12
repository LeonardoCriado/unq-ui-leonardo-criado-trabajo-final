export function normalizeWord(word) {
  return word
    .trim()
    .toLowerCase()
    .replace(/ñ/g, '__enye__')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/__enye__/g, 'ñ')
    .replace(/[^a-zñ]/g, '')
}

export function getExpectedLetter(word) {
  return word.at(-1)?.toUpperCase() ?? null
}

export function buildFeedback(type, text) {
  return { type, text }
}

export function scoreWord(word) {
  return word.length
}

export function getChainError(previousWord, nextWord) {
  if (!previousWord) {
    return null
  }

  const expectedLetter = previousWord.normalized.at(-1)
  const nextLetter = nextWord.at(0)

  if (expectedLetter !== nextLetter) {
    return `La palabra debe comenzar con "${expectedLetter.toUpperCase()}".`
  }

  return null
}

export function isRepeatedWord(words, normalizedWord) {
  return words.some((entry) => entry.normalized === normalizedWord)
}
