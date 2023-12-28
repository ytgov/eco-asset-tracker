<template>
  <div>
    <v-card rounded="0">
      <v-card-title> Employees with Key: {{ currentKey.code }} </v-card-title>

      <v-card-text>
        <link-personnel-form></link-personnel-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import linkPersonnelForm from "./linkPersonnelForm.vue";
export default {
  name: "linkPersonnelCard",
  components: {
    linkPersonnelForm,
  },
  data: () => ({}),
  computed: {
    ...mapState("keys", ["currentKey"]),
    appbarColor: function () {
      return "yg_moss";
    },
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    save: function () {
      this.close(); //replace with link asset methed (then close)
    },
  },
};
</script>

<style></style>
