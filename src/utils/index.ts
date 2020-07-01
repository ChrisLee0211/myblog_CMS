import intl from "react-intl-universal";

/**
 * 颜色取反
 * @param OldColorValue 十六进制颜色码
 * @returns color 取反后的十六进制颜色码
 * @author chrislee
 * @Time 2020/4/16
 */
export function ColorReverse(OldColorValue: string) {
    const reverse = `0x${OldColorValue.replace(/#/g, "")}`;
    const str = `000000${(0xffffff - (reverse as any)).toString(16)}`;
    return `#${str.substring(str.length - 6, str.length)}`;
}

/**
 * 数组删除指定元素
 * @param array 数组
 * @param delItem 待删除元素
 * @returns 新的数组
 * @author Ming07
 */
export function ArrayRemoveItem(array: string[], delItem: string): string[] {
    const temp = [...array];
    const index = temp.indexOf(delItem);
    if (index > -1) {
        temp.splice(index, 1);
    }
    return temp;
}

interface FormatObj {
    [y: string]: number;
      m: number;
      d: number;
      h: number;
      i: number;
      s: number;
      a: number;
  }
  /**
   * 将时间戳转化为时间字符串
   * @description 时间戳 => '2020.1.09 12:22:22'
   * @author chrislee
   * @since 2020/2/10
   */
export function parseTime(time: number|string, cFormat?: string) {
    if (arguments.length === 0 || time === null || time === "") {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date: Date;
    if (typeof time === "object") {
        date = time;
    } else {
        if ((`${time}`).length === 10) { time = parseInt(String(time), 10) * 1000; }
        date = new Date(time);
    }
    const formatObj: FormatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = String(formatObj[key]);
        if (key === "a") { return ["一", "二", "三", "四", "五", "六", "日"][Number(value) - 1]; }
        if (result.length > 0 && Number(value) < 10) {
            value = `0${value}`;
        }
        return value || "0";
    });
    return time_str;
}


/**
 * 普通对象
 */
interface normal {
    [name: string]: any;
}

/**
 * 树节点
 * @author Ming07
 */
export interface TreeNode {
    /**
     * 树形唯一id
     */
    key: string;
    /**
     * 树节点名称
     */
    title: string;
    /**
     * 是否叶子节点
     */
    isLeaf?: boolean;
    /**
     * 子节点集合
     */
    children?: TreeNode[];
    /**
     * 树节点的名称
     * @description 路由翻译需要用到(以后或许会删除)
     */
    name?: string;
}

/**
 * 普通数组转换成树形数组
 * @param array 待转换数组
 * @param nodeKey 树节点Key
 * @param titleKey 树节点标题字段key
 * @param isLeafKey 树节点isLeaf字段key
 * @author Ming07
 */
export function ArrayToTree(array: normal[], nodeKey: string, titleKey: string, isLeafKey?: string): TreeNode[] {
    return array.map((item) => {
        if (isLeafKey) {
            const treeNode: TreeNode = {
                key: String(item[nodeKey]),
                title: item[titleKey],
                isLeaf: item[isLeafKey]
            };
            return treeNode;
        }
        const treeNode = {
            key: String(item[nodeKey]),
            title: item[titleKey],
            isLeaf: true
        };
        return treeNode;
    });
}

/**
 * Checker 选项
 * @author Ming07
 */
export interface CheckItem {
    /**
     * 选项Id
     * @description 必须唯一,不然会影响后续操作
     */
    value: string;
    /**
     * 选项名称
     */
    label: string;
    /**
     * 是否选中
     */
    isCheck: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}
/**
 * 普通数组转换成Checker数组
 * @param array 待转换数组
 * @param valueKey value字段名
 * @param labelKey label字段名
 * @param isCheckKey isCheck字段名
 * @author Ming07
 */
export function ArrayToChecker(array: normal[], valueKey: string, labelKey: string, isCheckKey: string): CheckItem[] {
    return array.map((item) => {
        const checker = {
            value: item[valueKey],
            label: item[labelKey],
            isCheck: typeof item[isCheckKey] === "boolean" ? item[isCheckKey] : item[isCheckKey] === 1,
            disabled: item.disabled || false
        };
        return checker;
    });
}
/**
 * 选项
 * @author Ming07
 */
export interface Option {
    /**
     * 选项值
     */
    value: string | number;
    /**
     * 选项名称
     */
    label?: React.ReactNode;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 选项子集
     */
    children?: Option[];
}

/**
 * 普通数组转换成option数组
 * @param array 待转换数组
 * @param valueKey value字段名
 * @param labelKey label字段名
 * @author Ming07
 */
export function ArrayToOptions(array: normal[], valueKey: string, labelKey: string): Option[] {
    return array.map((item) => {
        const option: Option = {
            value: item[valueKey],
            label: item[labelKey],
            disabled: item.disabled || false
        };
        if (item.children) {
            option.children = ArrayToOptions(item.children, valueKey, labelKey);
        }
        return option;
    });
}

/**
 * 转换普通的选项内容，递归抹平子级返回平级数据
 * @param arr 值数组
 * @param options 需要遍历的值数组
 * @returns 返回完整路径的父级名称
 */
interface OptionsParams {
    value: any;
    label: string;
    children?: Array<OptionsParams>;
}
export function formatOptions(arr: Array<string | number>, options: OptionsParams[]): string {
    if (arr.length > 0 && arr[0] !== 0) {
        const newArr: OptionsParams[] = [];
        const getStr = (list: OptionsParams[]): OptionsParams[] => {
            list.forEach((row) => {
                if (row.children && row.children.length > 0) {
                    newArr.push(row);
                    getStr(row.children);
                } else {
                    newArr.push(row);
                }
            });
            return newArr;
        };
        getStr(options);
        const strArr: string[] = [];
        arr.forEach((record) => {
            newArr.forEach((records) => {
                if (records.value === record) {
                    strArr.push(records.label);
                }
            });
        });
        return strArr.join(" / ");
    }
    return intl.get("table.topLevel");
    // return "顶级";
}

/**
 * 函数防抖
 * @param fn 要进行防抖的函数
 * @param delay 防抖的间隔事件，单位ms
 * @author chrislee
 * @Time 2020/6/24
 */
export const debounce = (fn: Function, delay = 500): Function => {
    let timer: NodeJS.Timeout = null as any;
    return function (this: any, ...args: any): void {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
