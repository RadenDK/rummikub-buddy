import { computed } from 'vue'

export function useScoreCalculation(state) {
  /**
   * For each round, determine the winner index.
   * A winner is the single player with a 0 score while all others have negative scores.
   * Returns an array of { winnerIndex, winnerScore }.
   */
  const roundResults = computed(() => {
    return state.rounds.map(round => {
      let zeroIndex = -1
      let zeroCount = 0
      let negativeSum = 0
      let allOthersNegative = true

      for (let i = 0; i < round.length; i++) {
        const score = round[i]
        if (score === 0) {
          zeroCount++
          zeroIndex = i
        } else if (score < 0) {
          negativeSum += score
        } else {
          // Positive or unexpected value - no clear winner pattern
          allOthersNegative = false
        }
      }

      // Winner: exactly one zero and all others are negative
      if (zeroCount === 1 && allOthersNegative && negativeSum < 0) {
        return { winnerIndex: zeroIndex, winnerScore: Math.abs(negativeSum) }
      }

      return { winnerIndex: -1, winnerScore: 0 }
    })
  })

  /**
   * Column totals: sum of each player's scores across all rounds,
   * using the computed winner score where applicable.
   */
  const columnTotals = computed(() => {
    const totals = new Array(state.players.length).fill(0)

    state.rounds.forEach((round, roundIndex) => {
      const result = roundResults.value[roundIndex]

      for (let playerIndex = 0; playerIndex < round.length; playerIndex++) {
        if (playerIndex === result.winnerIndex && round[playerIndex] === 0) {
          totals[playerIndex] += result.winnerScore
        } else {
          totals[playerIndex] += round[playerIndex]
        }
      }
    })

    return totals
  })

  /**
   * Whether the last round is "complete" (all cells non-zero or has a winner),
   * meaning a new round can be added.
   */
  const readyForNewRound = computed(() => {
    if (state.rounds.length === 0) return true

    const lastRound = state.rounds[state.rounds.length - 1]
    const lastResult = roundResults.value[roundResults.value.length - 1]

    // If there's a winner, the round is complete
    if (lastResult.winnerIndex >= 0) return true

    // Otherwise check if all cells are non-zero
    return lastRound.every(score => score !== 0)
  })

  return {
    roundResults,
    columnTotals,
    readyForNewRound,
  }
}
