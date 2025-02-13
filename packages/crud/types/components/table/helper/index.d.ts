export declare function useTable(props: any): {
    Table: import("vue").Ref<any, any>;
    config: {
        columns: {
            [x: string]: any;
            type: ClTable.ColumnType;
            hidden: boolean | {
                value: boolean;
            };
            component: {
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
            };
            search: {
                isInput: boolean;
                value: any;
                refreshOnChange: boolean;
                component: {
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
                };
            };
            dict: {
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
            };
            dictFormatter: (values: DictOptions) => string;
            dictColor: boolean;
            dictSeparator: string;
            dictAllLevels: boolean;
            buttons: ((options: {
                scope: any;
            }) => ClTable.OpButton) | ("info" | "delete" | "edit" | AnyString | `slot-${string}` | {
                [x: string]: any;
                label: string;
                type?: string | undefined;
                hidden?: boolean | undefined;
                onClick: (options: {
                    scope: obj;
                }) => void;
            })[];
            align: ElementPlus.Align;
            label: any;
            className: string;
            prop: string & {};
            orderNum: number;
            width: string | number | {
                value: string | number;
            };
            minWidth: string | number | {
                value: string | number;
            };
            renderHeader: (options: {
                column: any;
                $index: number;
            }) => any;
            sortable: boolean | "desc" | "descending" | "ascending" | "asc" | "custom";
            sortMethod: fn;
            sortBy: string | any[] | ((row: any, index: number) => any);
            resizable: boolean;
            columnKey: string;
            headerAlign: ElementPlus.Align;
            showOverflowTooltip: boolean;
            fixed: boolean | string;
            formatter: (row: any, column: any, value: any, index: number) => any;
            selectable: (row: any, index: number) => boolean;
            reserveSelection: boolean;
            filterMethod: fn;
            filteredValue: unknown[];
            filters: unknown[];
            filterPlacement: string;
            filterMultiple: boolean;
            index: ((index: number) => number) | number;
            sortOrders: unknown[];
            children: /*elided*/ any[];
        }[];
        autoHeight: boolean;
        height: any;
        contextMenu: ("info" | "update" | "delete" | "edit" | "refresh" | {
            [x: string]: any;
            label: string;
            prefixIcon?: any;
            suffixIcon?: any;
            ellipsis?: boolean | undefined;
            disabled?: boolean | undefined;
            hidden?: boolean | undefined;
            children?: /*elided*/ any[] | undefined;
            showChildren?: boolean | undefined;
            callback?: ((done: fn) => void) | undefined;
        } | ((row: obj, column: obj, event: PointerEvent) => ClContextMenu.Item) | "check" | "order-desc" | "order-asc")[];
        defaultSort: {
            prop: string;
            order: "descending" | "ascending";
        };
        sortRefresh: boolean;
        emptyText: string;
        rowKey: string;
        plugins?: ClTable.Plugin[] | undefined;
        onRowContextmenu?: ((row: any, column: any, event: any) => void) | undefined;
    };
};
export * from "./data";
export * from "./height";
export * from "./op";
export * from "./render";
export * from "./row";
export * from "./selection";
export * from "./sort";
export * from "./header";
