<template>

  <div id="scanner-container">
    <h1> Nutri-Fi Grade</h1>
    <div id="interactive" class="viewport"></div>

    <p v-if="code">Detected Code: {{ code }}</p>
    <div v-if="isProcessing">{{ processingTimeLeft }}</div>
    <div class="controls" v-else>
      <button @click="triggerFileInput">Pick from Gallery</button>
      <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" style="display: none" />
      <button @click="takePhoto">Take Photo</button>
    </div>

    <!-- {
    "observation": "The image shows a room setup with large windows and blue curtains. There is a visible air conditioning unit mounted on the wall. Several people are seated and appear to be engaging in a group activity or discussion, with a laptop visible in front of one person. The person in the foreground is wearing a patterned shirt and a lanyard, suggesting a formal or conference setting.",
    "novaClassification": "UNDEFINED",
    "nutriGrade": "UNDEFINED",
    "reasoning": "The description provided does not contain any references to food or food products. As such, it cannot be classified into any of the NOVA categories, which are specifically designed for categorizing foods and food products based on their processing levels. Similarly, there is no basis to evaluate a Nutri-Grade, which is used to assess the nutritional value of food and beverages. The description pertains to a room setting and group activity, with no mention or indication of any consumables. Therefore, both NOVA and Nutri-Grade classifications are not applicable."
} -->

    <div v-if="processingResult" style="margin-top: 2rem;">
      Observation:  {{ processingResult.observation }}
      <br/>
      <h3>Nova Classification:</h3>
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/NOVA_group_1.svg" v-if="processingResult.novaClassification === 1"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/NOVA_group_2.svg" v-else-if="processingResult.novaClassification === 2"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/NOVA_group_3.svg" v-else-if="processingResult.novaClassification === 3"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/NOVA_group_4.svg" v-else-if="processingResult.novaClassification === 4"/>
      <div v-else>Unknown</div>
      <h3>Nutri-score:</h3>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Nutri-score-A.svg" v-if="processingResult.nutriGrade === 'A'"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Nutri-score-B.svg" v-else-if="processingResult.nutriGrade === 'B'"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Nutri-score-C.svg" v-else-if="processingResult.nutriGrade === 'C'"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Nutri-score-D.svg" v-else-if="processingResult.nutriGrade === 'D'"/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Nutri-score-E.svg" v-else-if="processingResult.nutriGrade === 'E'"/>
      <div v-else>Unknown</div>
    </div>
  </div>
</template>

