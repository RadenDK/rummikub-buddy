import { reactive, watch, computed } from 'vue'

const STORAGE_KEY = 'rummikubGameState'
const MAX_PLAYERS = 6
const MIN_PLAYERS = 2

const DEFAULT_PLAYERS = [
  { name: 'Player 1', isMain: true },
  { name: 'Player 2', isMain: false },
  { name: 'Player 3', isMain: false },
  { name: 'Player 4', isMain: false },
]

function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null
  try {
    const data = JSON.parse(saved)

    // Validate data structure
    if (!data || !Array.isArray(data.players) || !Array.isArray(data.rounds)) return null
    if (data.players.length < MIN_PLAYERS) return null

    // Validate that all rounds have the correct number of scores
    const playerCount = data.players.length
    for (const round of data.rounds) {
      if (!Array.isArray(round) || round.length !== playerCount) return null
    }

    return data
  } catch {
    return null
  }
}

function createDefaultState() {
  return {
    players: DEFAULT_PLAYERS.map(p => ({ ...p })),
    rounds: [new Array(DEFAULT_PLAYERS.length).fill(0)],
  }
}

const saved = loadFromLocalStorage()
const state = reactive(
  saved && saved.players && saved.players.length > 0
    ? { players: saved.players, rounds: saved.rounds || [] }
    : createDefaultState()
)

// Auto-save to localStorage on any change
watch(state, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    players: state.players,
    rounds: state.rounds,
    currentRound: state.rounds.length,
  }))
}, { deep: true })

export function useGameState() {
  const gameStarted = computed(() => state.rounds.length > 1)

  const canAddPlayer = computed(() =>
    state.players.length < MAX_PLAYERS && !gameStarted.value
  )

  function addPlayer(name = null, isMain = false) {
    if (state.players.length >= MAX_PLAYERS || gameStarted.value) return

    const playerName = name ?? `Player ${state.players.length + 1}`
    state.players.push({ name: playerName, isMain })

    // Add a 0 score for this player in every existing round
    for (const round of state.rounds) {
      round.push(0)
    }
  }

  function removePlayer(index) {
    if (gameStarted.value) return
    if (state.players[index]?.isMain) return
    if (state.players.length <= MIN_PLAYERS) return

    state.players.splice(index, 1)

    // Remove this player's score from every round
    for (const round of state.rounds) {
      round.splice(index, 1)
    }
  }

  function updatePlayerName(index, name) {
    if (state.players[index]) {
      state.players[index].name = name
    }
  }

  function addRound() {
    const scores = new Array(state.players.length).fill(0)
    state.rounds.push(scores)
  }

  function updateScore(roundIndex, playerIndex, value) {
    if (state.rounds[roundIndex] !== undefined) {
      state.rounds[roundIndex][playerIndex] = value
    }
  }

  function startNewGame() {
    state.players = DEFAULT_PLAYERS.map(p => ({ ...p }))
    state.rounds = [new Array(DEFAULT_PLAYERS.length).fill(0)]
  }

  return {
    state,
    gameStarted,
    canAddPlayer,
    addPlayer,
    removePlayer,
    updatePlayerName,
    addRound,
    updateScore,
    startNewGame,
  }
}
