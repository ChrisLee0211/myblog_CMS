import { useRef, useState, useEffect, RefObject } from "react";
import { ColumnsType } from "antd/lib/table";

/**
 * 返回一个数组，[ref，x, y]
 */
type resultType = [RefObject<HTMLDivElement>, number, number]

/**
 * 根据表格列配置项，返回计算的可滚动距离x，y
 * @param columns 表格列配置项
 * @returns [ref,x,y]
 * @returns ref 用于设置表格外层元素的引用对象，必须放置在外层元素的ref属性中
 * @returns x x方向滚动距离
 * @returns y y方向滚动距离
 * @author chrislee
 * @Time 2020/5/20
 */
export const useTableScroll = (columns: ColumnsType): resultType => {
    const htmlRef = useRef<HTMLDivElement>(null);
    const [scrollX, setScrollX] = useState<number>(0);
    const [scrollY, setScrollY] = useState<number>(0);
    useEffect(() => {
        const clientHeight: number = (htmlRef.current?.offsetHeight ?? 500) - 66;
        const clientWidth: number = columns.map((v) => (v.width ? Number(v.width) : 0)).reduce((total, cur) => total + cur);
        setScrollY(clientHeight);
        setScrollX(clientWidth);
    }, [columns]);
    return [htmlRef, scrollX, scrollY];
};
