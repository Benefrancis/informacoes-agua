<template>


    <div class="bg-surface-100 dark:bg-surface-900 items-center justify-center p-5">
        <section class="bg-white dark:bg-gray-800 rounded-xl flex flex-col gap-20 p-10 w-full h-full max-w-7xl">

            <div class="card">
                <Accordion :value="['0']" multiple>
                    <AccordionPanel value="0">
                        <AccordionHeader>Filtros</AccordionHeader>
                        <AccordionContent>



                            <div class="flex flex-wrap gap-2">

                                <Panel header="Ano" class="w-full lg:w-1/4">
                                    <DatePicker v-model="ano" view="year" dateFormat="yy" placeholder="Ano"
                                        :minDate="minDate" :maxDate="maxDate" class="w-full" />
                                </Panel>

                                <Panel header="Semestre" class="w-full lg:w-1/3">
                                    <Select v-model="semestre" :options="semestres" optionLabel="name" filter
                                        placeholder="Semestre" :maxSelectedLabels="1" class="w-full" />
                                </Panel>

                                <Panel header="Estado" class="w-full lg:w-1/3">
                                    <Select v-model="local" :options="locais" optionLabel="label" filter
                                        optionGroupLabel="label" optionGroupChildren="items" display="chip"
                                        placeholder="Selecione o Estado" class="w-full">
                                        <template #optiongroup="slotProps">
                                            <div class="flex items-center">
                                                <img :alt="slotProps.option.label"
                                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                    :class="`flag flag-br mr-2`" style="width: 18px" />
                                                <div>{{ slotProps.option.label }}</div>
                                            </div>
                                        </template>
                                    </Select>
                                </Panel>

                                <Panel header="Município" class="w-full">
                                    <Select v-model="municipio" :options="municipios" optionLabel="nomeMunicipio" filter
                                        placeholder="Cidades" :maxSelectedLabels="1" class="w-full" />
                                </Panel>

                                <Panel header="Parâmetro" class="w-full">
                                    <MultiSelect v-model="parametro" :options="parametros" optionLabel="descricao"
                                        filter optionGroupLabel="nome" optionGroupChildren="elementos" display="chip"
                                        placeholder="Selecione o Parâmetro" class="w-full">
                                        <template #optiongroup="slotProps">
                                            <div class="flex items-center">
                                                <font-awesome-icon :icon="['fas', 'flask']" />
                                                <div>{{ slotProps.option.nome }}</div>
                                            </div>
                                        </template>
                                    </MultiSelect>
                                </Panel>

                            </div>




                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="1">
                        <AccordionHeader>Gráficos</AccordionHeader>
                        <AccordionContent>




                            <div class="card flex justify-center">

                                
                                <Chart type="doughnut" id="grupos" :data="chartData" :options="chartOptions"
                                    class="w-full md:w-[30rem]" />
                                
                                    <Chart type="doughnut" id="parametros" :data="chartData" :options="chartOptions"
                                    class="w-full md:w-[30rem]" />
                                
                                    <Chart type="polarArea" id="polar"  :data="chartData" :options="chartOptions"
                                    class="w-full md:w-[30rem]" />


                            </div>


                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel value="2">
                        <AccordionHeader>Tabela</AccordionHeader>
                        <AccordionContent>
                            <p class="m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                                voluptatum
                                deleniti
                                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                                provident,
                                similique
                                sunt in culpa
                                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                                rerum
                                facilis est et
                                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                                nihil
                                impedit quo minus.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>


        </section>
    </div>

</template>


<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import axios from 'axios';
import MultiSelect from "primevue/multiselect";

// Valores Selecionados pelo Usuário
const ano = ref();
const semestre = ref();
const local = ref(); // UF
const municipio = ref();
const parametro = ref();

const minDate = ref(new Date('2014-01-01')) // Inicio dos dados do SISAGUA
const maxDate = ref(new Date()) // Normalmente temos dados até o ano anterior

// Carregados por API
const municipios = ref();
const parametros = ref();

const URL_API = 'http://localhost'


