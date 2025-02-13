import { defineComponent, h, nextTick, toRef, watch } from "vue";
import { assign, cloneDeep, isBoolean, keys } from "lodash-es";
import { useAction, useForm, usePlugins, useTabs } from "./helper";
import { useBrowser, useConfig, useElApi, useRefs } from "../../hooks";
import { getValue, merge } from "../../utils";
import formHook from "../../utils/form-hook";
import { renderNode } from "../../utils/vnode";
import { parseFormHidden } from "../../utils/parse";

export default defineComponent({
	name: "cl-form",

	props: {
		inner: Boolean,
		inline: Boolean,
		enablePlugin: {
			type: Boolean,
			default: true
		}
	},

	setup(props, { expose, slots }) {
		const { refs, setRefs } = useRefs();
		const { style, dict } = useConfig();
		const browser = useBrowser();
		const { Form, config, form, visible, saving, loading, disabled } = useForm();

		// 关闭的操作类型
		let closeAction: ClForm.CloseAction = "close";

		// 旧表单数据
		let defForm: obj | undefined;

		// 选项卡
		const Tabs = useTabs({ config, Form });

		// 操作
		const Action = useAction({ config, form, Form });

		// 方法
		const ElFormApi = useElApi(
			["validate", "validateField", "resetFields", "scrollToField", "clearValidate"],
			Form
		);

		// 插件
		const plugin = usePlugins(props.enablePlugin, { visible });

		// 显示加载中
		function showLoading() {
			loading.value = true;
		}

		// 隐藏加载
		function hideLoading() {
			loading.value = false;
		}

		// 设置是否禁用
		function setDisabled(val: boolean = true) {
			disabled.value = val;
		}

		// 请求表单保存状态
		function done() {
			saving.value = false;
		}

		// 关闭表单
		function close(action?: ClForm.CloseAction) {
			if (action) {
				closeAction = action;
			}

			beforeClose(() => {
				visible.value = false;
				done();
			});
		}

		// 关闭前
		function beforeClose(done: fn) {
			if (config.on?.close) {
				config.on.close(closeAction, done);
			} else {
				done();
			}
		}

		// 关闭后
		function onClosed() {
			Tabs.clear();
			Form.value?.clearValidate();
		}

		// 清空表单验证
		function clear() {
			for (const i in form) {
				delete form[i];
			}

			setTimeout(() => {
				Form.value?.clearValidate();
			}, 0);
		}

		// 重置
		function reset() {
			if (defForm) {
				for (const i in defForm) {
					form[i] = cloneDeep(defForm[i]);
				}
			}
		}

		// 转换表单值，处理多层级等数据
		function invokeData(d: any) {
			for (const i in d) {
				if (i.includes("-")) {
					// 结构参数
					const [a, ...arr] = i.split("-");

					// 关键值的key
					const k: string = arr.pop() || "";

					if (!d[a]) {
						d[a] = {};
					}

					let f: any = d[a];

					// 设置默认值
					arr.forEach((e) => {
						if (!f[e]) {
							f[e] = {};
						}

						f = f[e];
					});

					// 设置关键值
					f[k] = d[i];

					delete d[i];
				}
			}
		}

		// 表单提交
		function submit(callback?: fn) {
			// 验证表单
			Form.value.validate(async (valid: boolean, error: any) => {
				if (valid) {
					saving.value = true;

					// 拷贝表单值
					const d = cloneDeep(form);

					config.items.forEach((e) => {
						function deep(e: ClForm.Item) {
							if (e.prop) {
								// 过滤隐藏的表单项
								if (e._hidden) {
									if (e.prop) {
										delete d[e.prop];
									}
								}

								// hook 提交处理
								if (e.hook) {
									formHook.submit({
										...e,
										value: e.prop ? d[e.prop] : undefined,
										form: d
									});
								}
							}

							if (e.children) {
								e.children.forEach(deep);
							}
						}

						deep(e);
					});

					// 处理数据
					invokeData(d);

					const submit = callback || config.on?.submit;

					// 提交事件
					if (submit) {
						submit(await plugin.submit(d), {
							close() {
								close("save");
							},
							done
						});
					} else {
						done();
					}
				} else {
					// 切换到对应的选项卡
					Tabs.toGroup({
						refs,
						config,
						prop: keys(error)[0]
					});
				}
			});
		}

		// 打开表单
		function open(options?: ClForm.Options, plugins?: ClForm.Plugin[]) {
			if (!options) {
				return console.error("Options is not null");
			}

			// 清空
			if (options.isReset !== false) {
				clear();
			}

			// 显示对话框
			visible.value = true;

			// 默认关闭方式
			closeAction = "close";

			// 合并配置
			for (const i in config) {
				switch (i) {
					// 表单项
					case "items":
						function deep(arr: any[]): any[] {
							return arr.map((e) => {
								const d = getValue(e);

								return {
									...d,
									children: d?.children ? deep(d.children) : undefined
								};
							});
						}

						config.items = deep(options.items || []);
						break;
					// 事件、参数、操作
					case "on":
					case "op":
					case "props":
					case "dialog":
					case "_data":
						merge(config[i], options[i] || {});
						break;
					// 其他
					default:
						config[i] = options[i];
						break;
				}
			}

			// 预设表单值
			if (options?.form) {
				for (const i in options.form) {
					form[i] = options.form[i];
				}
			}

			// 设置表单数据
			config.items.forEach((e) => {
				function deep(e: ClForm.Item) {
					if (e.prop) {
						// 解析 prop
						if (e.prop.includes(".")) {
							e.prop = e.prop.replace(/\./g, "-");
						}

						// prop 合并
						Tabs.mergeProp(e);

						// hook 绑定值
						formHook.bind({
							...e,
							value: form[e.prop] !== undefined ? form[e.prop] : cloneDeep(e.value),
							form
						});

						// 表单验证
						if (e.required) {
							e.rules = {
								required: true,
								message: `${e.label}${dict.label.nonEmpty}`
							};
						}
					}

					// 设置 tabs 默认值
					if (e.type == "tabs") {
						Tabs.set(e.value);
					}

					// 子集
					if (e.children) {
						e.children.forEach(deep);
					}
				}

				deep(e);
			});

			// 设置默认值
			if (!defForm) {
				defForm = cloneDeep(form);
			}

			// 创建插件
			plugin.create(plugins);

			// 打开回调
			nextTick(() => {
				setTimeout(() => {
					// 打开事件
					if (config.on?.open) {
						config.on.open(form);
					}
				}, 10);
			});
		}

		// 绑定表单数据
		function bindForm(data: any) {
			config.items.forEach((e) => {
				function deep(e: ClForm.Item) {
					formHook.bind({
						...e,
						value: e.prop ? data[e.prop] : undefined,
						form: data
					});

					if (e.children) {
						e.children.forEach(deep);
					}
				}

				deep(e);
			});

			assign(form, data);
		}

		// 渲染表单项
		function renderFormItem(e: ClForm.Item) {
			const { isDisabled } = config._data;

			if (e.type == "tabs") {
				return (
					<cl-form-tabs v-model={Tabs.active.value} {...e.props} onChange={Tabs.onLoad} />
				);
			}

			// 是否隐藏
			e._hidden = parseFormHidden(e.hidden, {
				scope: form
			});

			// 分组显示
			const inGroup = e.group ? e.group === Tabs.active.value : true;

			// 是否已加载完成
			const isLoaded = e.component && Tabs.isLoaded(e.group);

			// 表单项
			const FormItem = h(
				<el-form-item
					class={{
						"no-label": !(e.renderLabel || e.label),
						"has-children": !!e.children
					}}
					key={e.prop}
					data-group={e.group || "-"}
					data-prop={e.prop || "-"}
					label-width={props.inline ? "auto" : ""}
					label={e.label}
					prop={e.prop}
					rules={isDisabled ? null : e.rules}
					required={e._hidden ? false : e.required}
					v-show={inGroup && !e._hidden}
				/>,
				e.props,
				{
					label() {
						if (e.renderLabel) {
							return renderNode(e.renderLabel, {
								scope: form,
								render: "slot",
								slots
							});
						} else {
							return e.label;
						}
					},
					default() {
						return (
							<div>
								<div class="cl-form-item">
									{["prepend", "component", "append"]
										.filter((k) => e[k])
										.map((name) => {
											const children = e.children && (
												<div class="cl-form-item__children">
													<el-row gutter={10}>
														{e.children.map(renderFormItem)}
													</el-row>
												</div>
											);

											const Item = renderNode(e[name], {
												item: e,
												prop: e.prop,
												scope: form,
												slots,
												children,
												_data: {
													isDisabled
												}
											});

											return (
												<div
													v-show={!e.collapse}
													class={[
														`cl-form-item__${name}`,
														{
															flex1: e.flex !== false
														}
													]}
													style={e[name].style}>
													{Item}
												</div>
											);
										})}
								</div>

								{isBoolean(e.collapse) && (
									<div
										class="cl-form-item__collapse"
										onClick={() => {
											Action.collapseItem(e);
										}}>
										<el-divider content-position="center">
											{e.collapse
												? dict.label.seeMore
												: dict.label.hideContent}
										</el-divider>
									</div>
								)}
							</div>
						);
					}
				}
			);

			let span = e.span || style.form.span;

			if (browser.isMini) {
				span = 24;
			}

			// 是否行内
			const Item = props.inline ? (
				FormItem
			) : (
				<el-col span={span} {...e.col} v-show={inGroup && !e._hidden}>
					{FormItem}
				</el-col>
			);

			return isLoaded ? Item : null;
		}

		// 渲染表单
		function renderContainer() {
			// 表单项列表
			const children = config.items.map(renderFormItem);

			// 表单标签位置
			const labelPosition =
				browser.isMini && !props.inline
					? "top"
					: config.props.labelPosition || style.form.labelPosition;

			return (
				<div class="cl-form__container" ref={setRefs("form")}>
					{h(
						<el-form
							ref={Form}
							size={style.size}
							label-width={style.form.labelWidth}
							inline={props.inline}
							disabled={saving.value}
							scroll-to-error
							model={form}
							onSubmit={(e: Event) => {
								submit();
								e.preventDefault();
							}}
						/>,
						{
							...config.props,
							labelPosition
						},
						{
							default: () => {
								const items = [
									slots.prepend && slots.prepend({ scope: form }),
									children,
									slots.append && slots.append({ scope: form })
								];

								return (
									<div class="cl-form__items" v-loading={loading.value}>
										{props.inline ? (
											items
										) : (
											<el-row gutter={10}>{items}</el-row>
										)}
									</div>
								);
							}
						}
					)}
				</div>
			);
		}

		// 渲染表单按钮
		function renderFooter() {
			const { hidden, buttons, saveButtonText, closeButtonText, justify } = config.op;

			if (hidden) {
				return null;
			}

			const Btns = buttons?.map((e: any) => {
				switch (e) {
					case "save":
						return (
							<el-button
								type="success"
								size={style.size}
								disabled={loading.value}
								loading={saving.value}
								onClick={() => {
									submit();
								}}>
								{saveButtonText}
							</el-button>
						);
					case "close":
						return (
							<el-button
								size={style.size}
								onClick={() => {
									close("close");
								}}>
								{closeButtonText}
							</el-button>
						);
					default:
						return renderNode(e, {
							scope: form,
							slots,
							custom() {
								return (
									<el-button
										type={e.type}
										{...e.props}
										onClick={() => {
											e.onClick({ scope: form });
										}}>
										{e.label}
									</el-button>
								);
							}
						});
				}
			});

			return (
				<div
					class="cl-form__footer"
					style={{
						justifyContent: justify || "flex-end"
					}}>
					{Btns}
				</div>
			);
		}

		expose({
			refs,
			Form,
			visible,
			saving,
			form,
			config,
			loading,
			disabled,
			open,
			close,
			done,
			clear,
			reset,
			submit,
			invokeData,
			bindForm,
			showLoading,
			hideLoading,
			setDisabled,
			Tabs,
			...Action,
			...ElFormApi
		});

		return () => {
			if (props.inner) {
				return (
					visible.value && (
						<div class="cl-form">
							{renderContainer()}
							{renderFooter()}
						</div>
					)
				);
			} else {
				return h(
					<cl-dialog v-model={visible.value} class="cl-form" />,
					{
						title: config.title,
						height: config.height,
						width: config.width,
						...config.dialog,
						beforeClose,
						onClosed,
						keepAlive: false
					},
					{
						default() {
							return renderContainer();
						},
						footer() {
							return renderFooter();
						}
					}
				);
			}
		};
	}
});
