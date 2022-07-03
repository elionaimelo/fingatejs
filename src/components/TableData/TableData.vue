<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("change-page", page);
    },
    viewItem(item) {
      this.$emit("view-item", item);
    },
  },
};
</script>

<template>
  <div v-if="data.length">
    <table class="w-full whitespace-nowrap">
      <thead>
        <tr>
          <th
            class="px-4 py-2 font-semibold"
            v-for="field in fields"
            :key="field.name"
          >
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          tabindex="0"
          class="h-16 border border-gray-100 rounded focus:outline-none"
          v-for="(item, i) in data"
          :key="i"
        >
          <td>
            <div class="flex items-center pl-5">
              <p class="mr-2 text-base font-medium leading-none text-gray-700">
                {{
                  new Intl.DateTimeFormat("pt-BR").format(new Date(item.date))
                }}
              </p>
            </div>
          </td>
          <td class="">
            <div class="flex items-center pl-5">
              <p class="mr-2 text-base font-medium leading-none text-gray-700">
                {{ item.title }}
              </p>
            </div>
          </td>
          <td class="pl-5">
            <div class="flex items-center">{{ item.description }}</div>
          </td>
          <td class="pl-5">
            <div
              :class="`px-3 py-3 text-sm leading-none text-center ${
                item.status === 'processing'
                  ? 'text-red-700 bg-red-100'
                  : item.status === 'created'
                  ? 'text-green-700 bg-green-100'
                  : 'text-blue-700 bg-blue-100'
              }  rounded focus:outline-none`"
            >
              {{
                item.status === "processing"
                  ? "Processando"
                  : item.status === "created"
                  ? "Solicitada"
                  : "Pago"
              }}
            </div>
          </td>
          <td class="pl-5">
            <div class="flex items-center">
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.amount)
              }}
            </div>
          </td>
          <td class="pl-4">
            <button
              class="px-5 py-3 text-sm leading-none text-gray-600 bg-gray-100 rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 hover:bg-gray-200 focus:outline-none"
              @click="viewItem(item)"
            >
              Ver
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full my-5 md:w-auto">
      <button
        class="w-full px-4 py-2 mb-4 mr-3 text-sm leading-none text-gray-700 border border-gray-200 rounded-lg md:w-auto hover:bg-gray-200 focus:outline-none"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Anterior
      </button>
      <button
        class="w-full px-4 py-2 mb-4 mr-3 text-sm leading-none text-gray-700 border border-gray-200 rounded-lg md:w-auto hover:bg-gray-200 focus:outline-none"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages || data.length < pageSize"
      >
        Próximo
      </button>
    </div>
  </div>
  <div v-else>Nenhuma informação encontrada.</div>
</template>
