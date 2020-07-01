import { message } from "antd";
import lang from "../locale";

type TipsType = "success" | "fail" | "self_fail" | "self_success" | "active" | "forbid"
/**
 * Message弹出信息公共用法
 * @param {string} type:弹出类型
 * @param {string} content ：弹出内容，默认为空。只在类型为'self'时生效
 * @returns
 * @author chrislee
 * @since 2019/11/23
 */
const tipsBack = (type: TipsType, content: string | any = ""): void => {
    /**
     * 弹出类型说明：
     * suceess => 操作成功
     * fail => 操作失败
     * lost => 暂无
     * self_fail => 自定义失败信息(红色警告窗口)
     * self_success => 自定义成功信息(王宝强颜色警告窗口)
     */
    const locale = localStorage.getItem("lang") ?? "zh-CN";
    switch (type) {
        case "success":
            message.success((lang as any)[locale]["messageBox.successLoad"]);
            break;
        case "fail":
            message.error((lang as any)[locale]["messageBox.failLoad"]);
            break;
        case "self_fail":
            message.error(content);
            break;
        case "self_success":
            message.success(content);
            break;
        case "active":
            message.success((lang as any)[locale]["messageBox.active"]);
            break;
        case "forbid":
            message.success((lang as any)[locale]["messageBox.forbid"]);
            break;
        default:
    }
};

export { tipsBack };
