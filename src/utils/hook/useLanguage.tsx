import { useState } from "react";
import intl from "react-intl-universal";

import locales, { languagesOption } from "@/locale";

/**
 * 语言对象
 */
interface language {
    /**
     * 语言名称
     */
    name: string;
    /**
     * 语言所对应的值
     * @description value必须唯一
     */
    value: string;
}

/**
 * 语言选择hook
 * @param languages 语言集合
 * @param current 当前选中的语言
 */
function useLanguage(): [language[], language, (val: string) => void] {
    let initLang: language;
    /**
     * 初始化语种，本地有则取本地设置
     * @Time 2020/4/17
     * @author chrislee
     */
    if (localStorage.getItem("lang") !== null) {
        const locala = localStorage.getItem("lang") as string;
        initLang = languagesOption.find((v) => v.value === locala) as language;
    } else {
        initLang = languagesOption[0] as language;
    }
    const [currentLang, setLanguage] = useState<language>(initLang);
    /**
     * 选择语言事件
     * @param value 选中语言的value
     */
    function selectLanguage(value: string): void {
        const lang = languagesOption.find((item) => item.value === value) as language;
        localStorage.setItem("lang", value);
        intl.init({
            currentLocale: value,
            locales,
        });
        window.location.reload();
        setLanguage(lang);
    }
    return [languagesOption, currentLang, selectLanguage];
}

export default useLanguage;
