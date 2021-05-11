<template>
    <div class="root">
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    methods: {
    },
    created() {
    }
};
</script>

<style lang="less">
    @import "../public/common.css";
    .root {
        .content {
            padding: 100px;
        }
    }
</style>