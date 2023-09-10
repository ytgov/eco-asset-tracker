<temnplate>
<v-container>
<v-row>
      <v-col cols="6">
        <v-toolbar dark :color="appbarColor">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-toolbar-title v-bind="attrs" v-on="on">
                {{ asset.assetNum }}
              </v-toolbar-title>
            </template>
            <span>ID: {{ asset._id }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <slot name="top-right-action">
            <v-icon v-if="isAdmin && readonly" dark @click="edit()">
              mdi-pencil
            </v-icon>
            <v-icon v-else-if="isAdmin && !readonly" dark @click="save()">
              mdi-content-save
            </v-icon>
          </slot>
        </v-toolbar>
        <v-card tile>
          <v-card-text>
            <asset-detail-form
              :edit="!readonly"
            ></asset-detail-form>
          </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn v-if="!readonly && isAdmin" dark color="yg_moss" @click="save()">
              Save
            </v-btn>
            <v-btn v-else dark color="primary" @click="close()">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbarOpen"> </v-snackbar>
  </v-container>
  </template>

    <script>
    export default {

    }
    </script>

    <style>

    </style>

