<template>
  <div>
    <Card />
    <Sale style="margin:10px 0;" />
    <Observe />
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'

export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Observe
  }
}
</script>

<style lang="scss" scoped>
</style>
