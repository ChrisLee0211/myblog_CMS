import { useEffect, useState } from "react";

/**
 * 返回一个具有防抖特性的值，短时间内高频改动值返回最后一次新值
 * @param value 防抖值
 * @param delay 延迟
 * @author chrislee
 * @Time 2020/5/20
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );
    return debouncedValue;
};
