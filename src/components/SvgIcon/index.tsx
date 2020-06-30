import * as React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import "./index.less";

// svg-icon 组件属性
interface SvgIconProps {
    /**
     * 图标名称
     */
    name: string;
    /**
     * 图标大小
     * @description 单位为px
     */
    size?: number;
    /**
     * 图标颜色
     * @description 支持 `#FFFFFF` 和 `rgba(255,255,0,1)`
     */
    color?: string;
    /**
     * 是否用作按钮，按钮状态会自动添加hover样式
     */
    isButton?: boolean;
}

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1915064_s26oxr60gso.js",
});

/**
 * 根据打包环境选择在线加载或本地加载的图标组件
 * @param props 传入icon的Name，size或color
 * @author chrislee
 * @Time 2020/4/22
 */
const Icon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
    const { name, size, color, isButton } = props;
    const useBtn = isButton ?? true;
    const realSize = size || "";
    const realColor = color || "";
        return <IconFont
            className={useBtn ? " anticon icon-wrap-hover" : "anticon"}
            type={`icon${name}`}
            style={{ fontSize: `${realSize}px`, color: realColor }} />;
};

export default React.memo(Icon);
