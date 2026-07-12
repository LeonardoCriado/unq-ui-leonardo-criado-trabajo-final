const STORAGE_KEY = 'word-chain-leaderboard-v1'

export function loadLeaderboard() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLeaderboard(entries) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function createLeaderboardEntry(score, wordsCount) {
  return {
    id: `${Date.now()}-${score}`,
    score,
    wordsCount,
    date: new Date().toISOString(),
  }
}

export function mergeLeaderboard(entries, finalEntry) {
  return [finalEntry, ...entries]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score
      }

      return right.wordsCount - left.wordsCount
    })
    .slice(0, 10)
}
