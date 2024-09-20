<template>
  <div id="app">

    <TrendCard :municipio="municipio" :tempo="tempo" :ponto="ponto" :parametro="parametro" :data="data"/>

  </div>
</template>

<script setup lang="ts">
import TrendCard from './components/TrendCard.vue';
import { ref, onMounted } from 'vue'

// Defina os dados para o gráfico
const trendData = [
  { year: 2019, value: 10 },
  { year: 2020, value: 15 },
  { year: 2021, value: 20 },
  { year: 2022, value: 25 },
  { year: 2023, value: 30 },
];


const tempo = ref({
  ano: 2022,
  semestre: 1
})

const ponto = ref({})

const municipio = ref({
  id: 3655
})

const parametro = ref([{
  id: 18475
}])

const analises = ref([{}])



onMounted(() => {
  console.log(`Ano: ${tempo.value.ano}.`)
  console.log(`Semestre: ${tempo.value.semestre}.`)
  console.log(`Parametros: ${parametro.value}.`)
  console.log(`Municipio: ${municipio.value}.`)
  console.log(`Analises: ${analises.value}.`)
})



</script>
