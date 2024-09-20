<template>
  <div id="app">
    <TrendCard
        municipio="São Paulo"
        :ano="2023"
        :data="trendData"
    />
  </div>
</template>

<script setup lang="ts">
import TrendCard from './components/TrendCard.vue';

// Defina os dados para o gráfico
const trendData = [
  {year: 2019, value: 10},
  {year: 2020, value: 15},
  {year: 2021, value: 20},
  {year: 2022, value: 25},
  {year: 2023, value: 30},
];
</script>