const locais = ref([{
    label: "CENTRO OESTE",
    code: 'CENTRO-OESTE',
    items: [
        { value: "GO", label: "GOIÁS" },
        { value: "MT", label: "MATO GROSSO" },
        { value: "MS", label: "MATO GROSSO DO SUL" },
        { value: "DF", label: "DISTRITO FEDERAL" }
    ]
},
{
    label: "NORDESTE",
    code: "NORDESTE",
    items: [
        { value: "AL", label: "ALAGOAS" },
        { value: "BA", label: "BAHIA" },
        { value: "CE", label: "CEARÁ" },
        { value: "MA", label: "MARANHÃO" },
        { value: "PB", label: "PARAÍBA" },
        { value: "PE", label: "PERNAMBUCO" },
        { value: "PI", label: "PIAUÍ" },
        { value: "RN", label: "RIO GRANDE DO NORTE" },
        { value: "SE", label: "SERGIPE" }
    ]
},
{
    label: "NORTE",
    code: "NORTE",
    items: [
        { value: "AC", label: "ACRE" },
        { value: "AP", label: "AMAPÁ" },
        { value: "AM", label: "AMAZONAS" },
        { value: "PA", label: "PARÁ" },
        { value: "RO", label: "RONDÔNIA" },
        { value: "RR", label: "RORAIMA" },
        { value: "TO", label: "TOCANTINS" }
    ]
},
{
    label: "SUDESTE",
    code: "SUDESTE",
    items: [
        { value: "ES", label: "ESPÍRITO SANTO" },
        { value: "MG", label: "MINAS GERAIS" },
        { value: "RJ", label: "RIO DE JANEIRO" },
        { value: "SP", label: "SÃO PAULO" }
    ]
},
{
    label: "SUL",
    code: "SUL",
    items: [
        { value: "PR", label: "PARANÁ" },
        { value: "RS", label: "RIO GRANDE DO SUL" },
        { value: "SC", label: "SANTA CATARINA" }
    ]
}]);

var semestres = ref(
    [{
        name: "1º Semestre",
        code: 1,
        trimestres: [
            {
                code: 1, name: "1º Trimestre", mes: [
                    { code: 1, name: "Janeiro" },
                    { code: 2, name: "Fevereiro" },
                    { code: 3, name: "Março" }
                ]
            },
            {
                code: 2, name: "2º Trimestre", mes: [
                    { code: 4, name: "Abril" },
                    { code: 5, name: "Maio" },
                    { code: 6, name: "Junho" }
                ]
            }
        ]
    },
    {
        name: "2º Semestre",
        code: 2,
        trimestres: [
            {
                code: 3, name: "3º Trimestre", mes: [
                    { code: 7, name: "Julho" },
                    { code: 8, name: "Agosto" },
                    { code: 9, name: "Setembro" }
                ]
            },
            {
                code: 4, name: "4º Trimestre", mes: [
                    { code: 10, name: "Outubro" },
                    { code: 11, name: "Novembro" },
                    { code: 12, name: "Dezembro" }
                ]
            }
        ]
    }]
);



// Função para carregar municípios
const loadMunicipios = async (uf) => {
    try {
        console.log(uf)
        const response = await axios.get(`${URL_API}/api/municipios?siglaEstado=${uf.value}`);
        municipios.value = response.data;
        console.log(municipios.value)
    } catch (error) {
        console.error("Erro ao carregar municípios:", error);
    }
};

// Função para carregar parâmetros
const loadParametros = async () => {
    try {
        const response = await axios.get(`${URL_API}/api/parametros`);
        let data = response.data;

        parametros.value = Object.values(
            data.reduce((acc, item) => {

                if (item.id > 1)
                    if (!acc[item.nome]) {
                        acc[item.nome] = {

                            code: Object.keys(acc).length + 1, // Gera um código sequencial
                            nome: item.nome,
                            elementos: []


                        };
                    }

                if (item.id > 1)
                    // Adiciona o item sem o campo 'nome' ao array de elementos analisados
                    acc[item.nome].elementos.push({
                        id: item.id,
                        descricao: item.descricao,
                        vmp: item.vmp,
                        uso: item.uso,
                        riscoHomem: item.riscoHomem,
                        riscoAmbiental: item.riscoAmbiental,
                        fonte: item.fonte
                    });

                return acc;

            }, {} as Record<string, any>) // Tipo do acumulador
        );
    } catch (error) {
        console.error("Erro ao carregar parâmetros:", error);
    }
};

// Watch para observar mudanças no local (estado)
watch(local, (newLocal) => {
    if (newLocal) {
        loadMunicipios(newLocal);
    }
});

// Chamar a API para carregar parâmetros ao montar o componente
onMounted(() => {
    loadParametros();
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref(null);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};

// Expondo as variáveis e métodos que podem ser utilizados externamente
defineExpose({
    ano,
    semestre,
    local,
    municipio,
    parametro,
    minDate,
    maxDate,
    municipios,
    parametros,
    locais,
    semestres,
    loadMunicipios,
    loadParametros
});

</script>
