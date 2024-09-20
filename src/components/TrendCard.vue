<template>
  <div class="card">
    <div class="card-header">
      <h3 class="title">{{ municipio }}</h3>
      <span class="year">{{ ano }}</span>
    </div>
    <div class="chart-container">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>



<script setup lang="ts">
import { } from "highcharts";
import { defineProps, computed } from 'vue';


interface DataPoint {
  year: number;
  value: number;
}




const props = defineProps<{
  municipio: {
    id: number,
    nome: string
  };
  tempo: {
    ano: number,
    semestre: number
  };
  ponto: {
    id: number,
    nome: string
  },
  parametro: {
    id: number,
    nome: string
  }
  data: DataPoint[];
}>();

fetchAnalysis(tempo.ano, tempo.semestre, municipio.id, parametro.id, ponto.id)

const fetchAnalysis = async (ano: number, semestre: number, municipio: number, parametro: number, ponto: number) => {
  try {
    const endereco = `/api/informacao?ano=${ano}&semestre=${semestre}&municipio.id=${municipio}&parametro.id=${parametro}&ponto.id=${ponto}`
    console.log(endereco)
    const response = await axios.get(endereco);
    // Handle the response data here
    console.log(response.data)
    // console.log('Analysis data:', response.data);
  } catch (error) {
    console.error('Error fetching analysis data:', error);
  }
};

const chartOptions = computed(() => ({
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
      viewDistance: 25,
    },
    height: '100%',

  },
  title: {
    text: 'Últimos 5 anos',
  },
  xAxis: {
    categories: props.data.map(item => item.year.toString()),
    title: {
      text: 'Ano',
    },
  },
  yAxis: {
    title: {
      text: 'Quantidade de Analises informadas',
    },
  },
  series: [
    {
      name: 'Quantidade',
      data: props.data.map((item) => item.value),
      type: 'column',
      colorByPoint: true,
      point: {
        events: {
          click: function () {
            const municipio = props.municipio
            const parametro = props.parametro
            const tempo = props.tempo
            const ponto = props.ponto

            const year = props.data[this.index].year; // Pega o ano correspondente à coluna
            console.log('Consultando dados do ano: ' + year + ' para o município: ' + municipio);
            fetchAnalysis(tempo.ano, tempo.semestre, municipio.id, parametro.id, ponto.id); // Chama a API com o ano
          },
        },
      },
    },
  ],
}));
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 100%;
  max-height: 100vh;
  /* Ensure card doesn't exceed viewport height */
  max-width: 100vw;
  /* Ensure card doesn't exceed viewport width */
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
  height: 100%;
  max-height: 800px;
  /* Max height for the chart container */
}
</style>
