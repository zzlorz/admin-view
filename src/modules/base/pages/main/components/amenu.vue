<template>
	<div class="a-menu">
		<el-menu
			:default-active="active"
			mode="horizontal"
			background-color="transparent"
			@select="select"
		>
			<template v-for="(item, index) in list" :key="item.id">
				<el-menu-item :index="`${index}`">
					<cl-svg class="icon" :name="item.icon" :size="16" v-if="item.icon" />
					<span class="label">{{ item.meta?.label }}</span>

					<div class="arc">
						<cl-svg name="arc" />
						<cl-svg name="arc" />
					</div>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts" name="a-menu" setup>
import { computed, ref, watch } from 'vue';
import { useBase, Menu } from '/$/base';
import { useCool } from '/@/cool';
import { ElMessage } from 'element-plus';

const { router, route } = useCool();
const { menu } = useBase();

// 选中标识
const active = ref('0');

// 组列表
const list = computed(() => {
	return menu.group.filter(e => e.isShow);
});

// 选择导航
function select(index: any) {
	if (String(index) == active.value) {
		return false;
	}

	// 选中的组
	const item = list.value[index];

	// 获取第一个菜单地址
	const url = menu.getPath(item);

	if (url) {
		// 设置左侧菜单
		menu.setMenu(index);

		// 跳转
		router.push(url);
	} else {
		ElMessage.warning(`“${item.meta?.label}”下没有菜单，请先添加`);
	}
}

// 刷新
function refresh() {
	let index = 0;

	function deep(e: Menu.Item, i: number) {
		switch (e.type) {
			case 0:
				if (e.children) {
					e.children.forEach(e => {
						deep(e, i);
					});
				}

				break;
			case 1:
				if (route.path.includes(e.path)) {
					index = i;
				}
				break;
			default:
				break;
		}
	}

	// 遍历所有分组
	list.value.forEach(deep);

	// 确认选择
	active.value = String(index);

	// 设置该分组下的菜单
	menu.setMenu(index);
}

// 监听变化
watch(
	() => [route.path, menu.group.length],
	() => {
		refresh();
	},
	{
		immediate: true
	}
);
</script>

<style lang="scss" scoped>
.a-menu {
	padding: 5px 0 0 15px;
	background-color: var(--view-bg-color);
	height: 36px;

	.el-menu {
		height: 100%;
		background-color: transparent;
		border: 0;

		:deep(.el-sub-menu__title) {
			border: 0 !important;
		}

		:deep(.el-menu-item) {
			display: flex;
			align-items: center;
			height: 36px;
			padding: 0 16px 0 14px;
			border: 0;
			color: var(--el-color-info);
			position: relative;
			background-color: transparent;

			.label {
				font-size: 12px;
				margin-left: 3px;
				line-height: 1;
			}

			.icon {
				margin-right: 5px;
			}

			.label,
			.icon {
				position: relative;
				z-index: 2;
			}

			.arc {
				pointer-events: none;
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				width: 100%;
				opacity: 0;
				border-radius: 8px 8px 0 0;

				.cl-svg {
					position: absolute;
					bottom: 0;
					color: var(--el-bg-color);

					&:first-child {
						left: -14px;
						transform: scaleX(-1);
					}

					&:last-child {
						right: -14px;
					}
				}
			}

			&:hover {
				// color: #000;
			}

			&.is-active {
				color: var(--color-primary);

				.arc {
					background-color: var(--el-bg-color);
					opacity: 1;
				}
			}
		}
	}

	&__name {
		margin-left: 8px;
	}
}
</style>
