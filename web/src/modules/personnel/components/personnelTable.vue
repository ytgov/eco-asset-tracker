<template>
 <v-data-table
    :items="localItems"
    :search="search"
    :headers="localHeaders"
    @click:row="rowClick"
    class="row-clickable"
    :loading="isLoading"
  ></v-data-table>

</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
export default {
  name: "PersonnelTable",
  props: {
    search: {
      type: String,
      default: ""
    },

    all: {
      type: Boolean,
      default: true
    },
    items: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    isLoading: false,
    editUser: null
  }),

  computed: {
    localHeaders: function () {
      if (this.headers.length > 0)  {
        return this.headers
      }else{
        return [
              { text: 'Name', value: 'display_name' },
              { text: 'Email', value: 'email' },
              { text: 'Title', value: 'title' },
            ];
      }
    },
    localItems: function () {
      if (this.items) {
        return this.items
      }else {
        return this.employees
      };
    },
    ...mapState("personnel", ["employees"]),
  },
  methods: {
    saveComplete(resp) {
      this.$refs.notifier.showAPIMessages(resp.data);
      this.loadUserList();
    },
    rowClick(item) {
      //set current employee to the item...

      //then go to the employee details page
      this.$router.push("/personnel/" + item.ynet_id);
      // this.$refs.userEditor.show(_.clone(item));
    }
  },
}
</script>

<style>

</style>