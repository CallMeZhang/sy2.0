<template>
  <mt-popup v-model="visible" position="bottom" class="mint-datetime">
    <mt-picker
      :slots="dateSlots"
      @change="onChange"
      :visible-item-count="visibleItemCount"
      class="mint-datetime-picker"
      :rotate-effect=true
      ref="picker"
      show-toolbar>
      <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false;$emit('cancel')">{{ cancelText
        }}</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
    </mt-picker>
  </mt-popup>
</template>

<style lang="css">
  .mint-datetime {
    width: 100%;
  }
</style>

<script type="text/babel">
  import {Popup, Picker} from 'mint-ui';

  export default {
    name: 'sy-popup-picker',
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      type: {
        type: String,
        default: 'datetime'
      },
      visibleItemCount: {
        type: Number,
        default: 3
      },
      dataGoods: null,
      dataArea: null,
      value: null
    },
    data() {
      return {
        visible: false,
        currentValue: null,
        dateSlots: [],
      };
    },
    components: {
      'mt-picker': Picker,
      'mt-popup': Popup
    },
    methods: {
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      onChange(picker, val) {
        let values = picker.$children.filter(child => child.currentValue !== undefined).map(child => child.currentValue);
        this.currentValue = values;
        if (this.dataGoods) {
          if (this.dataGoods[val[0]]) {
            picker.setSlotValues(2, this.dataGoods[val[0]]);
          }
        }
        if (this.dataArea) {
          this.diguiAreaFn(picker,this.dataArea, this.currentValue, 0)
        }
        this.handleValueChange();
      },
      diguiAreaFn(picker,value, tagData, index){
        for (var i = 0; i < value.length; i++) {
          if (value[i].supportAreaName === tagData[index]) {
            picker.setSlotValues((index+1)*2, value[i]['childrenList'].map(child => child['supportAreaName']))
            index++
            this.diguiAreaFn(picker,value[i]['childrenList'], this.currentValue, index)
            if(this.currentValue.length<index)return;
          }
        }
      },
      generateSlots() {
        this.dateSlots = this.value;
      },
      confirm() {
        this.visible = false;
        this.$emit('confirm', this.currentValue);
      },
      handleValueChange() {
        this.$emit('input', this.currentValue);
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.currentValue = this.value;
      this.generateSlots();
    }
  };
</script>