<script lang="ts">
import Quagga, { type QuaggaJSResultObject } from '@ericblade/quagga2' // ES6
import axios from 'axios'
import type { EAN13Product } from '@/models/EAN13Product'
const backendUrl = import.meta.env.VITE_APP_BACKEND_URL_EPIC as string
console.log('Backend URL:', backendUrl)
axios.defaults.baseURL = backendUrl
export default {
  data() {
    return {
      code: null as string | null,
      eanResult: undefined as EAN13Product | undefined,
      scanning: false,
      isProcessing: false,
      processingResult: null as any,
      estimateProcessingFinishTime: null as Date | null,
      processingTimeLeft: null as string | null,
      timer: undefined as number | undefined,
    }
  },
  mounted() {
    this.startScanner()
    this.timer = setInterval(() => {
      if (this.estimateProcessingFinishTime) {
        const diff = this.estimateProcessingFinishTime.getTime() - Date.now()
        if (diff > 0) {
          // show seconds and milliseconds
          this.processingTimeLeft = this.formatTime(diff)
        } else {
          this.processingTimeLeft = null
        }
      }
    }, 100)
  },
  unmounted() {
    Quagga.offDetected(this.onDetected)
    this.stopScanner()
    clearInterval(this.timer)
  },
  methods: {
    triggerFileInput() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },
    formatTime(diff: number) {
      const seconds = Math.floor(diff / 1000)
      const milliseconds = diff % 1000
      return `${seconds}s ${milliseconds}ms`
    },
    isValidEAN13(ean13: string): boolean {
      if (ean13.length !== 13 || !/^\d+$/.test(ean13)) {
        return false
      }

      let sum = 0
      for (let i = 0; i < 12; i++) {
        const digit = parseInt(ean13[i], 10)
        sum += i % 2 === 0 ? digit : digit * 3
      }

      const checkDigit = (10 - (sum % 10)) % 10
      const lastDigit = parseInt(ean13[12], 10)

      return checkDigit === lastDigit
    },
    startScanner() {
      console.log('Starting scanner')
      this.scanning = true

      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#interactive') as HTMLElement,
            constraints: {
              facingMode: 'environment',
              width: { ideal: 4096 },
              height: { ideal: 2160 },
            },
          },

          locate: true,
          numOfWorkers: Math.max(
            Math.floor(navigator.hardwareConcurrency * 0.7),
            2,
          ),
          decoder: {
            readers: ['ean_reader'],
          },
        },
        err => {
          if (err) {
            console.error(err)
            return
          }

          Quagga.start()
        },
      )

      Quagga.onDetected(this.onDetected)
      Quagga.onProcessed(this.onProcessed)
    },
    onProcessed(result: QuaggaJSResultObject) {
      const drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width') || '0'),
            parseInt(drawingCanvas.getAttribute('height') || '0'),
          )
          result.boxes
            .filter(function (box) {
              return box !== result.box
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2,
              })
            })
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2,
          })
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 },
          )
        }
      }
    },
    onEan13Detected(result: string) {
      //console.log('Detected EAN13:', result)
      this.eanResult = undefined
      axios
        .post(`/Analysis/Method1?ean13=${result}`)
        .then(response => {
          //console.log('Response:', response.data)
          this.eanResult = response.data
          this.processingResult = {
            observation: this.eanResult?.product?.product_name,
            novaClassification: this.eanResult?.product?.nova_group,
            nutriGrade: this.eanResult?.product?.nutriscore_grade,
          }
        })
        .catch(error => {
          // check if 404
          if (error.response?.status === 404) {
            this.processingResult = {
              observation: 'Product not found',
              novaClassification: 'UNDEFINED',
              nutriGrade: 'UNDEFINED',
            }
          }
          console.error('Error:', error)
        })
    },
    onDetected(result: QuaggaJSResultObject) {
      this.code = result.codeResult.code
      /**
       * curl -X 'POST' \
       *   'http://localhost:5128/Analysis/Method1?ean13=8992775913000' \
       *   -H 'accept: *
       **/
      if (this.code && this.isValidEAN13(this.code)) {
        this.onEan13Detected(this.code)
      }
    },
    stopScanner() {
      Quagga.stop()
      this.scanning = false
    },
    async takePhoto() {
      this.isProcessing = true;
      this.estimateProcessingFinishTime = new Date(Date.now() + 30000);
      const ogCanvas = Quagga.canvas.ctx.image.canvas;
      try {
        const dataURL = ogCanvas.toDataURL('image/png');
        const blob = await (await fetch(dataURL)).blob();
        await this.upload(blob, 'image.png');
      } catch (error) {
        console.error('Error capturing photo:', error);
      } finally {
        this.isProcessing = false;
        this.estimateProcessingFinishTime = null;
      }
    },
    async uploadImage(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;

      this.isProcessing = true;
      this.estimateProcessingFinishTime = new Date(Date.now() + 30000);

      try {
        await this.upload(file, file.name);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        this.isProcessing = false;
        this.estimateProcessingFinishTime = null;
      }
    },
    async upload(file: Blob, filename: string) {
      const formData = new FormData();
      formData.append('image', file, filename);

      try {
        const response = await axios.post(
          '/Analysis/Method3',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.log('Image uploaded successfully');
          console.log(response.data);
          // replace novaClassification from FOUR to 4, THREE to 3, etc.
          if (response.data.novaClassification) {
            if(response.data.novaClassification === 'FOUR') {
              response.data.novaClassification = 4;
            } else if(response.data.novaClassification === 'THREE') {
              response.data.novaClassification = 3;
            } else if(response.data.novaClassification === 'TWO') {
              response.data.novaClassification = 2;
            } else if(response.data.novaClassification === 'ONE') {
              response.data.novaClassification = 1;
            }
          }
          this.processingResult = response.data;
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,700|Cabin+Condensed:400,600');

body {
  background-color: #fff;
  margin: 0px;
  font-family: Ubuntu, sans-serif;
  color: #1e1e1e;
  font-weight: normal;
  padding-top: 0;
}

h1,
h2,
h3,
h4 {
  font-family: 'Cabin Condensed', sans-serif;
}

header {
  background: #ffc600;
  padding: 1em;
}

header .headline {
  max-width: 640px;
  margin: 0 auto;
}

header .headline h1 {
  color: #ffdd69;
  font-size: 3em;
  margin-bottom: 0;
}

header .headline h2 {
  margin-top: 0.2em;
}

footer {
  background: #0a4db7;
  color: #6c9ce8;
  padding: 1em 2em 2em;
}

#container {
  width: 640px;
  margin: 20px auto;
  padding: 10px;
}

#interactive.viewport {
  width: 640px;
  height: 480px;
}

#interactive.viewport canvas,
video {
  float: left;
  width: 640px;
  height: 480px;
}

#interactive.viewport canvas.drawingBuffer,
video.drawingBuffer {
  margin-left: -640px;
}

.controls fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.controls .input-group {
  float: left;
}

.controls .input-group input,
.controls .input-group button {
  display: block;
}

.controls .reader-config-group {
  float: right;
}

.controls .reader-config-group label {
  display: block;
}

.controls .reader-config-group label span {
  width: 9rem;
  display: inline-block;
  text-align: right;
}

.controls:after {
  content: '';
  display: block;
  clear: both;
}

#result_strip {
  margin: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

#result_strip > ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: auto;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

#result_strip > ul > li {
  display: inline-block;
  vertical-align: middle;
  width: 160px;
}

