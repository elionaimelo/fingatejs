<script>
import { PhX, PhActivity } from "phosphor-vue";
export default {
  name: "ModalContent",
  components: {
    PhX,
    PhActivity,
  },
  data() {
    return {
      modalIsVisible: false,
      item: {},
      titleModal: "",
    };
  },
  methods: {
    closeModal() {
      this.modalIsVisible = false;
      document.body.classList.remove("modal-open");
    },
    showModal(item) {
      this.item = item;
      this.titleModal = item.title;
      this.modalIsVisible = true;
      document.body.classList.add("modal-open");
    },
  },
};
</script>

<template>
  <div
    class="fixed top-0 z-50 w-full h-full overflow-hidden bg-backdrop"
    v-if="modalIsVisible"
    @click="closeModal"
  >
    <div class="relative flex items-center justify-center w-full h-full">
      <div class="bg-white rounded-md md-lg p-7">
        <header class="relative flex flex-col justify-between">
          <h3 class="text-3xl font-semibold text-center text-indigo-800">
            {{ titleModal }}
          </h3>
          <hr class="my-4 border border-indigo-100" />
          <ph-x
            :size="24"
            class="absolute top-0 z-20 text-gray-700 cursor-pointer right-4"
            @click="closeModal"
          />
        </header>
        <div class="my-3">
          <p class="text-3xl font-semibold text-center text-gray-700">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.amount)
            }}
          </p>
          <p class="mb-6 text-center text-gray-500">
            {{ new Intl.DateTimeFormat("pt-BR").format(new Date(item.date)) }}
          </p>
          <div class="flex items-center mt-10">
            <ph-activity :size="32" class="text-indigo-800" />
            <div class="flex flex-col justify-center ml-6">
              <p class="text-sm text-gray-700">
                <span class="font-semibold">{{ item.from }}</span> para
                <span class="font-semibold">{{ item.to }}</span>
              </p>
              <p class="mt-1 text-gray-500">{{ item.description }}</p>
            </div>
          </div>

          <div class="w-full h-4 mt-10 bg-gray-200 rounded-full">
            <div
              class="h-4 bg-indigo-700 rounded-full"
              :style="`width: ${
                item.status === 'created'
                  ? '1%'
                  : item.status === 'processing'
                  ? '50%'
                  : '100%'
              }`"
            ></div>
          </div>
          <div class="flex justify-between">
            <div class="mb-1 text-sm">Solicitada</div>
            <div class="mb-1 text-sm">Processada</div>
            <div class="mb-1 text-sm">Concluída</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./styles.scss";
</style>
