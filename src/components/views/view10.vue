<style lang="less">
.redClass {
    background-color: #FBACA3 !important;
}

.form-detail-vue {
    .h-panel-body {
        padding-right: 60px;
    }

    .info-basic {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .info-table {
        margin-top: 30px;

        .h-tabs {
            margin-bottom: 20px;
        }
    }

    .info-title {
        font-size: 16px;
        font-weight: bold;
    }

    .table-wrapper {
        padding: 0 20px;
    }
}
</style>

<template>
    <div>
        <div class="app-form frame-page form-detail-vue">

            <div class="h-panel">
                <div class="h-panel-bar">
                    <span class="h-panel-title">产量提交</span>
                </div>
                <div class="h-panel-body">

                    <Form ref="form" :label-width="100" :model="data" mode="threecolumn">
                        <FormItem label="工件编号" prop="name1" :required="true">
                            <template v-slot:label>工件编号</template>
                            <Select v-model="data.name1" :datas="param2"></Select>
                        </FormItem>
                        <FormItem label="当班产量" prop="name2" :required="true">
                            <template v-slot:label>当班产量</template>
                            <NumberInput v-model="data.name2" />
                        </FormItem>
                        <FormItem>
                            <Button color="primary" :loading="isLoading" @click="submit">提交</Button>&nbsp;&nbsp;&nbsp;
                            <Button @click="reset">重置</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>

        <div class="app-form frame-page form-detail-vue">

            <div class="h-panel">
                <div class="h-panel-bar">
                    <span class="h-panel-title">刀具更换</span>
                </div>
                <div class="h-panel-body">
                    <Form ref="form" :label-width="100" :model="data" mode="threecolumn">
                        <FormItem label="刀具编号" prop="name3" :required="true">
                            <template v-slot:label>刀具编号</template>
                            <input type="text" v-model="data.name3" />
                        </FormItem>
                        <FormItem label="换刀件数" prop="name4" :required="true">
                            <template v-slot:label>换刀件数</template>
                            <NumberInput v-model="data.name4" />
                        </FormItem>
                        <FormItem>
                            <Button color="primary" :loading="isLoading" @click="submit">提交</Button>&nbsp;&nbsp;&nbsp;
                            <Button @click="reset">重置</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>


        <div class="app-form frame-page form-detail-vue">
            <div class="h-panel">
                <div class="h-panel-bar">
                    <span class="h-panel-title">刀具预警</span>
                </div>
                <div class="h-panel-body">

                    <div class="common-filter-bar">
                        <div class="float-right">
                            <Button icon="icon-repeat" color="red" @click="removeAll()">批量更换</Button>
                        </div>
                    </div>

                    <Table :datas="datas" ref="table" :getTrClass="getTrClass" :checkbox="true">
                        <!-- <TableItem :width='100' title="序号">
                            <template v-slot="{ index }">{{ index + 1 }} </template>
                        </TableItem> -->
                        <TableItem :width='100' title="编号" prop="id"></TableItem>
                        <TableItem title="机床" prop="name"></TableItem>
                        <TableItem title="刀号" prop="age"></TableItem>
                        <TableItem title="设定寿命" prop="pop1"></TableItem>
                        <TableItem title="当前寿命" prop="pop2"></TableItem>
                        <TableItem title="剩余寿命" prop="pop3"></TableItem>
                        <TableItem title="预警寿命" prop="pop4"></TableItem>
                        <TableItem title="操作" :width="100" fixed="right"><template slot-scope="{data}"><button
                                    class="h-btn h-btn-s h-btn-red" @click="remove(datas, data)"><i
                                        class="icon-repeat"></i></button></template></TableItem>
                        <div slot="empty">暂无预警数据</div>
                    </Table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            data: {
                name1: null,
                name2: null,
                name3: null,
                name4: null
            },
            param2: ['116-3582', '116-3586', '116-3592', '116-3995', '105-8182', '105-8341'],
            tabConfig: {
                module1: '操作类型一',
                module2: '操作类型二'
            },
            selectedTab: 'module1',
            columns: [
                { title: '操作类型', prop: 'operateType' },
                { title: '操作人', prop: 'operateBy' },
                { title: '执行结果', prop: 'operateResult' },
                { title: '操作时间', prop: 'operateTime' },
                { title: '备注', prop: 'remark' }
            ],
            // here 
            datas: [
                { id: 1, name: 'SPM 3', age: 12, pop1: '122', pop2: '8774', pop3: '-50', pop4: '50' },
                // { id: 2, name: 'SPM 1', age: 12, pop1: '10200', pop2: '7777', pop3: '-50', pop4: '50' },
                // { id: 3, name: 'SPM 1', age: 12, pop1: '12000', pop2: '8878', pop3: '-50', pop4: '50' },
                // { id: 4, name: 'SPM 1', age: 12, pop1: '12000', pop2: '4875', pop3: '-50', pop4: '50' },
                // { id: 5, name: 'SPM 1', age: 12, pop1: '800', pop2: '500', pop3: '-50', pop4: '50' },
                // { id: 6, name: 'SPM 1', age: 12, pop1: '12000', pop2: '1422', pop3: '-50', pop4: '50' },
                // { id: 7, name: 'SPM 1', age: 12, pop1: '7000', pop2: '5555', pop3: '-50', pop4: '50' },
                // { id: 8, name: 'SPM 1', age: 12, pop1: '12000', pop2: '500', pop3: '-50', pop4: '50' },
                // { id: 9, name: 'SPM 1', age: 12, pop1: '11000', pop2: '500', pop3: '-50', pop4: '50' },
            ]
        };
    },
    methods: {
        tabChanged (data) {
            this.$Message.info(`切换至${data.title}`, 1000);
        },
        getTrClass (data, index) {
            if (data.id == 5) {
                return ['redClass'];
            }
            
            if (data.id == 7) {
                return ['redClass'];
            }
        },
        remove (datas, data) {
            this.$Confirm('是否刀具更换？', '刀具更换').then(() => {
                this.datas.splice(datas.indexOf(data), 1);
                this.$Message.success('确定更换！');
            }).catch(() => {
                this.$Message.error('取消');
            });
        },
        removeAll () {
            this.$Confirm('是否批量刀具更换？', '刀具更换').then(() => {
                var choseDatas = this.$refs.table.getSelection();
                choseDatas.filter(item => this.datas.splice(this.datas.indexOf(item), 1));
                this.$Message.success('确定更换！');
            }).catch(() => {
                this.$Message.error('取消');
            });
        }
    },
};
</script>
