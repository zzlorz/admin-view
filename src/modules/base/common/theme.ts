import { config } from '/@/config';
import { createLink } from '../utils';

// 字体图标库加载
if (config.app.iconfont) {
	config.app.iconfont.forEach((e: string) => {
		createLink(e);
	});
}
