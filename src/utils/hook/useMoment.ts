import { useCallback } from "react";
import { ComponentProps } from "@/components/commonForm";
import moment from "moment/moment";
/** 传入表单对象，将自动转化里面含有时间戳的字段为moment对象 */
type toMoment = (form: { [name: string]: any }) => { [name: string]: any }
/** 传入表单对象，将自动转化里面含有moment对象的字段为时间戳 */
type toTimeStamp = (form: { [name: string]: any }) => { [name: string]: any }

/**
 * 以表单的配置为依赖，返回两个用于格式化表单数据中含moment对象的字段
 * @param columns 表单配置
 * @returns Array 返回一个数组包含一下结果
 * @returns toTimeStamp 将moment转化为时间戳
 * @returns toMoment 将时间戳转化为moment
 */
export const useMoment = (columns: ComponentProps["columns"]) => {
    const toMoment: toMoment = useCallback((formData) => {
        const rangePickerFields = columns.filter((v) => v.type === "rangePicker").map((v) => v.name);
        const datePickerFields = columns.filter((v) => v.type === "DatePicker").map((v) => v.name);
        const formState = { ...formData };
        rangePickerFields.forEach((v) => {
            if (formState[v] === null || formState[v] === undefined) {
                formState[v] = [];
            }
            if (formState[v].length < 1) return;
            formState[v] = [moment(formState[v][0]), moment(formState[v][1])];
        });
        datePickerFields.forEach((v) => {
            formState[v] = moment(formState[v]);
        });
        return formState;
    }, [columns]);
    const toTimeStamp: toTimeStamp = useCallback((formData) => {
        const rangePickerFields = columns.filter((v) => v.type === "rangePicker").map((v) => v.name);
        const datePickerFields = columns.filter((v) => v.type === "DatePicker").map((v) => v.name);
        const formState = { ...formData };
        rangePickerFields.forEach((v) => {
            if (formState[v] === null || formState[v] === undefined) {
                formState[v] = [];
            }
            if (formState[v].length < 1) return;
            formState[v] = [moment(formState[v][0], "YYYY-MM-DD").valueOf(), moment(formState[v][1], "YYYY-MM-DD").valueOf()];
        });
        datePickerFields.forEach((v) => {
            formState[v] = moment(formState[v], "YYYY-MM-DD").valueOf();
        });
        return formState;
    }, [columns]);
    return [toTimeStamp, toMoment];
};
