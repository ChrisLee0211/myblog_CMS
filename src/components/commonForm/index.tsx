import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Select, Button, InputNumber, DatePicker, Radio, Switch, Upload, Checkbox, Cascader, message } from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import intl from "react-intl-universal";
import "./index.modules.less";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { parseTime, formatOptions } from "@/utils/index";
import { useMoment } from "@/utils/hook/useMoment";
import * as ValidateMessages from "./validateMessages";
import { FormInstance } from "antd/lib/form";

interface ImagePreviewProps {
    path: string;
    loading: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = (props: ImagePreviewProps) => {
    if (props.path && props.path.length > 0) {
        return (
            <img src={`${process.env.REACT_APP_STATIC_API}${props.path}`} style={{ width: "100%" }} />
        );
    }
    return (
        <div>
            {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
export interface ComponentProps {
    /** 表单字段配置，建议引入对应的ColumnsType类型查看 */
    columns: Array<ColumnsType>;
    /** 表单数据 */
    form: { [name: string]: any };
    /** 布局方式 */
    layout?: layOutType;
    /**
     * @param err 错误信息数组，包含了每个不合法的字段及其内容
     * @param formData 当前表单所有字段
     * @param done 完成表单的回调函数，用于取消按钮的loading
     */
    submit?: (err: Array<any> | null, formData: any, done: Function) => void;
    /** 取消按钮回调函数 */
    close?: () => void;
    /** 表单模式，有"search" | "add" | "edit" | "view" */
    mode: modeType;
    /** 子节点插槽元素，插入位置是按钮与表单字段末尾之间 */
    children?: React.ReactElement;
    /** 表单高度  */
    formHeight: string;
    /** form表单的实例，通过useForm生成 */
    instance?: FormInstance;
    /** 是否HOC模式，此模式下屏蔽底部按钮，由外部包裹组件提供 */
    isHOC?: boolean;
}

type formItem =
    "input" |
    "select" |
    "switch" |
    "DatePicker" |
    "checkbox" |
    "InputNumber" |
    "rangePicker" |
    "image" |
    "radio" |
    "cascader" |
    "element" |
    "file";
type layOutType = "horizontal" | "vertical" | "inline";
type modeType = "search" | "add" | "edit" | "view";
type OptionType = { label: string; value: any };
type uploadOptions = {
    /** 上传url */
    action: string;
    /** 大小限制，单位：k */
    size: number;
    /** 允许上传类型 */
    accept: string[];
    /** 是否支持多选 */
    multiple: boolean;
    /** 上传配置的header头部信息 */
    header: { [name: string]: any };
    /** 上传组件的提示信息 */
    tips: string;
}
interface ColumnsType {
    /** 字段类型，如input、select等 */
    type: formItem;
    /** 字段显示的名字，请务必做好翻译 */
    label: string;
    /** 字段属性的名字 */
    name: keyof ComponentProps["form"];
    /** 当type为select时，changeFn相当于选择器的onChange回调，参数里包含了当前选择器的数据 */
    changeFn?: (...args: any) => void;
    /** 是否多选 */
    multiple?: boolean;
    /** 选项配置 */
    options?: Array<{ label: string; value: any; children?: OptionType[] }>;
    /** 最大数值，对数字输入框有效, 当用InputNumber类型时。一定要在rules中声明type是"number"，否则max属性无效 */
    max?: number;
    /** 最小数值，对数字输入框有效 */
    min?: number;
    /** 校验规则 */
    rules?: Array<any>;
    /** 时间范围选择器开始&结束字段, 只在type为rangePicker时有效 */
    start?: string;
    end?: string;
    /**
     * 自定义渲染元素方法,必须返回一个React元素，否则报错,
     * @param record 当前行的配置信息
     * @param form 当前行的字段值
     * */
    render?: (record: ColumnsType, value: any) => React.ReactElement;
    /** 上传文件控件配置，仅当type为"image"和"file"时有效 */
    upload?: uploadOptions;
    /** 是否开启禁用 */
    disabled?: boolean;
    /** 改变内容触发的事件 */
    changeRadio?: (...args: any) => void;
}


/**
 * 公共表单组件
 * @author chrislee
 * @Time 2020/5/7
 */
const CommonForm: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { columns } = props;
    const lang = localStorage.getItem("lang");
    const [transToTimeStamp, transToMoment] = useMoment(columns);
    let validateMessages;
    if (lang === "zh-CN") {
        validateMessages = ValidateMessages.zh_cn;
    }
    if (lang === "zh-TW") {
        validateMessages = ValidateMessages.zh_tw;
    }
    if (lang === "en") {
        validateMessages = ValidateMessages.en;
    }
    if (lang === "pt") {
        validateMessages = ValidateMessages.pt;
    }
    const { isHOC } = props;
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [uploadLoading, setUploadLoading] = useState<boolean>(false);
    // const [formState, setFormState] = useState<ComponentProps["form"]>();
    const done = useCallback(() => {
        setBtnLoading(false);
    }, [btnLoading]);

    const finish = (val: any): void => {
        if (props.submit) {
            const formData = transToTimeStamp(val);
            setBtnLoading(true);
            props.submit(null, formData, done);
        }
    };
    const finishFailed = (obj: ValidateErrorEntity): void => {
        const { values, errorFields } = obj;
        if (props.submit) {
            const formData = transToTimeStamp(values);
            props.submit(errorFields, formData, done);
            setBtnLoading(false);
        }
    };
    const cancel = (): void => {
        if (props.close) {
            props.close();
        }
    };
    const formInstance: FormInstance = useMemo(() => {
        if (props.instance) {
            return props.instance;
        }
        const [ins] = Form.useForm();
        return ins;
    }, []);
    const showBtn: boolean = useMemo(() => {
        if (isHOC) {
            return false;
        }
        return true;
    }, [isHOC]);

    // 该上传钩子暂无类型推断
    const getUploadUrl = (e: any): string => (e && e.file.response?.data) ?? "";
    const validateFile = (file: RcFile, accept: string[], size: number): boolean => {
        const fileName: string = file.name;
        const fileNameParse = fileName.split(".");
        const type = fileNameParse[fileNameParse.length - 1];
        const typeValidate = accept.includes(type);
        const sizeValidate = file.size < size;
        if (!typeValidate) {
            message.error(`The file type is not accepted`);
        }
        if (!sizeValidate) {
            message.error(`The file size is over than limit`);
        }
        return typeValidate && sizeValidate;
    };
    const checkFileOption = (file: RcFile, fileList: RcFile[], accept: string[], size: number): boolean => {
        if (fileList.length > 0) {
            const validateArr: boolean[] = [];
            Array.from(fileList).forEach((record) => {
                const result: boolean = validateFile(record, accept, size);
                validateArr.push(result);
            });
            return !validateArr.some((v) => v === false);
        }
        return validateFile(file, accept, size);
    };
    const handleChangeImage = (info: UploadChangeParam<UploadFile>): void => {
        if (info.file.status === "uploading") {
            setUploadLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setUploadLoading(false);
        }
    };
    if (props.mode === "view") {
        return (
            <div className="commonForm-view" >
                {
                    props.columns instanceof Array && props.columns.map((record, index) => {
                        if (record.render) {
                            return record.render(record, props.form[record.name]);
                        }
                        switch (record.type) {
                            case "input":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{props.form[record.name]}</span>
                                    </div>
                                );
                            case "select":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{record.options?.find((v) => v.value === props.form[record.name])?.label ?? null}</span>
                                    </div>
                                );
                            case "image":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <div className="commonForm-view-item-value">
                                            <div className="commonForm-view-img">
                                                <img src={`${process.env.REACT_APP_STATIC_API}${props.form[record.name]}`} style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            case "file":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{props.form[record.name]}</span>
                                    </div>
                                );
                            case "cascader":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{formatOptions(props.form[record.name], record.options ? record.options : [])}</span>
                                    </div>
                                );
                            case "checkbox":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">
                                            <Checkbox.Group
                                                options={record.options}
                                                defaultValue={props.form[record.name]}
                                                disabled
                                            />
                                        </span>
                                    </div>
                                );
                            case "InputNumber":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{props.form[record.name]}</span>
                                    </div>
                                );
                            case "radio":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">
                                            <Radio.Group options={record.options} value={props.form[record.name]} disabled />
                                        </span>
                                    </div>
                                );
                            case "DatePicker":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">{parseTime(props.form[record.name])}</span>
                                    </div>
                                );
                            case "switch":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        <span className="commonForm-view-item-label">{record.label} :&nbsp;&nbsp;</span>
                                        <span className="commonForm-view-item-value">
                                            {Number(props.form[record.name]) === 1 ? "On" : "Off"}
                                        </span>
                                    </div>
                                );
                            case "element":
                                return (
                                    <div className="commonForm-view-item" key={index}>
                                        {record.render && (record.render as Function)(record, props.form)}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })
                }
                {
                    showBtn ? (
                        <div className="commonForm-view-btn">
                            <Button type="primary" onClick={cancel}>{intl.get("button.cancel")}</Button>
                        </div>
                    ) : null
                }

            </div>
        );
    }
    return (
        <Form validateMessages={validateMessages}
            layout={props.layout ? props.layout : "vertical"}
            size={"middle"}
            initialValues={transToMoment(props.form)}
            onFinish={finish}
            onFinishFailed={finishFailed}
            labelAlign={"right"}
            id="commonForm"
            form={formInstance}
            style={{ maxHeight: props.formHeight }}
        >
            {
                props.columns.map((record, index) => {
                    switch (record.type) {
                        case "input":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    rules={record.rules}>
                                    <Input placeholder={intl.get("form.placeholder", { field: record.label })} disabled={record.disabled ?? false} />
                                </Form.Item>
                            );
                            break;
                        case "select":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    rules={record.rules}
                                    key={record.name}
                                >
                                    <Select placeholder={intl.get("form.placeholder", { field: record.label })} disabled={record.disabled ?? false} mode={record.multiple ? "tags" : undefined} onChange={record.changeFn}>
                                        {
                                            record.options && record.options.map((v) => (
                                                <Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            );
                            break;
                        case "InputNumber":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    rules={record.rules}
                                    key={record.name}
                                >
                                    <InputNumber disabled={record.disabled ?? false} min={record.min} max={record.max} />
                                </Form.Item>
                            );
                            break;
                        case "DatePicker":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                >
                                    <DatePicker
                                    // defaultValue={moment(props.form[record.name], "YYYY/MM/DD")}
                                    />
                                </Form.Item>
                            );
                            break;
                        case "rangePicker":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                >
                                    <DatePicker.RangePicker
                                    // defaultValue={
                                    //     record.start && record.end
                                    //         ? [moment(props.form[record.start], "YYYY/MM/DD"), moment(props.form[record.end], "YYYY/MM/DD")]
                                    //         : null
                                    // }
                                    />
                                </Form.Item>
                            );
                            break;
                        case "radio":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    rules={record.rules}
                                >
                                    <Radio.Group onChange={record.changeRadio} disabled={record.disabled ?? false}>
                                        {record.options && record.options.map((v) => (
                                            <Radio key={v.value} value={v.value}>{v.label}</Radio>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            );
                            break;
                        case "switch":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                >
                                    <Switch disabled={record.disabled ?? false} defaultChecked={props.form[record.name]} />
                                </Form.Item>
                            );
                            break;
                        case "checkbox":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    rules={record.rules}
                                >
                                    {/* 如果多选项超过了4个以上，理应改用多选的选择器而不是勾选 */}
                                    <Checkbox.Group disabled={record.disabled ?? false}>
                                        {record.options && record.options.map((v) => (
                                            <Checkbox key={v.value} value={v.value}>{v.label}</Checkbox>
                                        ))}
                                    </Checkbox.Group>
                                </Form.Item>
                            );
                            break;
                        case "cascader":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    rules={record.rules}
                                >
                                    <Cascader changeOnSelect={true} disabled={record.disabled ?? false} options={record.options} />
                                </Form.Item>
                            );
                            break;
                        case "image":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    valuePropName={record.name as string}
                                    getValueFromEvent={getUploadUrl}
                                    extra={record.upload?.tips ?? null}
                                >
                                    <Upload
                                        disabled={record.disabled ?? false}
                                        action={record.upload?.action}
                                        method="POST"
                                        showUploadList={false}
                                        listType="picture-card"
                                        headers={record.upload?.header}
                                        className="avatar-uploader"
                                        beforeUpload={(file, fileList) => checkFileOption(file, fileList, (record.upload as uploadOptions).accept, (record.upload as uploadOptions).size)}
                                        onChange={handleChangeImage}
                                    >
                                        <ImagePreview
                                            path={formInstance.getFieldsValue()[record.name] ?? props.form[record.name]}
                                            loading={uploadLoading} />
                                    </Upload>
                                </Form.Item>
                            );
                        case "file":
                            return (
                                <Form.Item
                                    name={record.name}
                                    label={record.label}
                                    key={record.name}
                                    getValueFromEvent={getUploadUrl}
                                    extra={record.upload?.tips ?? null}
                                >
                                    <Upload
                                        disabled={record.disabled ?? false}
                                        action={record.upload?.action}
                                        onChange={handleChangeImage}
                                        beforeUpload={(file, fileList): boolean => checkFileOption(file, fileList, (record.upload as uploadOptions).accept, (record.upload as uploadOptions).size)}
                                    >
                                        <Button>
                                            <UploadOutlined /> Click to Upload
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            );
                        case "element":
                            return (
                                <Form.Item key={index}>
                                    {(record.render && record.render(record, props.form))??null}
                                </Form.Item>
                            );
                        default:
                            
                            return null;
                    }
                })
            }
            {props.children && props.children}
            {
                showBtn && props.mode === "search" ? (
                    <Form.Item {...tailLayout}>
                        <Button type="primary" loading={btnLoading} htmlType="submit">{intl.get("button.search")}</Button>
                        <Button type="primary" htmlType="reset">{intl.get("button.reset")}</Button>
                    </Form.Item>
                ) : null
            }
            {
                showBtn && props.mode === "add" ? (
                    <Form.Item {...tailLayout}>
                        <Button type="primary" loading={btnLoading} htmlType="submit" >{intl.get("button.add")}</Button>
                        <Button onClick={cancel}>{intl.get("button.cancel")}</Button>
                    </Form.Item>
                ) : null
            }
            {
                showBtn && props.mode === "edit" ? (
                    <Form.Item {...tailLayout}>
                        <Button type="primary" loading={btnLoading} htmlType="submit" >{intl.get("button.update")}</Button>
                        <Button onClick={cancel}>{intl.get("button.cancel")}</Button>
                    </Form.Item>
                ) : null
            }
        </Form>
    );
};

export default CommonForm;
