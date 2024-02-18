<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title title="Filters">
            <v-spacer></v-spacer>
            <v-select variant="underlined"> </v-select>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { roomPurposes, roomStatuses } from "&//data/models/eco-room";

defineProps({
  roomStatuses: {
    type: Array,
    default: () => [],
  },
  roomPurposes: {
    type: Array,
    default: () => [],
  },
});
</script>
