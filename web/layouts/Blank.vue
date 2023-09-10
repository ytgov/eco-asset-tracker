<template>
  <v-main>
    <v-card>
      <div>boop</div>
    </v-card>
    <activeCallAlert></activeCallAlert>
    <router-view />
  </v-main>
</template>

<script>
import activeCallAlert from "@/modules/paging/components/alerts/activeCallAlert.vue";
export default {
  name: "BlankLayout",
  components: {
    activeCallAlert,
  },
};
</script>
