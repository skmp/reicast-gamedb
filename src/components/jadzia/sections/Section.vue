<template>
    <section
      :class="sectionClass"
      :style="sectionStyle">

      <div v-if="heading" :class="headingClass">
        <slot name="heading">
          <div class="heading centered">
            <div class="section-heading">
              <h2>
                {{ title }}
              </h2>
            </div>
          </div>
        </slot>
      </div>
      <slot name="content"></slot>
      <div style="clear:both"></div>
    </section>
</template>

<script>
export default {
  props: {
    title: String,
    bg: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    },
    heading: {
      type: Boolean,
      default: false
    },
    sectionClass: {
      type: String,
      default: 'section center'
    },
    height: {
      type: [ Number, String ],
      default: 1,
      validator: function (value) {
        return value >= 0 && value <= 1
      }
    },
    width: {
      type: [ Number, String ],
      default: 1,
      validator: function (value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data () {
    return {
      headingClass: `heading-${this.sectionClass}`
    }
  },
  computed: {
    calcHeight () {
      return this.$store.getters.getHeight * this.height
    },
    calcWidth () {
      return this.$store.getters.getWidth * this.width
    },
    heightStyle () {
      if (this.height === 0) {
        return ''
      }
      return this.styleUnitFactory('height', this.calcHeight)
    },
    widthStyle () {
      if (this.width === 0) {
        return this.styleUnitFactory('width', 100, '%')
      }
      return this.styleUnitFactory('width', this.calcWidth)
    },
    bgStyle () {
      if (this.bg) {
        return this.styleUnitFactory('background', this.bg, '')
      }
      return ''
    },
    colorStyle () {
      if (this.color) {
        return this.styleUnitFactory('color', this.color, '')
      }
      return ''
    },
    sectionStyle () {
      return `
      ${this.heightStyle}
      ${this.widthStyle}
      ${this.bgStyle}
      ${this.colorStyle}`
    }
  },
  methods: {
    styleUnitFactory (parameter, value, suffix = 'px') {
      return ` ${parameter}:${value}${suffix};`
    }
  }
}
</script>
<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    resize: vertical;
    overflow: hidden;
  }
</style>
