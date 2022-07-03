<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [
        {
          value: "",
          label: "",
        },
      ],
      required: true,
    },
  },
  data() {
    return {
      sortBy: this.options[0].value,
    };
  },
  methods: {
    checkIfDateValue(value) {
      return value.match(/^\d{4}-\d{2}-\d{2}$/);
    },
    onSort() {
      this.$emit("sort", {
        type:
          this.checkIfDateValue(this.sortBy) || this.sortBy === ""
            ? "date"
            : "sort",
        value: this.sortBy,
      });
    },
  },
};
</script>

<template>
  <div
    class="flex items-center w-full px-4 py-3 mb-6 text-sm font-medium leading-none text-gray-600 bg-gray-200 rounded cursor-pointer md:w-auto md:mb-0 hover:bg-gray-300"
  >
    <select
      aria-label="select"
      class="ml-1 bg-transparent focus:text-indigo-600 focus:outline-none"
      @change="onSort"
      v-model="sortBy"
    >
      <option
        class="text-sm text-indigo-800"
        v-for="(option, i) in options"
        :key="i"
        :value="option?.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
