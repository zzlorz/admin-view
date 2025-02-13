import { isFunction } from 'lodash-es';
import { isRef } from 'vue';

// 获取值
export function getValue(data: any, params?: any) {
	if (isRef(data)) {
		return data.value;
	} else {
		if (isFunction(data)) {
			return data(params);
		} else {
			return data;
		}
	}
}
