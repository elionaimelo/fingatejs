<script>
import HeaderGlobal from "../components/HeaderGlobal/HeaderGlobal.vue";
import SearchField from "../components/SearchField/SearchField.vue";
import TableData from "../components/TableData/TableData.vue";
import SortBy from "../components/SortyBy/SortBy.vue";
import transactions from "../services/transactions";
import SpinerLoading from "../components/SpinerLoading/SpinerLoading.vue";
import ModalContent from "../components/ModalContent/ModalContent.vue";

export default {
  components: {
    HeaderGlobal,
    SearchField,
    TableData,
    SortBy,
    SpinerLoading,
    ModalContent,
  },
  data() {
    return {
      fields: [
        {
          name: "date",
          label: "Data",
        },
        {
          name: "title",
          label: "Título",
        },
        {
          name: "description",
          label: "Descrição",
        },
        {
          name: "status",
          label: "Status",
        },
        {
          name: "value",
          label: "Valor",
        },
        {
          name: "actions",
          label: "Ações",
        },
      ],
      data: [],
      isLoading: false,
      dates: [
        {
          label: "Todas",
          value: "",
        },
      ],
      search: "",
      pageSize: 10,
      currentPage: 1,
      options: [
        {
          value: "latest",
          label: "Mais recente",
        },
        {
          value: "old",
          label: "Mais antigo",
        },
      ],
      sortBy: "latest",
      sortDate: "",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredData() {
      return this.data
        .filter((item) => {
          return (
            item.title.toLowerCase().includes(this.search.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            item.status.toLowerCase().includes(this.search.toLowerCase())
          );
        })
        .filter((item) => {
          return item.date.includes(this.sortDate);
        })
        .sort((a, b) => {
          if (this.sortBy === "latest") {
            return this.data;
          } else {
            return new Date(a.date) - new Date(b.date);
          }
        })
        .filter((row, index) => {
          return (
            index >= (this.currentPage - 1) * this.pageSize &&
            index < this.currentPage * this.pageSize
          );
        });
    },
    totalPages() {
      return Math.ceil(this.data.length / this.pageSize);
    },
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      await transactions
        .getTransactions()
        .then((res) => {
          this.data = res
            .sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            })
            .reverse();
          this.dates = this.dates.concat(
            [...new Set(res.map((item) => item.date))].map((date) => {
              return {
                label: new Intl.DateTimeFormat("pt-BR").format(new Date(date)),
                value: date,
              };
            })
          );
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    handleValue(item) {
      this.isLoading = true;
      this.currentPage = 1;
      if (item.type === "search") {
        this.search = item.value;
      } else if (item.type === "sort") {
        this.sortBy = item.value;
      } else if (item.type === "date") {
        this.sortDate = item.value;
      }
      this.isLoading = false;
    },
    changePage(val) {
      let size = Math.ceil(this.data.length / this.pageSize);

      if (val === 0 || val > size) return;
      this.isLoading = true;
      this.currentPage = val;
      this.isLoading = false;
    },
    showModal(item) {
      this.$refs.modal.showModal(item);
    },
  },
};
</script>

<template>
  <HeaderGlobal />

  <ModalContent ref="modal" />

  <div
    class="max-w-screen-xl p-8 mx-auto bg-white border border-gray-200 shadow-inner shadow-gray-300 md:mb-24 mb-11 md:-mt-48 rounded-3xl"
  >
    <div class="w-full">
      <div class="px-4 py-4 md:px-10 md:py-7">
        <SearchField @search="handleValue" />
        <div class="items-center justify-between md:flex">
          <h2
            tabindex="0"
            class="mb-2 text-3xl font-bold leading-normal text-center text-gray-800 focus:outline-none md:mb-0 md:text-left"
          >
            Transações
          </h2>
        </div>
      </div>
      <div class="px-2 py-4 bg-white md:pb-7 md:pt-3 md:px-8">
        <div class="md:max-w-xl md:flex">
          <p class="flex items-center justify-center mr-3 md:justify-start">
            Filtros:
          </p>
          <SortBy @sort="handleValue" :options="dates" class="mr-2" />
          <SortBy @sort="handleValue" :options="options" />
        </div>
        <div class="overflow-x-auto mt-7">
          <SpinerLoading v-if="isLoading" />
          <TableData
            :fields="fields"
            :data="filteredData"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :totalPages="totalPages"
            @change-page="changePage"
            @view-item="showModal"
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>
