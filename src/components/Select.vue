<template>
    <div>
        <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter placeholder="Select Cities"
            :maxSelectedLabels="3" class="w-full md:w-80" />
    </div>
</template>

<script setup>

import MultiSelect from 'primevue/multiselect';

</script>

<style lang="scss" scoped></style>