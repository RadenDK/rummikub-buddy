<template>
  <td
    :class="{
      'winner-cell': isWinner,
      'loser-cell': isLoser,
      'score-cell--empty': !isWinner && score === 0,
    }"
  >
    <span v-if="isWinner" class="winner-score">{{ winnerScore }}</span>
    <input
      v-else
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      class="score-input"
      placeholder="-"
      :value="inputDisplayValue"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter.prevent="onEnter"
    >
  </td>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Number, required: true },
  isWinner: { type: Boolean, default: false },
  isLoser: { type: Boolean, default: false },
  winnerScore: { type: Number, default: 0 },
  editable: { type: Boolean, default: true },
})

const emit = defineEmits(['update:score'])

const inputDisplayValue = computed(() => {
  if (props.score === 0) return ''
  return props.score
})

function onFocus(event) {
  event.target.select()
}

function onBlur(event) {
  const rawValue = event.target.value.trim()
  const numericValue = parseInt(rawValue, 10)

  if (isNaN(numericValue) || numericValue === 0) {
    emit('update:score', 0)
  } else {
    // Always store as negative (losers)
    emit('update:score', -Math.abs(numericValue))
  }
}

function onEnter(event) {
  // Move focus to next .score-input element
  const allInputs = Array.from(document.querySelectorAll('.score-input'))
  const currentIndex = allInputs.indexOf(event.target)

  if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
    allInputs[currentIndex + 1].focus()
  } else {
    event.target.blur()
  }
}
</script>
