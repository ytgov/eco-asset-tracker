<template>
  <v-container fluid>
    <BaseCard showHeader="true">
      <template v-slot:left>
        <data-table-search-bar v-model="search"> </data-table-search-bar>
      </template>

      <v-card>
        <v-card-title>
          <v-tabs
            mandatory
            v-model="activeTab">
            <v-tab
              v-for="(page, i) in activePages"
              :value="i"
              :key="page.index"
              @click="step = i">
              {{ page.title }}
            </v-tab>
          </v-tabs>
        </v-card-title>
        <v-row>
          <v-col cols="10">
            <v-card-text>
              <v-window
                class="mt-5"
                v-model="step">
                <v-window-item
                  v-for="(page, i) in activePages"
                  :key="i"
                  :value="i">
                  <component
                    all
                    :search="search"
                    :is="page.component" />
                </v-window-item>
              </v-window>
            </v-card-text>

            <!-- <floorplan-eco> </floorplan-eco> -->
          </v-col>
          <v-col>
            <add-room-btn
              v-if="activeTab == tabs['rooms'] && isEditor"></add-room-btn>
            <add-asset-btn
              v-if="activeTab == tabs['assets'] && isEditor"></add-asset-btn>
            <add-key-btn
              v-if="activeTab == tabs['keys'] && isEditor"></add-key-btn>
            <create-user-btn
              v-if="
                activeTab == tabs['personnel'] && isEditor
              "></create-user-btn>
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
import createUserBtn from "@/modules/personnel/components/createUserBtn.vue";
import { mapGetters } from "vuex";
// import FloorplanEco from "@/modules/rooms/components/floorplan/floorplanECO.vue";

export default {
  setup() {
    //define pages in steup() to avoid reactivity warning
    const pages = [
      { title: "Rooms", component: RoomTable, active: true },
      { title: "Assets", component: AssetsGrid, active: true },
      { title: "Keys", component: KeysTable, active: true },
      { title: "Personnel", component: PersonnelTable, active: true },
    ];
    return {
      pages,
    };
  },
  name: "DashboardView",
  components: {
    RoomTable,
    AssetsGrid,
    PersonnelTable,
    KeysTable,
    AddRoomBtn,
    AddAssetBtn,
    AddKeyBtn,
    createUserBtn,
    //FloorplanEco
  },
  data: () => ({
    search: "",
    drawer: null,
    searchResults: [],
    loading: false,
    searchTerm: null,
    activeTab: 0,
    tabs: {
      rooms: 0,
      assets: 1,
      keys: 2,
      personnel: 3,
    },
    step: 0,
  }),
  computed: {
    ...mapGetters("administration/users", ["isEditor"]),

    activePages() {
      return this.pages.filter((page) => page.active === true);
    },
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
