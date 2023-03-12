<template>
  <div class="creation-inputs">
    <form>
      <input
        v-model="form.title"
        class="title"
        type="text"
        name="title"
        placeholder="Title"
        required
      />
      <div class="inputs d-flex align-items-center gap-3">
        <input
          v-model="form.price"
          class=""
          type="number"
          name="price"
          placeholder="Price"
          required
          @input="calculTotal"
        />
        <input
          v-model="form.taxe"
          class=""
          type="number"
          name="taxes"
          placeholder="Taxes"
          required
          @input="calculTotal"
        />
        <input
          v-model="form.ads"
          class=""
          type="number"
          name="ads"
          placeholder="ADS"
          required
          @input="calculTotal"
        />
        <input
          v-model="form.discount"
          class=""
          type="number"
          name="discount"
          placeholder="Discount"
          @input="calculTotal"
        />
        <div
          class="tot"
          :class="{
            bg_red: form.total === 0,
            bg_green: form.total !== null && form.total !== 0,
            bg_violet: form.total === null,
          }"
        >
          <p>
            Total: <span class="fw-semibold">{{ form.total }}</span>
          </p>
        </div>
      </div>
      <input
        v-if="isCreate"
        v-model="quantity"
        type="number"
        name="quantity"
        placeholder="Quantity"
      />
      <input
        v-model="form.category"
        type="text"
        name="category"
        placeholder="Category"
      />
      <button v-if="isCreate" type="submit" @click="createProduct">
        Create
      </button>
      <button
        v-if="isUpdate"
        type="submit"
        @click="updateProduct(productToUpdate.id)"
      >
        Update
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useSwalSuccess } from "@/alert/alert.js";

const FROM_INITIAL_STATE = () => {
  return {
    title: "",
    price: null,
    taxe: null,
    ads: null,
    discount: null,
    total: null,
    category: "",
  };
};
export default {
  name: "CreateProduct",
  props: {
    isCreate: {
      type: Boolean,
    },
    isUpdate: {
      type: Boolean,
    },
    productToUpdate: {
      type: Object,
    },
  },
  data() {
    return {
      form: FROM_INITIAL_STATE(),
      quantity: null,
    };
  },
  watch: {
    productToUpdate() {
      if (this.isUpdate) {
        this.form.title = this.productToUpdate.title;
        this.form.price = this.productToUpdate.price;
        this.form.taxe = this.productToUpdate.taxe;
        this.form.ads = this.productToUpdate.ads;
        this.form.discount = this.productToUpdate.discount;
        this.form.category = this.productToUpdate.category;
        this.form.total = this.productToUpdate.total;
      }
    },
  },
  computed: {
    checkValidity() {
      return (
        this.form.title && this.form.price && this.form.ads && this.form.taxe
      );
    },
  },
  methods: {
    calculTotal() {
      if (this.form.price && this.form.taxe && this.form.ads) {
        if (this.form.discount) {
          this.form.total =
            this.form.price +
            this.form.taxe +
            this.form.ads -
            this.form.discount;
        } else {
          this.form.total = this.form.price + this.form.taxe + this.form.ads;
        }
      }
    },
    async createProduct() {
      if (!this.checkValidity) {
        return;
      }
      this.form.discount = this.form.discount ?? 0;
      let res;
      if (this.quantity) {
        for (let index = 0; index < this.quantity; index++) {
          res = await axios.post("http://localhost:3000/products", this.form);
        }
      } else {
        res = await axios.post("http://localhost:3000/products", this.form);
      }
      if (res.status === 201) {
        this.form = FROM_INITIAL_STATE();
        this.quantity = null;
        useSwalSuccess("object has been created successfully", "success");
        this.$emit("create");
      }
    },
    async updateProduct(id) {
      const res = await axios.put(
        `http://localhost:3000/products/${id}`,
        this.form
      );
      if (res.status === 200) {
        this.form = FROM_INITIAL_STATE();
        useSwalSuccess("object has been updated successfully", "success");
        this.$emit("update");
      }
    },
  },
};
</script>
