<template>
	<a-menu v-if="app.info.menu.isGroup" />

	<div class="app-topbar">
		<div class="app-topbar__collapse" @click="app.fold()">
			<cl-svg name="fold" v-if="app.isFold" />
			<cl-svg name="expand" v-else />
		</div>

		<!-- 路由导航 -->
		<route-nav />

		<div class="flex1"></div>

		<!-- 工具栏 -->
		<ul class="app-topbar__tools">
			<li v-for="(item, index) in toolbarComponents" :key="index">
				<component :is="item.component" />
			</li>
		</ul>

		<!-- 用户信息 -->
		<template v-if="user.info">
			<el-dropdown
				hide-on-click
				popper-class="app-topbar__user-popper"
				:popper-options="{}"
				@command="onCommand"
			>
				<div class="app-topbar__user">
					<el-text class="name">{{ user.info.nickName }}</el-text>
					<cl-avatar :size="28" :src="user.info.headImg" />
				</div>

				<template #dropdown>
					<div class="user">
						<cl-avatar :size="32" :src="user.info.headImg" />

						<div class="det">
							<el-text tag="p" size="small">{{ user.info.nickName }}</el-text>
							<el-text size="small" type="info">{{ user.info.email }}</el-text>
						</div>
					</div>

					<el-dropdown-menu>
						<el-dropdown-item command="my">
							<cl-svg name="my" />
							<span>个人中心</span>
						</el-dropdown-item>
						<el-dropdown-item command="exit">
							<cl-svg name="exit" />
							<span>退出登录</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</template>
	</div>
</template>

<script lang="ts" name="app-topbar" setup>
import { computed, markRaw, onMounted, reactive } from 'vue';
import { isFunction, orderBy } from 'lodash-es';
import { useBase } from '/$/base';
import { module, useCool } from '/@/cool';
import RouteNav from './route-nav.vue';
import AMenu from './amenu.vue';
import { ElMessageBox } from 'element-plus';

const { router, service, browser } = useCool();
const { user, app } = useBase();

// 命令事件
async function onCommand(name: string) {
	switch (name) {
		case 'my':
			router.push('/my/info');
			break;
		case 'exit':
			ElMessageBox.confirm('确定退出登录吗？', '提示', {
				type: 'warning'
			})
				.then(async () => {
					await service.base.comm.logout();
					user.logout();
				})
				.catch(() => null);
			break;
	}
}

// 工具栏
const toolbar = reactive({
	list: [] as any[],

	async init() {
		const arr = orderBy(module.list.map(e => e.toolbar).filter(Boolean), 'order');

		this.list = await Promise.all(
			arr.map(async e => {
				if (e) {
					const c = await (isFunction(e.component) ? e.component() : e.component);

					return {
						...e,
						component: markRaw(c.default)
					};
				}
			})
		);
	}
});

// 工具栏组件
const toolbarComponents = computed(() => {
	return toolbar.list.filter(e => {
		if (browser.isMini) {
			return e?.h5 ?? true;
		}

		return e?.pc ?? true;
	});
});

onMounted(() => {
	toolbar.init();
});
</script>

<style lang="scss" scoped>
.app-topbar {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	background-color: var(--el-bg-color);
	border-bottom: 1px solid var(--el-border-color-extra-light);
	box-sizing: border-box;
	transition: height 0.2s ease-in-out;

	&__collapse {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		width: 30px;
		cursor: pointer;
		border-radius: 4px;

		.cl-svg {
			font-size: 14px;
		}

		&:hover {
			background-color: var(--el-color-info-light-9);
		}
	}

	.flex1 {
		flex: 1;
	}

	&__tools {
		display: flex;
		margin-right: 20px;

		& > li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			height: 45px;
			cursor: pointer;
		}
	}

	&__user {
		display: flex;
		align-items: center;
		outline: none;
		margin-right: 10px;
		cursor: pointer;

		.name {
			white-space: nowrap;
			margin-right: 10px;
		}
	}
}
</style>

<style lang="scss">
.app-topbar__user-popper {
	border-radius: 6px;

	.el-popper__arrow {
		display: none;
	}

	.el-dropdown-menu__item {
		padding: 6px 12px;
		font-size: 12px;
	}

	.user {
		display: flex;
		align-items: center;
		padding: 10px 10px;
		width: 200px;
		border-bottom: 1px solid var(--el-color-info-light-9);

		.det {
			margin-left: 10px;
			flex: 1;
		}
	}

	.cl-svg {
		margin-right: 6px;
		font-size: 14px;
	}
}
</style>
