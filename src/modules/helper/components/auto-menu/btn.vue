<template>
	<div class="btn" @click="toCode">
		<span>AI 极速编码</span>
	</div>
</template>

<script lang="ts" name="auto-menu" setup>
import { useCool } from '/@/cool';

const { router, browser } = useCool();

function toCode() {
	router.push('/helper/ai-code');
}
</script>

<style lang="scss" scoped>
.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	background-color: #2f3447;
	color: #fff;
	position: relative;
	border-radius: 4px;
	padding: 0 10px;
	white-space: nowrap;
	letter-spacing: 1px;
	line-height: 1;
	height: 28px;
	margin-right: 10px;
	transition: background-color 0.2s;

	span {
		&:nth-child(1) {
			color: #fff;
		}
	}

	&:hover {
		background-color: var(--color-primary);
	}
}
</style>
