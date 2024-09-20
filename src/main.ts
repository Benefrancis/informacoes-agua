//import axios from "axios";
import HighchartsVue from "highcharts-vue";
import PrimeVue from "primevue/config";

import { createApp } from "vue";

import App from "./App.vue";
import "./style.css";

// Importação do Highcharts e do módulo de acessibilidade
import Highcharts from "highcharts";
import HighchartsAccessibility from "highcharts/modules/accessibility";

// Inicializando o módulo de acessibilidade
HighchartsAccessibility(Highcharts);

const app = createApp(App);
app.use(HighchartsVue, {}); // Only use HighchartsVue here
//app.use(axios, {});
app.use(PrimeVue);
app.mount("#app");
