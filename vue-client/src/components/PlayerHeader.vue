<template>
  <th>
    <div class="player-wrapper">
      <button v-if="canRemove" class="remove-btn" @click="$emit('remove')">-</button>
      <input
        type="text"
        class="player-name-input"
        :value="player.name"
        :disabled="!canEdit"
        @blur="onNameBlur"
        @keypress.enter.prevent="($event) => $event.target.blur()"
      >
    </div>
  </th>
</template>

<script setup>
const props = defineProps({
  player: { type: Object, required: true },
  canEdit: { type: Boolean, default: true },
  canRemove: { type: Boolean, default: false },
})

const emit = defineEmits(['update:name', 'remove'])

function onNameBlur(event) {
  if (!props.canEdit) {
    event.target.value = props.player.name
    return
  }
  emit('update:name', event.target.value)
}
</script>
