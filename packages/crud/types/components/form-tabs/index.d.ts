import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: (NumberConstructor | StringConstructor)[];
    labels: {
        type: ArrayConstructor;
        default: () => never[];
    };
    justify: {
        type: PropType<"start" | "end" | "left" | "right" | "center" | "justify" | "match-parent">;
        default: string;
    };
    type: {
        type: PropType<"card" | "default">;
        default: string;
    };
}>, () => any, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: (NumberConstructor | StringConstructor)[];
    labels: {
        type: ArrayConstructor;
        default: () => never[];
    };
    justify: {
        type: PropType<"start" | "end" | "left" | "right" | "center" | "justify" | "match-parent">;
        default: string;
    };
    type: {
        type: PropType<"card" | "default">;
        default: string;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "default" | "card";
    labels: unknown[];
    justify: "center" | "left" | "right" | "justify" | "start" | "end" | "match-parent";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
