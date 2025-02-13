import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => void;
    };
    data: {
        type: ObjectConstructor;
        default: () => {};
    };
    items: {
        type: PropType<ClForm.Item[]>;
        default: () => never[];
    };
    resetBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapse: BooleanConstructor;
    onLoad: FunctionConstructor;
    onSearch: FunctionConstructor;
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "reset"[], "reset", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: ObjectConstructor;
        default: () => void;
    };
    data: {
        type: ObjectConstructor;
        default: () => {};
    };
    items: {
        type: PropType<ClForm.Item[]>;
        default: () => never[];
    };
    resetBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapse: BooleanConstructor;
    onLoad: FunctionConstructor;
    onSearch: FunctionConstructor;
}>> & Readonly<{
    onReset?: ((...args: any[]) => any) | undefined;
}>, {
    items: ClForm.Item<any>[];
    props: Record<string, any>;
    inline: boolean;
    data: Record<string, any>;
    resetBtn: boolean;
    collapse: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
