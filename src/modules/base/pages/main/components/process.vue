<template>
	<div class="app-process">
		<ul class="app-process__op">
			<li class="item" @click="toBack">
				<cl-svg name="back" />
			</li>
			<li class="item" @click="toRefresh">
				<cl-svg name="refresh" />
			</li>
			<li class="item" @click="toHome">
				<cl-svg name="home" />
			</li>
		</ul>

		<div class="app-process__container">
			<el-scrollbar :ref="setRefs('scroller')" class="app-process__scroller">
				<div
					v-for="(item, index) in process.list"
					:key="index"
					:ref="setRefs(`item-${index}`)"
					class="app-process__item"
					:class="{ active: item.active }"
					:data-index="index"
					@click="onTap(item, Number(index))"
					@contextmenu.stop.prevent="openCM($event, item)"
				>
					<el-text size="small">{{ item.meta?.label || item.name || item.path }}</el-text>

					<el-icon @mousedown.stop="onDel(Number(index))">
						<close-bold />
					</el-icon>
				</div>
			</el-scrollbar>
		</div>

		<ul class="app-process__op">
			<li class="item" @click="toFull">
				<cl-svg name="screen-normal" v-if="app.isFull" />
				<cl-svg name="screen-full" v-else />
			</li>
		</ul>
	</div>
</template>

<script lang="ts" name="app-process" setup>
import { onMounted, watch } from 'vue';
import { last } from 'lodash-es';
import { useCool } from '/@/cool';
import { CloseBold } from '@element-plus/icons-vue';
import { ContextMenu } from '@cool-vue/crud';
import { useBase, type Process } from '/$/base';

const { refs, setRefs, route, router, mitt } = useCool();
const { process, app } = useBase();

// 刷新当前路由
function toRefresh() {
	mitt.emit('view.refresh');
}

// 回首页
function toHome() {
	router.push('/');
}

// 返回上一页
function toBack() {
	router.back();
}

// 设置全屏
function toFull() {
	app.setFull(!app.isFull);
}

// 跳转
function toPath() {
	const d = process.list.find(e => e.active);

	if (!d) {
		const next = last(process.list);
		router.push(next ? next.fullPath : '/');
	}
}

// 移动到
function scrollTo(left: number) {
	refs.scroller.wrapRef.scrollTo({
		left,
		behavior: 'smooth'
	});
}

// 调整滚动位置
function adScroll(index: number) {
	const el = refs[`item-${index}`];

	if (el) {
		scrollTo(el.offsetLeft - (refs.scroller.wrapRef.clientWidth + el.clientWidth) / 2);
	}
}

// 选择
function onTap(item: Process.Item, index: number) {
	adScroll(index);
	router.push(item.fullPath);
}

// 删除
function onDel(index: number) {
	process.remove(index);
	toPath();
}

// 右键菜单
function openCM(e: any, item: Process.Item) {
	ContextMenu.open(e, {
		hover: {
			target: 'app-process__item'
		},
		list: [
			{
				label: '关闭当前',
				hidden: item.path !== route.path,
				callback(done) {
					done();

					process.close();
					toPath();
				}
			},
			{
				label: '关闭其他',
				callback(done) {
					done();

					process.set(process.list.filter(e => e.fullPath == item.fullPath));
					toPath();
				}
			},
			{
				label: '关闭所有',
				callback(done) {
					done();

					process.clear();
					toPath();
				}
			}
		]
	});
}

watch(
	() => route.path,
	function (val) {
		adScroll(process.list.findIndex(e => e.fullPath === val) || 0);
	}
);

onMounted(() => {
	// 添加滚轮事件监听器
	refs.scroller.wrapRef?.addEventListener('wheel', function (event: WheelEvent) {
		// 阻止默认滚动行为
		event.preventDefault();

		// 滚动的速度因子，可以根据需要调整
		const scrollSpeed = 2;

		// 计算滚动的距离
		const distance = event.deltaY * scrollSpeed;

		scrollTo(refs.scroller.wrapRef.scrollLeft + distance);
	});
});
</script>

<style lang="scss" scoped>
.app-process {
	display: flex;
	align-items: center;
	position: relative;
	padding: 5px 10px;
	user-select: none;
	background-color: var(--el-bg-color);
	box-sizing: border-box;
	margin-bottom: 10px;

	&__op {
		list-style: none;

		.item {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			position: relative;
			height: 26px;
			width: 26px;
			cursor: pointer;
			border-radius: 4px;
			margin-right: 5px;

			.cl-svg {
				font-size: 16px;
			}

			&:hover {
				background-color: var(--el-fill-color-light);
			}
		}
	}

	&__container {
		height: 30px;
		flex: 1;
		position: relative;
		overflow: hidden;
		margin: 0 5px;
	}

	&__scroller {
		height: 40px;
		width: 100%;
		white-space: nowrap;
		position: absolute;
		left: 0;
		top: 0;
	}

	&__item {
		display: inline-flex;
		align-items: center;
		border-radius: 4px;
		height: 30px;
		padding: 0 8px 0 12px;
		margin-right: 10px;
		cursor: pointer;
		color: var(--el-color-info);

		.el-text {
			line-height: 1;
		}

		.el-icon {
			font-size: 13px;
			width: 0;
			overflow: hidden;
			transition: width 0.3s;
			opacity: 0;
			border-radius: 20px;
			padding: 2px;

			&:hover {
				background-color: rgba(0, 0, 0, 0.2);
				color: #fff;
			}
		}

		&:last-child {
			margin-right: 0;
		}

		&:hover {
			&:not(.active) {
				background-color: var(--el-fill-color-light);
			}
		}

		&.active {
			background-color: var(--color-primary);

			.el-text {
				color: #fff;
			}

			.el-icon {
				color: #fff;
			}
		}

		&:hover,
		&.active {
			.el-icon {
				opacity: 1;
				width: 13px;
				margin-left: 5px;
			}
		}
	}
}
</style>