#result_strip > ul > li .thumbnail {
  padding: 5px;
  margin: 4px;
  border: 1px dashed #ccc;
}

#result_strip > ul > li .thumbnail img {
  max-width: 140px;
}

#result_strip > ul > li .thumbnail .caption {
  white-space: normal;
}

#result_strip > ul > li .thumbnail .caption h4 {
  text-align: center;
  word-wrap: break-word;
  height: 40px;
  margin: 0px;
}

#result_strip > ul:after {
  content: '';
  display: table;
  clear: both;
}

.scanner-overlay {
  display: none;
  width: 640px;
  height: 510px;
  position: absolute;
  padding: 20px;
  top: 50%;
  margin-top: -275px;
  left: 50%;
  margin-left: -340px;
  background-color: #fff;
  -moz-box-shadow: #333333 0px 4px 10px;
  -webkit-box-shadow: #333333 0px 4px 10px;
  box-shadow: #333333 0px 4px 10px;
}

.scanner-overlay > .header {
  position: relative;
  margin-bottom: 14px;
}

.scanner-overlay > .header h4,
.scanner-overlay > .header .close {
  line-height: 16px;
}

.scanner-overlay > .header h4 {
  margin: 0px;
  padding: 0px;
}

.scanner-overlay > .header .close {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 16px;
  width: 16px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}

