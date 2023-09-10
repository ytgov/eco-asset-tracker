<template>
  <v-dialog v-model="show" @click:outside="close" >
    <p>Keys</p>
  </v-dialog>
</template>

<script>
export default {
  name: "KeysDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function() {
      this.$emit('close')
    }
  }

}
</script>