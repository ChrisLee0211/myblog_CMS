import { useState, useCallback } from "react";

/**
 * 用于开关弹窗、抽屉等可视组件的hook工具
 * @param initState 用于控制弹窗是否显示的初始值
 * @returns 返回一个数组。包括下面几个结果
 * @returns visible 用于控制开关的布尔值变量
 * @returns open 用于开启弹窗的回调函数
 * @returns close 用于关闭弹窗的回调函数
 */
export const useVisible = (initState: boolean): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState<boolean>(initState);
    const open = useCallback(() => {
        setVisible(true);
    }, []);
    const close = useCallback(() => {
        setVisible(false);
    }, []);
    return [visible, open, close];
};
