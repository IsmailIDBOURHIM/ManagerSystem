<template>
  <div class="delete">
    <button class="delete-all" @click="deleteAll">
      Delete All <span>({{ products.length }})</span>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { useSwalSuccess } from "@/alert/alert.js";
import { useSwalToConfirmDeletion } from "@/alert/alert.js";

export default {
  name: "DeleteProduct",
  props: {
    products: {
      type: Array,
    },
  },
  methods: {
    deleteAll() {
      useSwalToConfirmDeletion(
        "Are you sure you want to remove all products ??",
        () => {
          this.deleteAllProducts();
        }
      );
    },
    async deleteAllProducts() {
      this.products.forEach(async (product) => {
        await axios
          .delete(`http://localhost:3000/products/${product.id}`)
          .then(() => {
            useSwalSuccess(
              "All products have been successfully deleted",
              "success"
            );
            this.$emit("delete");
          });
      });
    },
  },
};
</script>
