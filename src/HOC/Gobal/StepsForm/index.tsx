import React, { useMemo, useState, useCallback, ReactNode, useEffect } from "react";
import { Steps, Form, Button, Space, Drawer, Modal, Skeleton } from "antd";
import CommonForm, { ComponentProps as FormType } from "@/components/commonForm";
import intl from "react-intl-universal";
import "./index.modules.less";
import { FormInstance } from "antd/lib/form";

/**
 * 步骤型表单
 * @author chrislee
 * @Time 2020/5/16
 */
export interface ComponentProps {
    SetpsOption?: string[];
    formColumns: FormType["columns"][];
    form: { [name: string]: any };
    submit: (err: Array<any> | null, formData: any, done: Function) => void;
    close: () => void;
    current: number;
    mode: FormType["mode"];
    instance: FormInstance;
}

export const StepsForm: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { SetpsOption, formColumns, form, mode, instance, current } = props;
    const StepsList = useMemo(() => {
        const stepsTitle = [
            intl.get("form.step.first"),
            intl.get("form.step.second"),
            intl.get("form.step.third"),
        ];
        return SetpsOption ?? stepsTitle;
    }, [SetpsOption]);
    return (
        <section className="stepForm">
            <section className="stepForm-steps">
                <Steps current={current} labelPlacement="vertical">
                    {
                        StepsList.map((v) => <Steps.Step key={v} title={v} />)
                    }
                </Steps>
            </section>
            <section className="stepForm-forms">
                <CommonForm
                    instance={instance}
                    columns={formColumns[current]}
                    form={form}
                    mode={mode}
                    isHOC
                    formHeight={"none"}
                    close={props.close}
                />
            </section>
        </section>
    );
};
interface ExcluedeType {
    changeStep: Function;
    instance: FormInstance;
    current: number;
}

interface StepFormDrawerProps extends Omit<ComponentProps, keyof ExcluedeType> {
    isModal: boolean;
    title: React.ReactNode | string;
    width?: string | number;
    visible: boolean;
    loading?: boolean;
}

const StepFormDrawer: React.FC<StepFormDrawerProps> = (props: StepFormDrawerProps) => {
    const { isModal, close, visible, mode, formColumns, submit, form, loading = false } = props;
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [formCollection, setFormCollection] = useState<any>(form);
    const [formInstance] = Form.useForm();
    useEffect(() => {
        if (visible === true) {
            formInstance.setFieldsValue(form);
            setFormCollection(form);
            setCurrentStep(0);
        }
    }, [visible, form]);
    const done = useCallback(() => {
        setBtnLoading(false);
    }, [btnLoading]);
    const reback = useCallback(() => {
        setCurrentStep((v) => v - 1);
    }, [currentStep]);
    const next = useCallback(() => {
        formInstance.validateFields().then(() => {
            const currentForm = formInstance.getFieldsValue();
            setFormCollection((v: any) => ({ ...v, ...currentForm }));
            setCurrentStep((v) => v + 1);
        });
    }, [currentStep]);
    const submitAll = useCallback(() => {
        setBtnLoading(true);
        formInstance.validateFields().then((val) => {
            if (props.submit) {
                const result = { ...formCollection, ...val };
                props.submit(null, result, done);
            }
        }).catch((errInfo) => {
            const { values, errorFields } = errInfo;
            if (errorFields.length > 0) {
                const firstErrorField = errorFields[0].name[0];
                let errorStepIndex = 0;
                for (let i = 0; i < formColumns.length; i += 1) {
                    const errorFieldIndex = formColumns[i].findIndex((v) => v.name === firstErrorField);
                    if (errorFieldIndex !== -1) {
                        errorStepIndex = i;
                        break;
                    }
                }
                setCurrentStep(errorStepIndex);
            }
            if (props.submit) {
                props.submit(errorFields, values, done);
                setBtnLoading(false);
            }
        });
    }, [currentStep]);
    const closeDrawer = useCallback(() => {
        formInstance.resetFields();
        props.close();
    }, [formInstance]);
    const footerNode = useMemo(() => (
        <React.Fragment>
            <Space size="small">
                {
                    currentStep > 0 ? <Button type="primary" loading={btnLoading} onClick={reback}>上一步</Button> : null
                }
                {
                    currentStep < formColumns.length - 1 ? <Button onClick={next} type="primary">下一步</Button> : null
                }
                {
                    currentStep === formColumns.length - 1 ? <Button loading={btnLoading} onClick={submitAll} type="primary"> 提交</Button> : null
                }
            </Space>
        </React.Fragment>
    ), [currentStep, btnLoading]);
    if (!isModal) {
        return (
            <Drawer
                title={props.title ?? ""}
                visible={visible}
                footer={footerNode}
                forceRender={true}
                maskClosable={mode === "search"}
                onClose={closeDrawer}
                destroyOnClose={true}
                width={props.width ?? 400}
                placement={"right"}
            >
                <Skeleton loading={loading}>
                    <StepsForm
                        mode={mode}
                        instance={formInstance}
                        formColumns={formColumns}
                        form={form}
                        submit={submit}
                        current={currentStep}
                        close={close}
                    />
                </Skeleton>
            </Drawer>
        );
    }
    return (
        <Modal
            title={props.title ?? ""}
            visible={visible}
            footer={footerNode}
            onCancel={close}
            width={props.width ?? 400}
        >
            <Skeleton loading={loading}>
                <StepsForm
                    mode={mode}
                    instance={formInstance}
                    formColumns={formColumns}
                    form={form}
                    submit={submit}
                    current={currentStep}
                    close={close}
                />
            </Skeleton>
        </Modal>
    );
};

export default StepFormDrawer;
