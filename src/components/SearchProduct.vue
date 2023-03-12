<template>
  <div class="search-inputs">
    <form>
      <input
        v-model="search"
        type="text"
        name="search"
        :placeholder="placeholder"
        @input="searchProducts"
      />
      <div class="buttons d-flex justify-content-between">
        <button @click.prevent="searchByTitle">Search By Title</button>
        <button @click.prevent="searchByCategory">Search By Category</button>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "SearchProduct",
  props: {
    products: {
      type: Array,
    },
    allProducts: {
      type: Array,
    },
  },
  data() {
    return {
      productResults: [],
      search: "",
      isSearchByTitle: false,
      isSearchByCategory: false,
      placeholder: "Search",
    };
  },
  methods: {
    searchByTitle() {
      this.isSearchByCategory = false;
      this.isSearchByTitle = true;
      this.placeholder = "Search By Title";
    },
    searchByCategory() {
      this.isSearchByTitle = false;
      this.isSearchByCategory = true;
      this.placeholder = "Search By Category";
    },
    searchProducts() {
      if (this.isSearchByTitle) {
        this.productResults = this.allProducts.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
        this.$emit("searchByTitle", this.productResults);
      } else if (this.isSearchByCategory) {
        this.productResults = this.allProducts.filter((product) => {
          return product.category
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
        this.$emit("searchByCategory", this.productResults);
      } else if (this.search === "") {
        this.$emit("allProduct");
      }
    },
  },
};
</script>
