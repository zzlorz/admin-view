import type { ModuleConfig } from '/@/cool';
import ElementPlus from 'element-plus';
import './css/index.scss';

export default (): ModuleConfig => {
	return {
		order: 100,
		label: 'Element Ui',
		description: 'Element Plus 变量、样式配置',
		author: 'COOL',
		version: '1.0.0',
		updateTime: '2024-07-22',
		doc: 'https://element-plus.org/zh-CN/component/overview.html',
		install(app) {
			app.use(ElementPlus);
		}
	};
};
