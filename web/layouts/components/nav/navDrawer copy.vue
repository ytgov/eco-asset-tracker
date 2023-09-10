<template>
  <v-navigation-drawer
    temporary
    :model-value="drawer">
    <v-list class="pt-7">
      <!--  :to="item.path == '#' ? '' : item.path" -->
      <v-list-item
        :to="item.path == '#' ? '' : item.path"
        v-for="item in nav"
        :key="item.title"
        link>
        <template v-slot:prepend>
          <v-icon class="pl-3">{{ item.icon }}</v-icon>
        </template>

        <v-list-item-title v-text="item.title"> </v-list-item-title>
      </v-list-item>
    </v-list>

    <call-menu></call-menu>
    <template #append>
      <div class="pa-2">
        <v-btn
          block
          :href="logoutURL">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapActions } from "pinia";
import { LOGOUT_URL } from "@/urls";
import callMenu from "@/modules/paging/components/nav/callMenu.vue";
export default {
  name: "navDrawer",
  components: {
    callMenu,
  },
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    logoutURL: LOGOUT_URL,
    mini: true,
    nav: [
      {
        icon: "mdi-bookshelf",
        title: "My Status",
        path: "/my-status",
      },
      {
        icon: "mdi-view-dashboard",
        title: "Roster",
        path: "/status",
      },

      // {
      //  icon: 'mdi-library-books',
      //  title: 'Preplan',
      //  path: '/preplan'
      //},

      // {
      //   icon: 'mdi-check-box-multiple-outline',
      //   title: 'Login',
      //   path: '/login'

      // }
    ],
    adminLinks: [
      {
        icon: "mdi-view-dashboard",
        title: "Admin",
        path: "/status",
      },
      // {
      //  icon: 'mdi-library-books',
      //  title: 'Preplan',
      //  path: '/preplan'
      //},
      {
        icon: "mdi-bookshelf",
        title: "My Status",
        path: "/my-status",
      },
      {
        icon: "mdi-check-box-multiple",
        title: "Todos",
        path: "/todos",
      },
    ],
  }),
  // watch: {
  //   drawer: function(){
  //     this.$emit('update:drawer', this.drawer)
  //   }
  // },
  computed: {},
  methods: {
    // ...mapActions("auth", ["logout"]),
  },
};
</script>
web/urls
