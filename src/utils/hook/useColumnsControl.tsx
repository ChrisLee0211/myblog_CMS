/* eslint-disable consistent-return */
import { useState, useRef, useEffect, ReactNode } from "react";

interface ColumnsItem {
    title?: ReactNode | string;
    key?: string | number;
    dataIndex?: string | number | (string | number)[] | undefined;
}

export interface activeItem extends ColumnsItem {
    name: string | number;
    active: boolean;
}
/**
 * 动态绑定表格列
 * @param columns 表格列数组
 * @author chrislee
 * @Time 2020/5/12
 * @returns 返回一个数组，里面有三个参数
 * @returns activeList:用于遍历生成checkbox的数组
 * @returns newColumns:被修改后的新表格列数组
 * @returns changeColumns:传入当前被选中的表格列，予以改变获取最新的表格列数组
 */
const useColumnsControl = (columns: ColumnsItem[]): [activeItem[], ColumnsItem[], Function] => {
    // 用于内部记录被激活的表格列
    const activeColumn: activeItem[] = [...columns].map((record) => {
        const item: activeItem = {
            name: record.key ?? "",
            active: true,
            ...record
        };
        return item;
    });

    const [activeList, setActiveList] = useState(activeColumn);

    // 用于记录最终生成的表格列
    const initialColumns = useRef(columns);
    useEffect(() => {
        initialColumns.current = columns;
    }, [columns]);
    const changeColumns = (Columns: activeItem): void => {
        const newActiveList = activeList.map((record) => {
            if (record.name === Columns.name) {
                record.active = !Columns.active;
            }
            return record;
        });
        // eslint-disable-next-line consistent-return
        // eslint-disable-next-line array-callback-return
        const activeListFilter: (number | undefined)[] = newActiveList.map((r, i) => {
            if (r.active === true) {
                return i;
            }
        });
        const newColumnsArr: ColumnsItem[] = [];
        activeListFilter.forEach((record) => {
            if (record === undefined) return;
            newColumnsArr.push(columns[record]);
        });
        setActiveList(newActiveList);
        // setNewColumns(newColumnsArr)
        initialColumns.current = newColumnsArr;
    };
    return [activeList, initialColumns.current, changeColumns];
};

export { useColumnsControl };
