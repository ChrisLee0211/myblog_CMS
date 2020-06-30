import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Drawer, Button, Space, Skeleton } from "antd";
import CommonForm, { ComponentProps as FormType } from "@/components/commonForm";
import { useForm, FormInstance } from "antd/lib/form/util";
import intl from "react-intl-universal";
import { useMoment } from "@/utils/hook/useMoment";

interface ExcluedeType {
    formHeight: string;
    instance: FormInstance;
    isHOC: boolean;
}
export interface ComponentProps extends Omit<FormType, keyof ExcluedeType> {
    visible: boolean;
    loading?: boolean;
    title: string;
    zIndex?: number;
    placement?: placeType;
    width?: number | number;
    height?: string;
}
type placeType = "top" | "right" | "bottom" | "left"
const FormDrawer: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { title, visible, mode, close, loading = false } = props;
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const realHeight: string = props.height ?? "50vh";
    const realZIndex: number = props.zIndex ?? 1000;
    const formInstance: FormInstance = useForm()[0];
    const [toTimeStamp] = useMoment(props.columns);
    const done = useCallback(() => {
        setBtnLoading(false);
    }, [btnLoading]);
    const submitForm = () => {
        setBtnLoading(true);
        formInstance.validateFields().then((val) => {
            if (props.submit) {
                props.submit(null, toTimeStamp(val), done);
            }
        }).catch((errInfo) => {
            const { values, errorFields } = errInfo;
            if (props.submit) {
                props.submit(errorFields, toTimeStamp(values), done);
                setBtnLoading(false);
            }
        });
    };
    useEffect(() => {
        setBtnLoading(false);
        if (mode === "search") return;
        formInstance.resetFields();
    }, [visible]);
    const FooterNode = useMemo(() => {
        if (mode === "add") {
            return (
                <React.Fragment>
                    <Space size="small">
                        <Button type="primary" onClick={submitForm} loading={btnLoading}>{intl.get("button.add")}</Button>
                        <Button onClick={close}>{intl.get("button.cancel")}</Button>
                    </Space>
                </React.Fragment>
            );
        }
        if (mode === "edit") {
            return (
                <React.Fragment>
                    <Space size="small">
                        <Button type="primary" onClick={submitForm} loading={btnLoading}>{intl.get("button.save")}</Button>
                        <Button onClick={close}>{intl.get("button.cancel")}</Button>
                    </Space>
                </React.Fragment>
            );
        }
        if (mode === "search") {
            return (
                <React.Fragment>
                    <Space size="small">
                        <Button type="primary" onClick={submitForm} loading={btnLoading}>{intl.get("button.search")}</Button>
                        <Button type="primary" onClick={() => { formInstance.resetFields(); }}>{intl.get("button.reset")}</Button>
                    </Space>
                </React.Fragment>
            );
        }
        return (
            <Button onClick={close}>{intl.get("button.cancel")}</Button>
        );
    }, [mode, btnLoading]);
    return (
        <Drawer
            maskClosable={mode === "search" || mode === "view"}
            title={title}
            zIndex={realZIndex}
            visible={visible}
            footer={FooterNode}
            onClose={close}
            width={props.width ?? 400}
            placement={props.placement ?? "right"}
        >
            <Skeleton loading={loading}>
                <CommonForm {...props} isHOC={true} formHeight={realHeight} instance={formInstance} />
            </Skeleton>
        </Drawer>
    );
};


export default FormDrawer;
