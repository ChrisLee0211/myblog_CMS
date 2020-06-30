import React, { memo } from "react";
import { useConcent } from "concent";

import { CtxType } from "@/types/concent";
// 子节点属性
interface targetRoleComponentsProps {
    role: string;
}
// 子节点类型
type childrenType = React.ReactElement<targetRoleComponentsProps>

export interface ComponentProps {
    /** 子组件节点 */
    children?: Array<childrenType> | childrenType;
    /** 当前页面路由名称 */
    page: string;
}
type LayoutCtx = CtxType<ComponentProps, "layout", {}, any, any>
/**
 * 根据当前页面路由返回可控制权限显示组件的外部包裹组件
 * 请务必只包裹含有role属性的react元素，可以平级多个，可以嵌套，其他元素会一律当作空元素删除
 * @author chrislee
 * @Time 2020/4/24
 */
const FComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { children, page } = props;
    const ctx = useConcent<{}, LayoutCtx>("layout");
    const routes = ctx.state.userRoles;
    const target: Array<string> = routes[page];
    return (
        <React.Fragment>
            {
                target ? filterComponent((children as any), target) : null
            }
        </React.Fragment>
    );
};

function filterComponent(children: Array<childrenType> | childrenType, routes: Array<string>): React.ReactElement {
    if (children instanceof Array) {
        return (
            <React.Fragment>
                {children.filter((record) => {
                    if (routes.includes(record.props.role)) {
                        return true;
                    }
                    return false;
                })}
            </React.Fragment>
        );
    }
    if (routes.includes(children.props.role)) {
        return children;
    }
    return <React.Fragment></React.Fragment>;
}

export const validateRoles = (page: string, roles: string[]): string[] => {
    const ctx = useConcent<{}, LayoutCtx>("login");
    const routes = ctx.state.userRoles;
    const target: Array<string> = routes[page];
    let result: string[] = [];
    result = roles.filter((v: string) => target.includes(v));
    return result;
};

export default memo(FComponent);
