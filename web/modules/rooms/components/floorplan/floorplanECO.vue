<template>
  <v-container>
    <v-row class="mx-1">
      <v-col cols="12">
        <v-row justify="center">
          <v-img
            usemap=""
            class="image"
            contain
            src="/ecoFloorPlan.png"
            max-width="800px"
            max-height="100%"
          >
            <router-link tag="a" to="/rooms/1143">
              <a
                style="position:absolute; top: 176px; left:154px; height:161px; width: 113px;"
              ></a>
            </router-link>
          </v-img>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "FloorplanEco"
};
</script>
