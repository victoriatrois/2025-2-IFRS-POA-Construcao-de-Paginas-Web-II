export default {
  name: "my-image",
  props: {
    imageSource: {
      type: String,
      required: true,
    },
    alternativeText: {
      type: String,
      required: true,
      default: `Image without description`,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  template: `
  <div v-show="isVisible">
    <h2>Component my-image is loaded</h2>
    <p>{{ imageSource }} - {{ alternativeText }}</p>
    <button @click="maximiseImage">Maximise</button>
  </div>
  <button @click="showImage">Show</button>
  `,
  methods: {
    showImage() {
      this.isVisible = true;
      console.log("Image is visible.");
    },
    maximiseImage() {
      console.log("Maximising image.");
    },
  },
};
