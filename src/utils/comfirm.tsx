import React, { ReactNode } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import intl from "react-intl-universal";

const { confirm } = Modal;

// 定义传进来的对象
interface ConfirmParams {
    content: string | ReactNode;
    ok: Function;
    cancel: Function;
}

function Confirm(props: ConfirmParams) {
    confirm({
        title: intl.get("messageBox.tip"),
        icon: <ExclamationCircleOutlined />,
        content: props.content,
        okText: intl.get("button.confirm"),
        cancelText: intl.get("button.cancel"),
        onOk() {
            props.ok();
        },
        onCancel() {
            props.cancel();
        },
    });
}

export default Confirm;
