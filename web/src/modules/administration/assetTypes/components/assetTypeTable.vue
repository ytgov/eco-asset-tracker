<template>
  <v-container fluid>
    <v-simple-table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.index" class="text-center">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.index">
          <td class="text-right">{{ item.assetName }}</td>
          <td class="text-center">
            <v-icon>{{ isOffice(item) }}</v-icon>
          </td>
          <td class="text-center">
            <v-icon>{{ isPerson(item) }}</v-icon>
          </td>
          <td class="text-center">
            <v-icon>{{ isInfrastructure(item) }}</v-icon>
          </td>
        </tr>
      </tbody></v-simple-table
    >
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "assetTypeTable",
  data: () => ({
    headers: [
      {
        text: "Asset Name",
        value: "name",
      },
      {
        text: "Office",
        value: "office",
      },
      {
        text: "Person",
        value: "person",
      },
      {
        text: "Infrastructure",
        value: "infrastructure",
      },
    ],
    items: [
      { assetName: "Cellphone", types: ["person"] },
      { assetName: "Laptop", types: ["person", "office"] },
      { assetName: "Tablet", types: ["office"] },
    ],
  }),
  computed: {
    ...mapState("administration/assets", ["assetTypes"]),
  },
  methods: {
    isInfrastructure(assetType) {
      return this.pickIcon(assetType.types.includes("infrastructure"));
    },
    isPerson(assetType) {
      return this.pickIcon(assetType.types.includes("person"));
    },
    isOffice(assetType) {
      return this.pickIcon(assetType.types.includes("office"));
    },
    pickIcon(result) {
      if (result === true) {
        return "mdi-check";
      } else {
        return "";
      }
    },
  },
  async mounted() {
    if (this.assetTypes.length === 0) {
      console.warn("No asset types found");
    }
  },
};
</script>
