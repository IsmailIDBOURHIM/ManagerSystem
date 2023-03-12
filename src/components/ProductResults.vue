<template>
  <div class="results">
    <table class="table table-dark table-hover text-center">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">TITLE</th>
          <th scope="col">PRICE</th>
          <th scope="col">TEXES</th>
          <th scope="col">ADS</th>
          <th scope="col">DISCOUNT</th>
          <th scope="col">TOTAL</th>
          <th scope="col">CATEGORY</th>
          <th scope="col">UPDATE</th>
          <th scope="col">DELETE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th>{{ index + 1 }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.taxe }}</td>
          <td>{{ product.ads }}</td>
          <td>{{ product.discount }}</td>
          <td>{{ product.total }}</td>
          <td>{{ product.category }}</td>
          <td>
            <button @click="updateProduct(product)">Update</button>
          </td>
          <td>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { useSwalSuccess } from "@/alert/alert.js";
import { useSwalToConfirmDeletion } from "@/alert/alert.js";

export default {
  name: "ProductResults",
  props: {
    products: {
      type: Array,
    },
  },
  methods: {
    updateProduct(product) {
      this.$emit("update", product);
    },
    deleteProduct(id) {
      useSwalToConfirmDeletion(
        "Are you sure you want to remove this products ??",
        () => {
          this.delete(id);
        }
      );
    },

    async delete(id) {
      await axios.delete(`http://localhost:3000/products/${id}`).then(() => {
        useSwalSuccess("Your product has been successfully deleted", "success");
        this.$emit("delete");
      });
    },
  },
};
</script>
