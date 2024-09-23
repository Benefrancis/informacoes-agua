<template>
    <div>
        <!-- <highcharts :options="chartOptions"></highcharts> -->

        <p class="highcharts-description">
            Dados de municípios que informam corretamente o SISAGUA.
        </p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import Informacao from '../models/Informacao'; // Ajuste o caminho conforme necessário

const URI_BASE = 'http://localhost';

const chartOptions = ref({
    chart: {
        type: 'variablepie',
    },
    title: {
        text: '',
        align: 'left',
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Percentual de análises enviadas: <b>{point.y}</b><br/>' +
            'Quantidade de análises: <b>{point.z}</b><br/>',
    },
    series: [
        {
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'Situação',
            borderRadius: 5,
            data: [],
            colors: ['#4caefe', '#3dc3e8', '#2dd9db'],
        },
    ],
});

const estado = 'SP'; // Substitua pelo valor real
const tempo = { semestre: 1, ano: 2022 }; // Substitua pelos valores reais
const parametro = 18404;

const loadChartData = async () => {
    try {
        const responseMunicipios = await axios.get(`${URI_BASE}/api/municipios?siglaEstado=${estado}`);
        const municipios = responseMunicipios.data;

        const responseInformacoes = await axios.get(`${URI_BASE}/api/informacoes?municipio.sigla.estado=${estado}&semestre=${tempo.semestre}&ano=${tempo.ano}&parametro.id=${parametro}`);
        const informacoes: Informacao[] = responseInformacoes.data;

        if (!Array.isArray(informacoes)) {
            throw new Error('A resposta da API informacoes não é um array');
        }

        const totalMunicipios = municipios.length;
        const municipioParametros = informacoes.reduce((acc, info) => {
            const key = info.municipio.nomeMunicipio;
            if (!acc[key]) acc[key] = [];
            acc[key].push(info.parametro.nome);
            return acc;
        }, {});

        const informam = Object.values(municipioParametros).filter(
            (parametros: string[]) => parametros.length >= 1 // Substitua a condição conforme necessário
        ).length;

        const parcialmente = Object.values(municipioParametros).filter(
            (parametros: string[]) => parametros.length > 0 && parametros.length < 1 // Substitua a condição conforme necessário
        ).length;

        const naoInformam = totalMunicipios - informam - parcialmente;

        chartOptions.value.title.text = `Percentual de Municípios no estado ${estado} que estão ou não informando no ${tempo.semestre}º semestre de ${tempo.ano}.`;


        let totInformam = (informam / totalMunicipios) * 100;
        let totParcialmente = (parcialmente / totalMunicipios) * 100;
        let totNaoInformam = (naoInformam / totalMunicipios) * 100;

        console.log('Informam: ' + totInformam)
        console.log('Parcialmente: ' + totParcialmente)
        console.log('Não Informam: ' + totNaoInformam)

        chartOptions.value.series[0].data = [
            { name: 'Informam', y: totInformam, z: informam },
            { name: 'Informam parcialmente', y: totParcialmente, z: parcialmente },
            { name: 'Não Informam', y: totNaoInformam, z: naoInformam },
        ];
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
};

const handleChartClick = async (event) => {
    const pointName = event.point.name;
    try {
        const response = await axios.get(`${URI_BASE}/api/municipios?situacao=${pointName}&estado=${estado}&semestre=${tempo.semestre}&ano=${tempo.ano}`);
        const municipios = response.data;
        console.log('Municípios:', municipios);
        // Você pode exibir os municípios conforme necessário
    } catch (error) {
        console.error('Erro ao carregar municípios:', error);
    }
};

onMounted(() => {
    loadChartData();
});
</script>

<style scoped>
#container {
    height: 500px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 700px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>