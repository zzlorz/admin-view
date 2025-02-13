<template>
	<div class="route-nav">
		<el-text tag="p" v-if="browser.isMini" class="route-nav__title">
			{{ lastName }}
		</el-text>

		<template v-else>
			<el-breadcrumb :separator-icon="ArrowRight">
				<el-breadcrumb-item v-for="(item, index) in list" :key="index">
					{{ item.meta?.label || item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</template>
	</div>
</template>

<script lang="ts" name="route-nav" setup>
import { computed } from 'vue';
import { flattenDeep, last } from 'lodash-es';
import { ArrowRight } from '@element-plus/icons-vue';
import { useCool } from '/@/cool';
import { useBase } from '/$/base';

const { route, browser } = useCool();
const { menu } = useBase();

// 数据列表
const list = computed(() => {
	function deep(item: any) {
		if (route.path === '/') {
			return false;
		}

		if (item.path == route.path) {
			return item;
		} else {
			if (item.children) {
				const ret = item.children.map(deep).find(Boolean);

				if (ret) {
					return [item, ret];
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}

	return flattenDeep(menu.group.map(deep).filter(Boolean));
});

// 最后一个节点名称
const lastName = computed(() => last(list.value)?.meta?.label);
</script>

<style lang="scss" scoped>
.route-nav {
	white-space: nowrap;
	user-select: none;

	:deep(.el-breadcrumb) {
		margin: 0 10px;

		.el-breadcrumb__inner {
			font-size: 12px;
		}
	}

	&__title {
		font-weight: 500;
		margin-left: 8px;
	}
}
</style>
