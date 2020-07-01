import React, { useState, useEffect } from "react";

// 定义接收滚轮方向轴
type shaftType = "x" | "y";

/**
 * 调用方法:
 * import React, { useRef } from "react";
 * import useScroll from "@/utils/hook/useScroll";
 *
 * const RefDom: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
 * const [getScroll, weight] = useScroll(RefDom, "y")
 *
 * console.log(getScroll, weight)
 * <div ref={RefDom}></div>
 */

/**
 * 监听scroll宽高
 * @param RefDom DOM
 * @param shaft 滚轮方向 x | y 轴
 */
function ScrollState(RefDom: React.RefObject<HTMLDivElement>, shaft: shaftType): [number, number] {
    // 获取 X | Y 轴 值
    const [getDomScroll, setDomScroll] = useState(0);

    // 获取 宽度 | 高度 值
    const [getClient, setClient] = useState(0);

    // 监听滚轮事件
    const onScrollEvent = (e: {target: any}): void => {
        const { scrollTop, scrollLeft } = e.target;
        if (shaft === "x") {
            setDomScroll(scrollLeft);
        } else {
            setDomScroll(scrollTop);
        }
        // shaft === "x" ? setDomScroll(scrollLeft) : setDomScroll(scrollTop);
    };

    useEffect(() => {
        if (RefDom.current) {
            const scrollShaft = shaft === "x" ? "offsetWidth" : "offsetHeight";
            setClient(RefDom.current[scrollShaft]);

            // 启动滚轮事件
            RefDom.current.addEventListener("scroll", onScrollEvent);
        }

        // 删除滚轮事件
        return () => RefDom.current?.removeEventListener("scroll", onScrollEvent);
    }, []);

    return [getDomScroll, getClient];
}

export default ScrollState;
