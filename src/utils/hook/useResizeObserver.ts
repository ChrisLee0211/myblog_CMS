import { useEffect, useState, useRef } from "react";
import { debounce } from "../index";

type rectContentType = Omit<DOMRectReadOnly, "toJSON">
type boxType = "content-box" | "border-box"

/**
 * 对单个元素进行resize事件监听,启用了值防抖提高性能
 * @param ele 元素的ref引用
 * @returns {Array} 返回一个数组[ref , rectContent]，第一个是元素引用，第二个是该元素resize后最终的大小和位置信息
 * @author chrislee
 * @Time 2020/6/23
 */
export const useResizeObserver: <T>(opt?: boxType) => [React.RefObject<T>, rectContentType] = (opt = "border-box") => {
    const ref = useRef<any>(null);
    const [rectContent, setRectContent] = useState({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const debounceSetRectContent = debounce((content: typeof rectContent) => {
            setRectContent(content);
        }, 100);
        const resizer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                debounceSetRectContent(entries[0].contentRect);
            }
        });
        resizer.observe(ref.current, { box: opt });
        return (): void => { resizer.unobserve(ref.current); };
    }, []);
    return [ref, rectContent];
};
