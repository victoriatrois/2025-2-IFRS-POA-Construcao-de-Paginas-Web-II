export default {
  name: "ProductComponent",
  props: {
    product: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showDetails: false,
    };
  },
  template: `
    <div class="card mb-4">
      <header class="card-header">
        <slot name="header">
          <p class="card-header-title">Product Card</p>
        </slot>
      </header>

      <div class="card-content">
        <template v-if="product">
          <slot
            :product="product"
            :isAvailable="isProductAvailable"
            :showDetails="showDetails">

            <div class="content">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
            </div>
          </slot>

          <div v-if="showDetails" class="mt-3">
            <slot name="details" :product="product">
              <!-- Default details content -->
              <div class="content">
                <h4>Product Details</h4>
                <ul>
                  <li v-for="(value, key) in product" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </div>
            </slot>
          </div>

          <button
            @click="showDetails = !showDetails"
            class="button is-info mt-3">
            {{ showDetails ? 'Hide Details' : 'Show Details' }}
          </button>
        </template>

        <template v-else>
          <slot name="empty">
            <div class="content has-text-centered">
              <p>No product available</p>
            </div>
          </slot>
        </template>
      </div>
    </div>
  `,
  computed: {
    isProductAvailable() {
      return Math.random() > 0.5; // Simula disponibilidade
    },
  },
};
