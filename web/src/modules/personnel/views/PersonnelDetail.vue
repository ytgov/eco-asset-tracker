<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    >
      <template v-slot:right>
        <!-- <timed-message ref="messager" class="mr-4"></timed-message> -->
      </template>
    </BaseBreadcrumb>

    <!-- <admin-sidebar></admin-sidebar> -->

    <BaseCard class="default">
      <v-row>
        <v-col>
          <v-progress-circular
            v-if="loading"
            :indeterminate="loading"
            color="primary"
            height="5"
          />

          <v-card v-show="!loading">
            <v-card-text>
              <div class="text-h6">
                {{ employee.display_name }}
              </div>

              <div class="text-body-1">
                {{ employee.title }}
              </div>
              <div class="text-body-2">
                {{ employee.department }}
              </div>
              <div>
                <a :href="employeeEmailLink">{{ employee.email }}</a>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <!-- Assigned Assets -->
          <v-row> </v-row>
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
                <v-card-text>
                  <v-row
                    v-for="(room, index) in employee.assignedRooms"
                    :key="index"
                  >
                    <v-col>
                      <span class="text-subtitle-1 ml-5">
                        <router-link :to="roomLink(room.room_id)" exact>
                          {{ room.name }} - {{ room.purpose }}
                        </router-link></span
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Assets Assigned
            </v-card-title>

            <assets-grid :items="employee.assets" :loading="loading">
            </assets-grid>
          </v-card>
          <!-- <assets-grid :all="true" ></assets-grid> -->
        </v-col>
      </v-row>
    </BaseCard>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import assetsGrid from "@/modules/assets/components/assetsGrid.vue";

export default {
  components: { assetsGrid },
  name: "PersonnelDetail",
  data: () => ({
    loading: true,
    page: { title: "Personnel Detail" },
  }),
  computed: {
    breadcrumbs: function() {
      return [
        { text: "Home", to: "/dashboard", exact: true },
        { text: "Personnel", to: "/personnel", exact: true },
        { text: this.employee.display_name, disabled: true },
      ];
    },
    ...mapState("personnel", ["employee"]),

    personnelID: function() {
      return this.$route.params.personnelID;
    },
    employeeEmailLink: function() {
      return "mailto:" + this.employee.email;
    },
  },
  methods: {
    ...mapActions("personnel", [
      "getAll",
      "loadEmployee",
      "getAssignedRooms",
      "getEmployeeAssets",
    ]),
    roomLink: function(roomID) {
      return "/rooms/" + roomID;
    },
  },
  async mounted() {
    this.loading = true;
    await this.loadEmployee(this.personnelID);
    await this.getAssignedRooms(this.personnelID);
    await this.getEmployeeAssets(this.personnelID);

    this.loading = false;
  },
};
</script>

<style></style>
