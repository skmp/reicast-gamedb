<template>
  <div>
    <table :class="`table ${wrapperClass}`">
      <thead>
      <tr v-if="horizontal" class="horizontal">
        <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
      </tr>
      <tr v-else>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody v-if="horizontal">
      <tr v-for="(row, index) in rows" :key="index" class="horizontal">
        <td v-for="(field, index) in fields" :key="index">{{ row[field] }}</td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr v-for="(field, index) in fields" :key="index" class="vertical">
        <td>{{ field }}</td>
        <td>{{ rows[0][field] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    fields: Array,
    rows: Array,
    horizontal: {
      default: true
    },
    wrapperClass: {
      default: 'table-striped'
    }
  }
}
</script>

<style>
  .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
    background-color: transparent;
  }
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  tr.horizontal, tr.horizontal th {
    text-align: center;
  }
  tr.vertical, .vertical th {
    text-align: right;
  }
  .vertical td:first-child {
    font-weight: 800;
  }
  td {
    padding: 4px 0;
  }
</style>
