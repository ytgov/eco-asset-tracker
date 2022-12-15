<template>
  <v-container fluid>
    <BaseCard showHeader="true">
      <template v-slot:left>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </template>

      <v-card>
        <v-row>
          <v-col cols="10">
            <v-tabs v-model="activeTab">
              <v-tab>Rooms</v-tab>
              <v-tab-item>
                <room-table :search="search"></room-table>
                <!-- <floorplan-eco> </floorplan-eco> -->
              </v-tab-item>
              <v-tab>Assets</v-tab>
              <v-tab-item>
                <assets-grid all :search="search"></assets-grid
              ></v-tab-item>
              <v-tab>Keys</v-tab>
              <v-tab-item>
                <keys-table all :search="search"></keys-table
              ></v-tab-item>
              <v-tab>Personnel</v-tab>
              <v-tab-item>
                <personnel-table all :search="search"></personnel-table
              ></v-tab-item>
            </v-tabs>
          </v-col>
          <v-col>
            <add-room-btn
              v-if="activeTab == tabs['rooms'] && isAdmin"
            ></add-room-btn>
            <add-asset-btn
              v-if="activeTab == tabs['assets'] && isAdmin"
            ></add-asset-btn>
            <add-key-btn
              v-if="activeTab == tabs['keys'] && isAdmin"
            ></add-key-btn>
          </v-col>
        </v-row>

        <notifications ref="notifier"></notifications>
      </v-card>
    </BaseCard>
  </v-container>
</template>

<script>
import RoomTable from "@/modules/rooms/components/roomTable.vue";
import AssetsGrid from "@/modules/assets/components/assetsGrid.vue";
import AddRoomBtn from "@/modules/rooms/components/addRoomBtn.vue";
import AddAssetBtn from "@/modules/assets/components/addAssetBtn.vue";
import AddKeyBtn from "@/modules/keys/components/addKeyBtn.vue";
import KeysTable from "@/modules/keys/components/keysTable.vue";
import PersonnelTable from "@/modules/personnel/components/personnelTable.vue";
import { mapGetters } from "vuex";
// import FloorplanEco from "@/modules/rooms/components/floorplan/floorplanECO.vue";

export default {
  name: "Dashboard",
  components: {
    RoomTable,
    AssetsGrid,
    PersonnelTable,
    KeysTable,
    AddRoomBtn,
    AddAssetBtn,
    AddKeyBtn,
    //FloorplanEco
  },
  data: () => ({
    search: "",
    drawer: null,
    searchResults: [],
    loading: false,
    searchTerm: null,
    activeTab: "",
    tabs: {
      rooms: 0,
      assets: 1,
      keys: 2,
      personnel: 3,
    },
  }),
  computed: {
    ...mapGetters("administration/users", ["isAdmin"]),
  },
  methods: {
    searchKeyUp(event) {
      if (event.key == "Enter") this.doSearch();
    },
    async doSearch() {
      let cleanSearch = this.search.trim().toLowerCase();
      if (cleanSearch.length == 0) return;

      // this.loading = true;
      this.drawer = true;
      // await this.employeeSearch({ term: cleanSearch })
      //   .then((resp) => {
      //     this.searchResults = resp.data.data;
      //     this.drawer = true;
      //     this.resultCount = resp.data.meta.item_count;
      //   })
      //   .catch((err) => {
      //     this.$emit("showError", err);
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
  },
};
</script>
