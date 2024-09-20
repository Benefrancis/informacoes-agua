import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue';
import axios from 'axios';

const app = createApp(App);
app.use(HighchartsVue); // Only use HighchartsVue here
app.use(axios)
app.mount('#app');
