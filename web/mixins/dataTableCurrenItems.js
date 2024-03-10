import { toRaw } from "vue";
export const filterData = {
  data() {
    return {
      filteredItems: [],
    };
  },
  computed: {},
  methods: {
    currentItems(value) {
      this.filteredItems = value.map((element) => {
        return toRaw(element.raw);
      });
    },
  },
};
