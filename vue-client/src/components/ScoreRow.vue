<template>
  <tr :class="{ 'score-row--active': isActive }">
    <td>{{ roundNumber }}</td>
    <ScoreCell
      v-for="(score, playerIndex) in round"
      :key="playerIndex"
      :score="score"
      :is-winner="result.winnerIndex === playerIndex"
      :is-loser="score < 0"
      :winner-score="result.winnerScore"
      :editable="result.winnerIndex !== playerIndex"
      @update:score="(val) => $emit('update:score', playerIndex, val)"
    />
    <td v-if="extraColumn" class="add-player-col"></td>
  </tr>
</template>

<script setup>
import ScoreCell from './ScoreCell.vue'

defineProps({
  round: { type: Array, required: true },
  roundNumber: { type: Number, required: true },
  result: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
  extraColumn: { type: Boolean, default: false },
})

defineEmits(['update:score'])
</script>
