<template>
  <v-container>
    <div
      v-if="!currentAsset.person"
      class="text-subtitle-1 font-italic my-10 ml-15 font-weight-light"
    >
      No people are assigned to this asset.
    </div>

    <v-card-text v-else-if="!editPerson">
      <v-row>
        <v-col>
          <div class="text-h6" @click="goToPersonnel()">
            {{ person.display_name }}
          </div>

          <div class="text-body-1">
            {{ person.title }}
          </div>
          <div class="text-body-2">
            {{ person.department }}
          </div>
        </v-col>
        <v-col>
          <v-btn
            v-if="edit"
            color="primary"
            outlined
            @click="editPerson = !editPerson"
          >
            Edit
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <asset-person-autocomplete v-if="editPerson" @change="unhidePersonDetails">
    </asset-person-autocomplete>

    <!-- <v-icon color="primary" class="pl-5">mdi-plus</v-icon> -->
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import assetPersonAutocomplete from "./assetPersonAutocomplete.vue";
export default {
  name: "assetPersonAssignmentWidget",
  components: {
    assetPersonAutocomplete,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editPerson: false,
  }),

  computed: {
    ...mapGetters("personnel", ["getEmployeeDetails"]),
    ...mapState("assets", ["currentAsset"]),
    personnelLink: function() {
      return `/personnel/${this.currentAsset.person}`;
    },
    person() {
      return this.getEmployeeDetails(
        this.$store.state.assets.currentAsset.person
      );
    },
  },
  methods: {
    goToPersonnel: function() {
      this.$router.push(this.personnelLink);
    },
    unhidePersonDetails: function() {
      this.editPerson = false;
    },
  },
};
</script>

<style></style>
