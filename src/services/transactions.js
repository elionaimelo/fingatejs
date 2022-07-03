import api from "./api";

export default {
  getTransactions: async () =>
    await api.get("transactions").then((res) => res.data),
};
