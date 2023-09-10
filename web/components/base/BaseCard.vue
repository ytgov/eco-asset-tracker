<template>
  <v-container fluid>
    <v-card class="mb-7">
      <v-toolbar
        class="pl-4 pr-4"
        flat
        v-if="showHeader">
        <slot
          width="100%"
          name="left" />

        <v-spacer></v-spacer>
        <slot
          width="100%"
          name="right" />
      </v-toolbar>
      <v-divider v-if="showHeader"></v-divider>
      <div class="pa-4">
        <slot />
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BaseCard",

  props: {
    heading: {
      type: String,
      default: "",
    },
    showHeader: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),

  methods: {},
};
</script>

<style scoped>
.v-card.basic {
  margin-left: -25px !important;
  margin-right: -25px !important;
  max-width: none !important;
}
.v-toolbar {
  background-color: #fff;
}
</style>
