<template>
  <v-app-bar
    app
    color="#fff"
    flat
    height="70"
    style="left: 0; border-bottom: 3px #f3b228 solid">
    <img
      :src="yukonSVG"
      style="margin: -8px 85px 0 15px"
      height="44" />

    <v-toolbar-title style="font-weight: 700">{{
      applicationName
    }}</v-toolbar-title>

    <template v-slot:append>
      <v-btn
        color="primary"
        variant="text"
        class="mr-1"
        to="/dashboard"
        ><v-icon size="x-large">mdi-home</v-icon></v-btn
      >
      <v-divider
        class="ma-5"
        vertical
        inset></v-divider>
      <!-- <v-btn
        @click="login"
        color="primary">
        Sign In
      </v-btn> -->
      <span>{{ fromStore }}Jane Smith</span>
      <div class="pl-2">
        <v-btn
          color="primary"
          variant="icon"
          icon="mdi-dots-vertical">
        </v-btn>

        <v-menu activator="parent">
          <v-card>
            <v-list
              density="compact"
              style="min-width: 200px">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.path == '#' ? '' : item.path">
                <v-list-item-title class="">
                  {{ item.title }}
                </v-list-item-title>
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
              </v-list-item>

              <!-- <call-menu></call-menu> -->
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
  <!-- <navDrawer
    :drawer="drawer"
    @update:modelValue="(value) => (drawer = value)">
  </navDrawer> -->
  <!-- <v-navigation-drawer
    temporary
    v-model="drawer">
  </v-navigation-drawer> -->
</template>

<script>
import { applicationName } from "@/config";
import { mapState, mapActions } from "vuex";
import yukonSVG from "@/assets/yukon.svg";
// import { useAuthStore } from "@/stores/AuthStore";
import { LOGIN_URL, LOGOUT_URL } from "@/urls";
// import navDrawer from "./navDrawer.vue";
// import callMenu from "./callMenu.vue";

// import goLocalButton from "../goLocalButton"

export default {
  name: "navAppBar",
  components: {
    // navDrawer,
    // callMenu,
    // goLocalButton
  },

  props: {},
  data: () => ({
    applicationName: applicationName,
    yukonSVG: yukonSVG,
    drawer: false,
    loginURL: LOGIN_URL,
    inter: "",
    items: [
      { title: "Rooms", icon: "mdi-domain", path: "/rooms" },
      { title: "Assets", icon: "mdi-clipboard-list-outline", path: "/assets" },
      { title: "Personnel", icon: "mdi-account-multiple", path: "/personnel" },
      { title: "Keys", icon: "mdi-key-outline", path: "/keys" },
      { title: "Logout", icon: "mdi-forum", path: "/logout" },
    ],
  }),
  // watch: {
  //   drawer: function(){
  //     this.$emit('update:drawer', this.drawer)
  //   },

  // },
  computed: {
    ...mapState(["fromStore"]),
    // ...mapState(useAuthStore, ["user"]),
  },
  methods: {},
  mounted() {},
};
</script>
web/urls
