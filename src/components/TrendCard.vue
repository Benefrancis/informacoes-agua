<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">{{ dados.length ? dados[0].municipio.nomeMunicipio : '' }}</h3>
      <span class="year">{{ props.tempo.ano ? props.tempo.ano - 5 + ' até ' + props.tempo.ano : '' }} </span>
    </div>
    <div class="chart-container">
      <!-- Verificação adicional para garantir que chartData está definido -->
      <Bar v-if="chartData && chartData.labels && chartData.datasets" :chart-data="chartData" :options="chartOptions">
      </Bar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

import Informacao from "../models/Informacao";
import Municipio from '../models/Municipio';
import Tempo from '../models/Tempo';
import Parametro from '../models/Parametro';
import Ponto from '../models/Ponto';

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const dados = ref<Informacao[]>([]);

const props = defineProps<{
  municipio: Municipio,
  tempo: Tempo,
  ponto: Ponto,
  parametro: Parametro
}>();

const fetchData = async () => {
  const API_URL = `http://localhost/api/informacao`;

  const promises = [];

  let endereco = `${API_URL}`;
  endereco += props.tempo.ano > 0 ? `?ano=${props.tempo.ano}` : '?ano=';
  endereco += props.municipio.id > 0 ? `&municipio.id=${props.municipio.id}` : '&municipio.id=';
  endereco += props.parametro.id > 0 ? `&parametro.id=${props.parametro.id}` : '&parametro.id=';
  endereco += props.ponto.id > 0 ? `&ponto.id=${props.ponto.id}` : '&ponto.id=';
  promises.push(fetch(endereco).then(response => response.json()));

  const results = await Promise.all(promises);

  dados.value = results.flat(); // Flatten the results into a single array
};

watchEffect(async () => {
  await fetchData();
});

const chartData = ref({
  labels: [],
  datasets: []
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Últimos 5 anos',
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Ano/Semestre',
      }
    },
    y: {
      title: {
        display: true,
        text: 'Quantidade de Análises informadas',
      }
    }
  }
});

watchEffect(() => {
  if (dados.value.length > 0) {
    chartData.value.labels = [...new Set(dados.value.map((item: Informacao) => item.ano.toString()))];
    chartData.value.datasets = [
      {
        label: 'Quantidade',
        data: dados.value.map((item: Informacao) => item.analises),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ];
  }
});
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  min-width: 500px;
  max-width: 1024px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
}

.title {
  font-size: 1.5em;
  margin: 0;
}

.year {
  font-size: 1.2em;
  color: #888;
}

.chart-container {
  width: 100%;
  height: 450px;
  max-height: 800px;
}
</style>
