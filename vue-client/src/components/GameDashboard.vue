<template>
  <div class="dashboard-container">
    <h1 class="app-title">Rummikub Buddy</h1>

    <div class="players-container">
      <table id="score-table">
        <thead>
          <tr id="player-row">
            <th id="static-header">#</th>
            <PlayerHeader
              v-for="(player, index) in state.players"
              :key="index"
              :player="player"
              :can-edit="true"
              :can-remove="!player.isMain && !gameStarted && state.players.length > 2"
              @update:name="(name) => updatePlayerName(index, name)"
              @remove="removePlayer(index)"
            />
            <th v-if="!gameStarted && canAddPlayer" class="add-player-col">
              <button
                id="add-player-btn"
                @click="addPlayer()"
              >+</button>
            </th>
          </tr>
        </thead>
        <tbody id="rounds-body">
          <ScoreRow
            v-for="(round, roundIndex) in state.rounds"
            :key="roundIndex"
            :round="round"
            :round-number="roundIndex + 1"
            :result="roundResults[roundIndex]"
            :is-active="roundIndex === state.rounds.length - 1 && !readyForNewRound"
            :extra-column="!gameStarted && canAddPlayer"
            @update:score="(playerIndex, val) => updateScore(roundIndex, playerIndex, val)"
          />
        </tbody>
        <tfoot>
          <tr id="totals-row">
            <th>Total</th>
            <td v-for="(total, index) in columnTotals" :key="index">{{ total }}</td>
            <td v-if="!gameStarted && canAddPlayer" class="add-player-col"></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Add Round Button -->
    <button
      id="add-round-btn"
      class="add-btn"
      :class="{ disabled: !readyForNewRound }"
      :disabled="!readyForNewRound"
      @click="addRound"
    >+ Ny runde</button>

    <!-- New Game Button -->
    <button
      id="new-game-btn"
      class="add-btn"
      @click="onNewGame"
    >Nyt spil</button>
  </div>
</template>

<script setup>
import PlayerHeader from './PlayerHeader.vue'
import ScoreRow from './ScoreRow.vue'
import { useGameState } from '../composables/useGameState.js'
import { useScoreCalculation } from '../composables/useScoreCalculation.js'

const {
  state,
  gameStarted,
  canAddPlayer,
  addPlayer,
  removePlayer,
  updatePlayerName,
  addRound,
  updateScore,
  startNewGame,
} = useGameState()

const { roundResults, columnTotals, readyForNewRound } = useScoreCalculation(state)

function onNewGame() {
  if (confirm('Are you sure you want to start a new game? This will clear all current progress.')) {
    startNewGame()
  }
}
</script>
