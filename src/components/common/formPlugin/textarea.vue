<template>
  <div class="container">
    <sy-header :titleText="title"></sy-header>
    <div class="line-2"></div>

    <div class="textarea-wrapper">
      <textarea placeholder="请输入..." v-model="areaValue" :name="name" maxlength="140"></textarea>
    </div>

    <span class="button-wrapper sy-blue-bg" @click="goPage()">
      确定
    </span>
  </div>
</template>

<script>
  import ss from '@/modules/_ss/index'
  export default {
    props: [
      'titleText',
      'placeholder',
      'name',
      'value',
      'callback'
    ],
    data () {
      return {
        title: '',
        areaValue: ''
      }
    },

    created () {
      this.getData()
    },

    methods: {
      getData () {
        if (this.titleText === undefined) {
          this.title = '输入框'
        } else {
          this.title = this.titleText
        }

        if (this.value === undefined) {
          this.areaValue = ''
        } else {
          this.areaValue = this.value
        }
      },
      goPage () {
        ss.setSsItem(this.name, this.areaValue)
        window.location.href = this.callback
      }
    }

  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #F7F9FA;
  }

  .textarea-wrapper {
    width: 100%;
  }

  .textarea-wrapper textarea {
    width: 7.1rem;
    height: 3rem;
    max-width: 7.1rem;
    min-width: 7.1rem;
    font-size: 0.28rem;
    padding: 0.2rem;
  }

  .button-wrapper {
    display: block;
    margin: 0.66rem auto 0;
    height: 0.88rem;
    width: 7rem;
    line-height: 0.88rem;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 8px;
    color: #ffffff;
  }
</style>
