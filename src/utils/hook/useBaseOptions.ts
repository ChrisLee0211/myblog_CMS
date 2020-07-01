import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducer";
import { getGroupsOptions, getRegionsOptions, getTypesOptions, getPostOptions } from "@/page/System/store/actions";
import { SystemState } from "@/page/System/store/reducers";

interface BaseOptionType {
    label: string;
    value: number;
}

interface CascaderOptionType extends BaseOptionType {
    children: Array<CascaderOptionType>;
}

/** 选项类型 */
type optType = "Regions" | "Groups" | "Types" | "Post" | "all"
/** 是否获取最近一次的选项 */
type isNew = boolean

/**
 * 获取存在redux中的基础选项列表
 * @param type 选项类型
 * @param Recently 是否获取最近一次选项
 */
export const useBaseOptions = (type: optType = "all", Recently: isNew = false): any => {
    const systemState = useSelector<RootState, SystemState>((state) => state.system);
    const dispatch = useDispatch();
    const { groupsOptions, regionsOptions, typesOptions, postOptions } = systemState;
    useEffect(() => {
        if (Recently) {
            if (type === "Groups") {
                dispatch(getGroupsOptions(true));
            }
            if (type === "Regions") {
                dispatch(getRegionsOptions(true));
            }
            if (type === "Types") {
                dispatch(getTypesOptions(true));
            }
            if (type === "Post") {
                dispatch(getPostOptions(true));
            }
            if (type === "all") {
                dispatch(getGroupsOptions(true));
                dispatch(getRegionsOptions(true));
                dispatch(getTypesOptions(true));
                dispatch(getPostOptions(true));
            }
        }
    }, []);
    const groupsOpts = useMemo(() => groupsOptions, [groupsOptions]);
    const regionsOpts = useMemo(() => regionsOptions, [regionsOptions]);
    const typesOpts = useMemo(() => typesOptions, [typesOptions]);
    const postOpts = useMemo(() => postOptions, [postOptions]);
    if (type === "Groups") {
        return [groupsOpts];
    }
    if (type === "Regions") {
        return [regionsOpts];
    }
    if (type === "Types") {
        return [typesOpts];
    }
    if (type === "Post") {
        return postOpts;
    }
    return [groupsOpts, regionsOpts, typesOpts, postOpts];
};
