<template>
    <div class="index">
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <a href="home">首页</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>身份数量统计</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="charts">
                <ve-pie :data="chartData" style="width: 400px;"></ve-pie>
                <ve-waterfall :data="chartData" style="width: 400px;"></ve-waterfall>
                <ve-funnel :data="chartData" style="width: 400px;"></ve-funnel>
                <ve-bar :data="chartData" style="width: 400px;"></ve-bar>
                <ve-line :data="chartData" style="width: 400px;"></ve-line>
                <ve-histogram :data="chartData" style="width: 400px;"></ve-histogram>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                chartData: {
                    columns: ['身份', '人数'],
                    rows:[]
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            getData(){
                this.$axios.get('https://gxnudsl.xyz/api/user/totle').then((res)=>{
                    this.chartData.rows = res.data.res_info
                    console.log(this.chartData.rows)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .index{
        height: 100%;
        width: 100%;
        overflow: auto;
        .index::-webkit-scrollbar {/*滚动条整体样式*/
            width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }
        .index::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #eeeeee;
        }
        .index::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 10px;
            background: #ffffff;
        }
        .charts{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-top: 40px;
        }
    }
</style>