<template>
    <div class="index">
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <a href="home">首页</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item>主站点访问统计</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="charts">
                <ve-line :data="chartData" style="width: 400px;"></ve-line>
                <ve-histogram :data="chartData" style="width: 400px;"></ve-histogram>
                <ve-bar :data="chartData" style="width: 400px;"></ve-bar>
                <ve-bar :data="chartData" style="width: 400px;"></ve-bar>
                <ve-pie :data="chartData1" style="width: 400px;"></ve-pie>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                chartData: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                        { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                        { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                        { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                        { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                        { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                    ]
                },
                chartData1: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                }
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