i.icon-24-scan {
  width: 24px;
  height: 24px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzFFMjMzNTBFNjcwMTFFMkIzMERGOUMzMzEzM0E1QUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzFFMjMzNTFFNjcwMTFFMkIzMERGOUMzMzEzM0E1QUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMUUyMzM0RUU2NzAxMUUyQjMwREY5QzMzMTMzQTVBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMUUyMzM0RkU2NzAxMUUyQjMwREY5QzMzMTMzQTVBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtQr90wAAAUuSURBVHjanFVLbFRVGP7ua97T9DGPthbamAYYBNSMVbBpjCliWWGIEBMWsnDJxkh8RDeEDW5MDGticMmGBWnSlRSCwgLFNkqmmrRIqzjTznTazkxn5s7c6/efzm0G0Jhwkj/nP+d/nv91tIWFBTQaDQWapkGW67p4ltUub5qmAi0UCqF/a/U2m81tpmddotwwDGSz2dzi4uKSaOucnJycGhsbe1XXdQiIIcdxEAgEtgXq9brySHCht79UXi/8QheawN27d385fPjwuEl6XyKR6LdtW7t06RLK5TKOHj2K/fv3Q87Dw8OYn5/HiRMnMDs7i5mZGQwODiqlPp8PuVwO6XRaOXb16lXl1OnTp5FMJvtosF8M+MWLarWqGJaWlpBKpRRcu3YN4+PjmJ6exsTEhDJw5coVjI6OKgPhcBiZTAbxeBx+vx+XL19Gd3c3Tp48Ka9zqDYgBlTQxYNgMIhIJKLCILkQb+TZsgvdsiyFi+feWRR7oRNZyanQtvW2V4DEUUBiK2eJpeDirSyhCe7F2QPh8fiEp72i9PbsC5G52DbiKZA771yr1dTuGfJ4PQNPFoAyQNR1aNEmsS5eyB3PgjeooMZd2AWvNmzYci/Gea7TeFOcI93jV/K67noGmi4vdRI9gPSDeMLSdKUBZZczlWm1rTtHjLZ24d+WER2tc8N1m+Y+ID74wx0zGYvhg9UNrJdtHJyZRdQfwPsrq9g99xsGlgsYmr6BNzO/IVwsYfjBQ6XYz6JI/72MV366B5/lw0elOkJWGUM3bmKtWjXSLuLaBWhnPnnp0FfoiFi4+TMfVAb2poBkDLjO845uYLEAjL4ALGWBP5YAOsP4AJYBFDaB1HOSVWD2PuV95H2RdV93Lv74/cf6p6Zxq/h6OofeOPJBC39JtONdwOAAViOs4p4OFGTf0Uc8iiyrr9YdQrUnDLsngrVOC0jQib44HlF2RafRZBz1Qy+vfhgK3NJZBlrm+LEm9qWwzFgLU7Ozg0JxZP06jQSRpQ7EerAWDSt6PuhHPmChEAog56fCLvJT5hHTm3OZkz3DyLx7XNWTGEA1GkV14gjWgwbW0ESVjYRwCOuai03L5E7OUBAV4kXSS4auoGIaKOma4m8EA5R1sMEGLh95C+XuLph0WJWpxepYYLtfT0RRgY1KgNODY6BoaChRuEhDCIZQYseuki5KN6hcQHiq7OZNv4/Zq2O6P4Lfkwn46vZjjaYZrIpvWbpzjLErrc4xUGE4avRedpYJalRcIl5hQius/SrPm9xrNOQYJhao6BvNUeWqtY8KaWuNjHOFAr7mM9f4NA4UbKysoUJ8PV9UzVOx6wxDDWUOxnK1pmCD07fOMAvtIsM3l89Dl3HRGhVma9AZMqjOnz2LQqWCxs6dqr3T7x1DTzKJaG8SekcHhg4cgI/56uKdlKnBV/WndqN3YAB/7tyBd3oT6GBIOzs7kc/nDfFdDFT5bS73cp06dQoaPa/Rw/rtO/resTHxxE2m9rCrbSR27UJCcMf1BpiA5rAAGgdfc868fUR1sMwj0cm9Iu9IctweisViB3hhKTHDcHc5jv/LspbyaZrR1OD82/fIlOkuB9LnEWRmDX2TsddUPg3D5gvuc0je0rZaD5EW6G3yjS+A3eeBEWq3XW/Abw1HhUspXADufQb86oW7tZytkYCN//3hHwBvDALPi8EnSOYK8DAOfCc2h4aGcO7cuafkzampqf9UripH12/DtOZbx8ciVGzYy5OO40o25ascGRl5Ssc/AgwAjW3JwqIUjSYAAAAASUVORK5CYII=');
  display: inline-block;
  background-repeat: no-repeat;
  line-height: 24px;
  margin-top: 1px;
  vertical-align: text-top;
}

@media (max-width: 603px) {
  #container {
    width: 300px;
    margin: 10px auto;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  #container form.voucher-form input.voucher-code {
    width: 180px;
  }
}

@media (max-width: 603px) {
  .reader-config-group {
    width: 100%;
  }

  .reader-config-group label > span {
    width: 50%;
  }

  .reader-config-group label > select,
  .reader-config-group label > input {
    max-width: calc(50% - 2px);
  }

  #interactive.viewport {
    width: 300px;
    height: 300px;
    overflow: hidden;
  }

  #interactive.viewport canvas,
  video {
    margin-top: -50px;
    width: 300px;
    height: 400px;
  }

  #interactive.viewport canvas.drawingBuffer,
  video.drawingBuffer {
    margin-left: -300px;
  }

  #result_strip {
    margin-top: 5px;
    padding-top: 5px;
  }

  #result_strip ul.thumbnails > li {
    width: 150px;
  }

  #result_strip ul.thumbnails > li .thumbnail .imgWrapper {
    width: 130px;
    height: 130px;
    overflow: hidden;
  }

  #result_strip ul.thumbnails > li .thumbnail .imgWrapper img {
    margin-top: -25px;
    width: 130px;
    height: 180px;
  }
}

@media (max-width: 603px) {
  .overlay.scanner {
    width: 640px;
    height: 510px;
    padding: 20px;
    margin-top: -275px;
    margin-left: -340px;
    background-color: #fff;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .overlay.scanner > .header {
    margin-bottom: 14px;
  }

  .overlay.scanner > .header h4,
  .overlay.scanner > .header .close {
    line-height: 16px;
  }

  .overlay.scanner > .header .close {
    height: 16px;
    width: 16px;
  }
}
</style>
