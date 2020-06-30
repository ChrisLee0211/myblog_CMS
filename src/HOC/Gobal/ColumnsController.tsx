import React, { useCallback, useState } from "react";
import { Menu, Checkbox, Dropdown, Tooltip } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import { activeItem } from "../../utils/hook/useColumnsControl";

export interface DropProps {
    columns: activeItem[];
    changeColumns(columns: activeItem): void;
}

const DropCheckbox: React.FC<DropProps> = (props: DropProps) => {
    const { columns, changeColumns } = props;
    const setColumns = useCallback((val: CheckboxChangeEvent) => {
        const activeColumns = columns.find((v) => v.key === val.target.value);
        if (activeColumns) {
            changeColumns(activeColumns);
        }
    }, [columns, changeColumns]);
    return (
        <Menu>
            {
                columns.map((record) => (
                    <Menu.Item key={record.key}>
                        <Checkbox value={record.key} checked={record.active} onChange={(val: CheckboxChangeEvent) => { setColumns(val); }}>{record.title}</Checkbox>
                    </Menu.Item>
                ))
            }
        </Menu>
    );
};

interface CProps {
    activeList: activeItem[];
    changeColumns: any;
    className: string;
}

const ColumnsController: React.FC<CProps> = (props: CProps) => {
    const { activeList, changeColumns, className } = props;

    const [dropDownVisible, setDropDownVisible] = useState(false); // 触发动态选择列的显示状态

    return (
        <Dropdown overlay={DropCheckbox({ columns: (activeList as activeItem[]), changeColumns: (changeColumns as any) }) as React.ReactElement} visible={dropDownVisible}>
            <Tooltip placement="topRight" title={"显示列"}>
                <AppstoreOutlined className={className} onClick={() => { setDropDownVisible(!dropDownVisible); }} />
            </Tooltip>
        </Dropdown>
    );
};

export { ColumnsController };
