export declare function useForm(): {
    Form: import("vue").Ref<any, any>;
    config: {
        [x: string]: any;
        title?: any;
        height?: any;
        width?: any;
        props: {
            [x: string]: any;
            inline?: boolean | undefined;
            labelPosition?: "left" | "right" | "top" | undefined;
            labelWidth?: string | number | undefined;
            labelSuffix?: string | undefined;
            hideRequiredAsterisk?: boolean | undefined;
            showMessage?: boolean | undefined;
            inlineMessage?: boolean | undefined;
            statusIcon?: boolean | undefined;
            validateOnRuleChange?: boolean | undefined;
            size?: ElementPlus.Size | undefined;
            disabled?: boolean | undefined;
        };
        items: {
            [x: string]: any;
            type?: "tabs" | undefined;
            prop?: (string & {}) | undefined;
            props?: {
                [x: string]: any;
                labels?: {
                    [x: string]: any;
                    label: string;
                    value: string;
                    name?: string | undefined;
                    icon?: any;
                    lazy?: boolean | undefined;
                }[] | undefined;
                justify?: "left" | "center" | "right" | undefined;
                color?: string | undefined;
                mergeProp?: boolean | undefined;
                labelWidth?: string | undefined;
                error?: string | undefined;
                showMessage?: boolean | undefined;
                inlineMessage?: boolean | undefined;
                size?: "medium" | "default" | "small" | undefined;
            } | undefined;
            span?: number | undefined;
            col?: {
                span: number;
                offset: number;
                push: number;
                pull: number;
                xs: any;
                sm: any;
                md: any;
                lg: any;
                xl: any;
                tag: string;
            } | undefined;
            group?: string | undefined;
            collapse?: boolean | undefined;
            value?: any;
            label?: string | undefined;
            renderLabel?: any;
            flex?: boolean | undefined;
            hook?: "string" | "number" | "boolean" | "join" | AnyString | "empty" | "split" | "booleanNumber" | "datetimeRange" | "splitJoin" | "json" | {
                bind?: (ClForm.Hook["Pipe"] | ClForm.Hook["Pipe"][]) | undefined;
                submit?: (ClForm.Hook["Pipe"] | ClForm.Hook["Pipe"][]) | undefined;
                reset?: ((prop: string) => string[]) | undefined;
            } | undefined;
            hidden?: boolean | ((options: {
                scope: obj;
            }) => boolean) | undefined;
            prepend?: {
                [x: string]: any;
                name?: string | undefined;
                options?: {
                    [x: string]: any;
                    label?: string | undefined;
                    value?: any;
                    color?: string | undefined;
                    type?: string | undefined;
                }[] | {
                    value: {
                        [x: string]: any;
                        label?: string | undefined;
                        value?: any;
                        color?: string | undefined;
                        type?: string | undefined;
                    }[];
                } | undefined;
                props?: {
                    [x: string]: any;
                    onChange?: ((value: any) => void) | undefined;
                } | {
                    value: {
                        [x: string]: any;
                        onChange?: ((value: any) => void) | undefined;
                    };
                } | undefined;
                style?: obj | undefined;
                slots?: {
                    [key: string]: (data?: any) => any;
                } | undefined;
                vm?: any;
            } | undefined;
            component?: {
                [x: string]: any;
                name?: string | undefined;
                options?: {
                    [x: string]: any;
                    label?: string | undefined;
                    value?: any;
                    color?: string | undefined;
                    type?: string | undefined;
                }[] | {
                    value: {
                        [x: string]: any;
                        label?: string | undefined;
                        value?: any;
                        color?: string | undefined;
                        type?: string | undefined;
                    }[];
                } | undefined;
                props?: {
                    [x: string]: any;
                    onChange?: ((value: any) => void) | undefined;
                } | {
                    value: {
                        [x: string]: any;
                        onChange?: ((value: any) => void) | undefined;
                    };
                } | undefined;
                style?: obj | undefined;
                slots?: {
                    [key: string]: (data?: any) => any;
                } | undefined;
                vm?: any;
            } | undefined;
            append?: {
                [x: string]: any;
                name?: string | undefined;
                options?: {
                    [x: string]: any;
                    label?: string | undefined;
                    value?: any;
                    color?: string | undefined;
                    type?: string | undefined;
                }[] | {
                    value: {
                        [x: string]: any;
                        label?: string | undefined;
                        value?: any;
                        color?: string | undefined;
                        type?: string | undefined;
                    }[];
                } | undefined;
                props?: {
                    [x: string]: any;
                    onChange?: ((value: any) => void) | undefined;
                } | {
                    value: {
                        [x: string]: any;
                        onChange?: ((value: any) => void) | undefined;
                    };
                } | undefined;
                style?: obj | undefined;
                slots?: {
                    [key: string]: (data?: any) => any;
                } | undefined;
                vm?: any;
            } | undefined;
            rules?: {
                [x: string]: any;
                type?: "string" | "number" | "boolean" | "method" | "regexp" | "integer" | "float" | "array" | "object" | "enum" | "date" | "url" | "hex" | "email" | "any" | undefined;
                required?: boolean | undefined;
                message?: string | undefined;
                min?: number | undefined;
                max?: number | undefined;
                trigger?: any;
                validator?: ((rule: any, value: any, callback: (error?: Error) => void) => void) | undefined;
            } | {
                [x: string]: any;
                type?: "string" | "number" | "boolean" | "method" | "regexp" | "integer" | "float" | "array" | "object" | "enum" | "date" | "url" | "hex" | "email" | "any" | undefined;
                required?: boolean | undefined;
                message?: string | undefined;
                min?: number | undefined;
                max?: number | undefined;
                trigger?: any;
                validator?: ((rule: any, value: any, callback: (error?: Error) => void) => void) | undefined;
            }[] | undefined;
            required?: boolean | undefined;
            children?: /*elided*/ any[] | undefined;
        }[];
        form: obj;
        isReset?: boolean | undefined;
        on?: {
            open?: ((data: any) => void) | undefined;
            close?: ((action: ClForm.CloseAction, done: fn) => void) | undefined;
            submit?: ((data: any, event: {
                close: fn;
                done: fn;
            }) => void) | undefined;
            change?: ((data: any, prop: string) => void) | undefined;
        } | undefined;
        op: {
            hidden?: boolean | undefined;
            saveButtonText?: string | undefined;
            closeButtonText?: string | undefined;
            justify?: "flex-start" | "center" | "flex-end" | undefined;
            buttons?: (`slot-${string}` | ClForm.CloseAction | {
                [x: string]: any;
                label: string;
                type?: string | undefined;
                hidden?: boolean | undefined;
                onClick: (options: {
                    scope: obj;
                }) => void;
            })[] | undefined;
        };
        dialog: {
            [x: string]: any;
            title?: any;
            height?: string | undefined;
            width?: string | undefined;
            hideHeader?: boolean | undefined;
            controls?: Array<"fullscreen" | "close" | AnyString> | undefined;
        };
    };
    form: obj;
    visible: import("vue").Ref<boolean, boolean>;
    saving: import("vue").Ref<boolean, boolean>;
    loading: import("vue").Ref<boolean, boolean>;
    disabled: import("vue").Ref<boolean, boolean>;
};
export * from "./action";
export * from "./api";
export * from "./plugins";
export * from "./tabs";
