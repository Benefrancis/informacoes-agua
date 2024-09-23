import Panel from "primevue/panel";
import App from "./App.vue";
import "./style.css";
import "./flags.css";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import MultiSelect from "primevue/multiselect";
import DatePicker from "primevue/datepicker";
import Select from 'primevue/select';
import InputNumber from "primevue/inputnumber";
import Chart from 'primevue/chart';

const app = createApp(App);
app.component("Panel", Panel);
app.component("MultiSelect", MultiSelect);
app.component("Select", Select);
app.component("DatePicker", DatePicker);
app.component("InputNumber", InputNumber);
app.component("Chart", Chart);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
