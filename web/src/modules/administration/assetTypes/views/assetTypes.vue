<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="5">
        <v-card class="default">
          <asset-type-table> </asset-type-table>
        </v-card>
      </v-col>
      <v-col>
        <add-asset-type-btn />
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
};
</script>
