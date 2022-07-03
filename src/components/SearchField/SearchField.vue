<script>
import { PhX } from "phosphor-vue";
export default {
  components: {
    PhX,
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchTerm);
    },
    onClear() {
      this.searchTerm = "";
      this.onSearch();
    },
  },
};
</script>

<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Você pode pesquisar por: título, status etc"
      class="relative z-10 w-full px-4 py-3 mb-10 border rounded-full focus:outline-indigo-700"
      v-model="searchTerm"
      @keydown="onSearch"
    />
    <ph-x
      :size="24"
      class="absolute z-20 text-indigo-700 cursor-pointer top-3 right-4"
      v-if="searchTerm"
      @click="onClear"
    />
  </div>
</template>
