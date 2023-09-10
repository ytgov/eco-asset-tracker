<template>
  <v-app-bar
    flat
    class="pt-5"
    style="background-color: #efefef">
    <v-app-bar-title class="pl-2">
      <div>
        {{ title }}
      </div>
      <v-breadcrumbs
        color="anchor"
        :items="breadcrumbs"
        class="ma-0 pa-2 text-body-2">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>
    </v-app-bar-title>
  </v-app-bar>

  <!-- <v-row class="page-breadcrumb">
    <v-col
      cols="12"
      class="pa-0">
      <v-card
        flat
        border="false"
        class="px-2 custom-shadow"
        style="background-color: #efefef">
        <div
          class="mt-9"
          style="float: right">
          <slot name="right"> </slot>
        </div>
        <v-card-title
          dense
          flat
          class="transparent pa-0 pt-3"
          height="40px">
          <slot name="title"> {{ title }} </slot>
        </v-card-title>

        <v-toolbar
          dense
          flat
          class="transparent pa-0"
          height="40px">
          <v-toolbar-title class="pt-3">
            <span class="text--primary">{{ title }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-toolbar
          class="toobar-extension transparent pb-3"
          slot="extension">
          <v-breadcrumbs
            :items="breadcrumbs"
            divider=">"
            class="pa-0">
          </v-breadcrumbs>

          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row> -->
</template>
<script>
export default {
  name: "BaseBreadcrumb",
  props: {
    title: String,
    breadcrumbs: Array,
    icon: String,
  },
  data: () => ({}),
};
</script>
<style>
.row.page-breadcrumb {
  margin: -24px -50px 25px -50px;
}
</style>
