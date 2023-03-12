<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h2>CRUDS</h2>
      <p>CREATE READ UPDATE DELETE SEARCH</p>
    </div>
    <!-- Create -->
    <create-product
      :isCreate="isCreate"
      :isUpdate="isUpdate"
      :productToUpdate="productToUpdate"
      @create="getResults"
      @update="fetchNewResults"
    />
    <!-- Search -->
    <search-product
      :products="products"
      :allProducts="allProducts"
      @searchByTitle="updateData"
      @searchByCategory="updateData"
      @allProduct="getResults"
    />
    <!-- Delete -->
    <delete-product :products="products" @delete="getResults" />
    <!-- Product Results -->
    <product-results
      :products="products"
      @update="updateProduct"
      @delete="getResults"
    />
  </div>
</template>

<script>
import CreateProduct from "@/components/CreateProduct.vue";
import SearchProduct from "@/components/SearchProduct.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";
import ProductResults from "@/components/ProductResults.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    CreateProduct,
    SearchProduct,
    DeleteProduct,
    ProductResults,
  },
  data() {
    return {
      products: [],
      allProducts: [],
      productToUpdate: null,
      count: 0,
      isCreate: true,
      isUpdate: false,
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    async getResults() {
      await axios.get("http://localhost:3000/products").then((item) => {
        this.products = item.data;
        this.allProducts = item.data;
        this.count = this.products.length;
      });
    },
    updateData(allProducts) {
      this.products = allProducts;
    },
    updateProduct(product) {
      this.isUpdate = true;
      this.isCreate = false;
      this.productToUpdate = product;
    },
    fetchNewResults() {
      this.isUpdate = false;
      this.isCreate = true;
      this.getResults();
    },
  },
};
</script>
