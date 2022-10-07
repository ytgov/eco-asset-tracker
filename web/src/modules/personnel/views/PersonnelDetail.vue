<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Personnel Details
            {{personnelID}}
          </v-card-title>
          <v-card-text>
            <div>
              Some stuff about a person goes here
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <!-- Assigned Assets -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
              Assets Assigned
              </v-card-title>
            </v-card>
              <!-- <assets-grid :all="true" ></assets-grid> -->
          </v-col>
        </v-row>
        <!-- Assigned Keys -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
              Keys Assigned
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <!-- Assigned Rooms -->
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
              Rooms Assigned
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
export default {
  name: "PersonnelDetail",
  computed: {
    personnelID: function () {
      return this.$route.params.personnelID;
    }
  }
}
</script>

<style>

</style>