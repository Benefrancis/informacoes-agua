import Panel from "primevue/panel";
import App from "./App.vue";
import "./style.css";
import "./flags.css";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import MultiSelect from "primevue/multiselect";
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Chart from "primevue/chart";

import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

/* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add some free styles */
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add each imported icon to the library */
library.add(faTwitter, faUserSecret);

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("Panel", Panel)
  .component("MultiSelect", MultiSelect)
  .component("Select", Select)
  .component("DatePicker", DatePicker)
  .component("InputNumber", InputNumber)
  .component("Chart", Chart)
  .component("Accordion", Accordion)
  .component("AccordionContent", AccordionContent)
  .component("AccordionHeader", AccordionHeader)
  .component("AccordionPanel", AccordionPanel)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  });
app.mount("#app");
