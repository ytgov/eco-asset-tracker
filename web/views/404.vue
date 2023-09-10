<template>
  <v-main>
    <v-container>
      <v-container class="fill-height">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="8">
            <v-card
              class="pt-15"
              min-height="500px">
              <!-- <v-card
          v-if="isInitialized"
          class="elevation-12 text-center"> -->
              <!-- <v-toolbar
            dark
            color="primary"
            flat>
            <v-toolbar-title>SOMET Service Roster</v-toolbar-title>
          </v-toolbar> -->
              <v-card-text class="text-center">
                <v-container
                  class="fill-height"
                  fluid>
                  <v-img
                    :height="200"
                    :src="imageURL"></v-img>
                </v-container>
                <div class="text-h1 font-weight-black">404</div>

                <div class="pt-5 text-h4">PAGE NOT FOUND</div>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    @click="$router.go(-1)"
                    >Back</v-btn
                  >
                  <v-spacer />
                </v-card-actions>
                <!-- <v-btn :href="loginURL">Login</v-btn> -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-card> -->
      <!-- <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <v-btn
          color="primary"
          @click="$router.go(-1)"
          >Back</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="$router.push('/')"
          >Home</v-btn
        >
      </v-card> -->
    </v-container>
  </v-main>
</template>

<script>
import imageURL from "@/assets/images/404.png";
// import HelloWorld from "../components/HelloWorld";
// import mainNav from "@/components/nav/mainNav.vue";
export default {
  name: "PageNotFound",
  data() {
    return {
      imageURL: imageURL,
    };
  },
};
</script>
