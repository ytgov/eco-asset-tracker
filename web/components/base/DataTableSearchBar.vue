<template>
  <v-text-field
    :model-value="search"
    append-icon="mdi-magnify"
    label="Search"
    variant="underlined"
    single-line
    clearable
    hide-details>
  </v-text-field>
</template>

<script setup>
defineProps(["search"]);
defineEmits(["update:search"]);
</script>
