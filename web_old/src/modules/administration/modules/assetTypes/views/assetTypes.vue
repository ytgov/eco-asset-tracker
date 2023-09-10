<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="5">
        <v-card class="default">
          <v-card-title class="pb-0"> Asset Types </v-card-title>
          <asset-type-table> </asset-type-table>
        </v-card>
      </v-col>
      <v-col>
        <add-asset-type-btn @notify="doApiNotification" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AddAssetTypeBtn from "../components/addAssetTypeBtn.vue";
import AssetTypeTable from "../components/assetTypeTable.vue";
export default {
  name: "AssetTypes",
  components: {
    AssetTypeTable,
    AddAssetTypeBtn,
  },
  data: () => ({
    page: { title: "Asset Types" },
  }),
  methods: {
    doApiNotification: function(apiResult) {
      if (apiResult.status === 200) {
        console.log("Asset Type added");
      } else {
        console.log("Create Asset Type failed check the logs");
      }
    },
  },
};
</script>
