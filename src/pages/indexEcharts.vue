<template>
  <section class="cont">
    <el-col style="height: 100%">
      <div id="myECharts" style="width: 100%;height: 100%">
      </div>
    </el-col>
  </section>
</template>

<script type="text/ecmascript-6">
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/title')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/toolbox')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/markLine')

  export default {
    data () {
      return {}
    },
    methods: {
      initCharts () {
        let myChart = echarts.init(document.getElementById('myECharts'))
        let option = {
          backgroundColor: '#0f375f',
          title: [
            {text: '用户区域分类', x: '40%', y: '1%', textStyle: {color: '#fff', fontSize: '14'}},
            {text: '会员卡类别占比', x: '2%', y: '1%', textStyle: {color: '#fff', fontSize: '14'}},
            {text: '用户年龄分段占比', x: '2%', y: '50%', textStyle: {color: '#fff', fontSize: '14'}}
          ],
          grid: [
            {x: '50%', y: '7%', width: '45%', height: '90%'}
          ],
          xAxis: [
            {
              gridIndex: 0,
              axisTick: {show: false},
              axisLabel: {show: false},
              splitLine: {show: false},
              axisLine: {show: false}
            }
          ],
          yAxis: [
            {
              gridIndex: 0,
              interval: 0,
              data: ['广东', '湖南', '上海', '北京', '香港', '黑龙江', '浙江', '江苏', '云南', '澳门'],
              axisTick: {show: false},
              axisLabel: {show: true},
              splitLine: {show: false},
              axisLine: {show: true, lineStyle: {color: '#6173a3'}}
            }
          ],
          tooltip: {
            formatter: '{b} ({c})'
          },
          series: [
            {
              name: '会员卡类别占比',
              type: 'pie',
              radius: '30%',
              center: ['22%', '25%'],
              color: ['#86c9f4', '#4da8ec', '#3a91d2', '#005fa6', '#315f97'],
              labelLine: {normal: {show: false}},
              data: [
                {value: 335, name: '美食'},
                {value: 310, name: '娱乐'},
                {value: 234, name: '生活'},
                {value: 135, name: '其他'}
              ],
              itemStyle: {normal: {label: {show: true, formatter: '{b} \n ({d}%)', textStyle: {color: '#B1B9D3'}}}}
            },
            {
              name: '用户年龄分段占比',
              type: 'pie',
              radius: '30%',
              center: ['22%', '75%'],
              color: ['#86c9f4', '#4da8ec', '#3a91d2', '#005fa6', '#315f97'],
              labelLine: {normal: {show: false}},
              data: [
                {value: 335, name: '0-18'},
                {value: 310, name: '19-40'},
                {value: 234, name: '50-70'},
                {value: 135, name: '70以上'}
              ],
              itemStyle: {normal: {label: {show: true, formatter: '{b} \n ({d}%)', textStyle: {color: '#B1B9D3'}}}}
            },
            {
              name: '用户区域分类',
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              barWidth: '45%',
              itemStyle: {normal: {color: '#86c9f4'}},
              label: {normal: {show: true, position: 'right', textStyle: {color: '#9EA7C4'}}},
              data: [3000, 2324, 454, 2134, 1111, 987, 2439, 673, 777, 1234]
            }
          ]
        }
        myChart.setOption(option)
      }
    },
    mounted () {
      this.initCharts()
    }
  }
</script>

<style lang="scss">
  .cont {
    height: 100%;
    /*width: 100%;*/
    padding: 10px;
  }
</style>
