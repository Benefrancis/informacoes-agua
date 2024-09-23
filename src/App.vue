<template>
  <div id="app">
    <Filtros></Filtros>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Filtros from './components/Filtros.vue'
const tempo = ref({
  ano: 2022,
  semestre: 1
})

const ponto = ref({})

const municipio = ref({
  id: 3655,
  nome: 'Osasco'
})

const parametro = ref({
  id: 18475
})



onMounted(() => {
  console.log(`Ano: ${tempo.value.ano}.`)
  console.log(`Semestre: ${tempo.value.semestre}.`)
  console.log(`Parametros: ${parametro.value}.`)
  console.log(`Municipio: ${municipio.value}.`)
})



</script>
