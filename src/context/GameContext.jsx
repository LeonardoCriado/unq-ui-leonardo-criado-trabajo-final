import {
  createContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { validateWord } from '../services/wordApi'
import {
  buildFeedback,
  getChainError,
  isRepeatedWord,
  normalizeWord,
  scoreWord,
} from '../game/wordRules'
import {
  createLeaderboardEntry,
  loadLeaderboard,
  mergeLeaderboard,
  saveLeaderboard,
} from '../game/leaderboard'

const TURN_SECONDS = 15

const GameContext = createContext(null)

const initialState = {
  status: 'idle',
  words: [],
  score: 0,
  remainingSeconds: TURN_SECONDS,
  inputValue: '',
  feedback: {
    type: 'info',
    text: 'Ingresá la primera palabra para comenzar.',
  },
  loading: false,
  leaderboard: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputValue: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_FEEDBACK':
      return {
        ...state,
        feedback: action.payload,
      }
    case 'START_ROUND':
      return {
        ...state,
        status: 'playing',
        remainingSeconds: TURN_SECONDS,
        feedback: buildFeedback('info', action.payload),
      }
    case 'ADD_WORD':
      return {
        ...state,
        status: 'playing',
        words: [...state.words, action.payload.word],
        score: state.score + action.payload.word.points,
        remainingSeconds: TURN_SECONDS,
        inputValue: '',
        loading: false,
        feedback: buildFeedback('success', action.payload.message),
      }
    case 'INVALID_WORD':
      return {
        ...state,
        loading: false,
        inputValue: '',
        feedback: buildFeedback('error', action.payload),
      }
    case 'TICK':
      return {
        ...state,
        remainingSeconds: Math.max(0, state.remainingSeconds - 1),
      }
    case 'GAME_OVER':
      return {
        ...state,
        status: 'game-over',
        loading: false,
        remainingSeconds: 0,
        feedback: buildFeedback('error', action.payload),
      }
    case 'SET_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.payload,
      }
    case 'RESET_GAME':
      return {
        ...initialState,
        leaderboard: state.leaderboard,
      }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    leaderboard: loadLeaderboard(),
  })
  const gameOverSavedRef = useRef(false)
  const latestStatusRef = useRef(initialState.status)
  const submissionIdRef = useRef(0)

  useEffect(() => {
    latestStatusRef.current = state.status
  }, [state.status])

  useEffect(() => {
    if (state.status !== 'playing') {
      return undefined
    }

    if (state.remainingSeconds === 0) {
      dispatch({
        type: 'GAME_OVER',
        payload: 'Se terminó el tiempo. La partida finalizó.',
      })

      return undefined
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [state.remainingSeconds, state.status])

  useEffect(() => {
    if (state.status !== 'game-over' || gameOverSavedRef.current) {
      if (state.status !== 'game-over') {
        gameOverSavedRef.current = false
      }

      return
    }

    const nextLeaderboard = mergeLeaderboard(
      state.leaderboard,
      createLeaderboardEntry(state.score, state.words.length),
    )

    gameOverSavedRef.current = true
    saveLeaderboard(nextLeaderboard)
    dispatch({ type: 'SET_LEADERBOARD', payload: nextLeaderboard })
  }, [state.leaderboard, state.score, state.status, state.words.length])

  async function submitWord(rawInput) {
    const trimmedInput = rawInput.trim()

    if (state.loading || latestStatusRef.current === 'game-over') {
      return
    }

    const submissionId = submissionIdRef.current + 1
    submissionIdRef.current = submissionId

    if (latestStatusRef.current === 'idle') {
      dispatch({
        type: 'START_ROUND',
        payload: 'La partida comenzó. Validando la primera palabra.',
      })
    }

    if (!trimmedInput) {
      dispatch({
        type: 'INVALID_WORD',
        payload: 'Ingresá una palabra para jugar.',
      })

      return
    }

    const normalizedWord = normalizeWord(trimmedInput)

    if (!normalizedWord) {
      dispatch({
        type: 'INVALID_WORD',
        payload: 'La palabra no puede contener símbolos o números.',
      })

      return
    }

    if (isRepeatedWord(state.words, normalizedWord)) {
      dispatch({
        type: 'INVALID_WORD',
        payload: 'Esa palabra ya fue utilizada.',
      })

      return
    }

    const previousWord = state.words.at(-1)
    const chainError = getChainError(previousWord, normalizedWord)

    if (chainError) {
      dispatch({
        type: 'INVALID_WORD',
        payload: chainError,
      })

      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_FEEDBACK', payload: buildFeedback('info', 'Validando palabra...') })

    try {
      const validation = await validateWord(trimmedInput.toLowerCase())

      if (
        submissionIdRef.current !== submissionId ||
        latestStatusRef.current === 'game-over'
      ) {
        return
      }

      if (!validation.exists) {
        dispatch({
          type: 'INVALID_WORD',
          payload: 'La palabra no existe en el diccionario.',
        })

        return
      }

      dispatch({
        type: 'ADD_WORD',
        payload: {
          word: {
            original: trimmedInput,
            normalized: normalizedWord,
            points: scoreWord(normalizedWord),
          },
          message: `${trimmedInput} suma ${scoreWord(normalizedWord)} puntos.`,
        },
      })
    } catch {
      if (
        submissionIdRef.current !== submissionId ||
        latestStatusRef.current === 'game-over'
      ) {
        return
      }

      dispatch({
        type: 'INVALID_WORD',
        payload: 'No se pudo validar la palabra. Reintentá en unos segundos.',
      })
    }
  }

  function resetGame() {
    gameOverSavedRef.current = false
    submissionIdRef.current += 1
    dispatch({ type: 'RESET_GAME' })
  }

  const value = {
    state,
    submitWord,
    resetGame,
    setInputValue: (value) => dispatch({ type: 'SET_INPUT', payload: value }),
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export { GameContext, TURN_SECONDS }
