<script setup lang="ts">
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

const decodedText = ref("");

const onLoaded = () => {
  console.log("loaded");
};

const onDecode = (text: string) => {
  decodedText.value = text;
};
</script>

<template>
  <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
  <h2>The decoded value in QR/barcode is</h2>
  <h2>{{ decodedText }}</h2>

</template>

<style scoped>
a {
  color: #42b983;
}
.information {
  margin-top: 100px;
}
</style>
