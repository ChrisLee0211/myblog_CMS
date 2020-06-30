/* eslint-disable no-template-curly-in-string */
const typeTemplate = "'${name}' is not a valid ${type}";
/**
 * 表单校验提示信息(英文)
 * @author Ming07
 */
export const en = {
    default: "Validation error on field '${name}'",
    required: "'${name}' is required",
    enum: "'${name}' must be one of [${enum}]",
    whitespace: "'${name}' cannot be empty",
    date: {
        format: "'${name}' is invalid for format date",
        parse: "'${name}' could not be parsed as date",
        invalid: "'${name}' is invalid date",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: "'${name}' must be exactly ${len} characters",
        min: "'${name}' must be at least ${min} characters",
        max: "'${name}' cannot be longer than ${max} characters",
        range: "'${name}' must be between ${min} and ${max} characters",
    },
    number: {
        len: "'${name}' must equal ${len}",
        min: "'${name}' cannot be less than ${min}",
        max: "'${name}' cannot be greater than ${max}",
        range: "'${name}' must be between ${min} and ${max}",
    },
    array: {
        len: "'${name}' must be exactly ${len} in length",
        min: "'${name}' cannot be less than ${min} in length",
        max: "'${name}' cannot be greater than ${max} in length",
        range: "'${name}' must be between ${min} and ${max} in length",
    },
    pattern: {
        mismatch: "'${name}' does not match pattern ${pattern}",
    },
};

/**
 * 表单校验提示信息(葡萄牙文)
 * @author Ming07
 */
export const pt = {
    default: "Erro de validação no Campo '${name}'",
    required: "'${name}' é necessário",
    enum: "'${name}' Deve ser um DOS [${enum}]",
    whitespace: "'${name}' Não Pode ESTAR vazio",
    date: {
        format: "'${name}' é inválido para a data do formato",
        parse: "'${name}' Não pôde ser analisado Como data",
        invalid: "'${name}' é data inválida",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: "'${name}' Deve ser exatamente ${len} Caracteres",
        min: "'${name}' Deve ser pelo Menos ${min} Caracteres",
        max: "'${name}' Não Pode ser Mais Longo ${max} Caracteres",
        range: "'${name}' Deve ser entre ${min} and ${max} Caracteres",
    },
    number: {
        len: "'${name}' Deve igual ${len}",
        min: "'${name}' Deve ser pelo Menos ${min}",
        max: "'${name}' Não Pode ser Mais Longo ${max}",
        range: "'${name}' Deve ser entre ${min} and ${max}",
    },
    array: {
        len: "'${name}' Deve ser exatamente ${len} EM comprimento",
        min: "'${name}' Não Pode ser inferior a ${min} EM comprimento",
        max: "'${name}' Não Pode ser maior do que ${max} EM comprimento",
        range: "'${name}' Deve ser entre ${min} and ${max} EM comprimento",
    },
    pattern: {
        mismatch: "'${name}' Não corresponder Ao padrão ${pattern}",
    },
};

/**
 * 表单校验提示信息(简体中文)
 * @author Ming07
 */
export const zh_cn = {
    default: "'${name}' 验证失败",
    required: "'${name}'不能为空",
    enum: "'${name}' 必须是 [${enum}] 其中一个",
    whitespace: "'${name}'不能输入空格",
    date: {
        format: "'${name}' 格式日期无效",
        parse: "'${name}' 无法格式化为日期",
        invalid: "'${name}' 是无效日期",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: "'${name}'必须为${len}个字符",
        min: "'${name}'不能小于${min}个字符",
        max: "'${name}'不能大于${max}个字符",
        range: "'${name}'在 ${min} 到 ${max} 个字符之间",
    },
    number: {
        len: "'${name}' 必须为${len}",
        min: "'${name}' 不能小于${min}",
        max: "'${name}' 不能大于${max}",
        range: "'${name}' 在 ${min} 到 ${max} 之间",
    },
    array: {
        len: "'${name}' 长度一定为 ${len}",
        min: "'${name}' 长度不能小于 ${min}",
        max: "'${name}' 长度不能大于 than ${max}",
        range: "'${name}' 长度在 ${min} 到 ${max} 之间",
    },
    pattern: {
        mismatch: "'${name}' 没通过 ${pattern} 校验",
    },
};

/**
 * 表单校验提示信息(繁体中文)
 * @author Ming07
 */
export const zh_tw = {
    default: "'${name}' 驗證失敗",
    required: "'${name}'不能為空",
    enum: "'${name}' 必須是 [${enum}] 其中壹個",
    whitespace: "'${name}'不能輸入空格",
    date: {
        format: "'${name}' 格式日期無效",
        parse: "'${name}' 無法格式化為日期",
        invalid: "'${name}' 是無效日期",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: "'${name}'必須為${len}個字符",
        min: "'${name}'不能小於${min}個字符",
        max: "'${name}'不能大於${max}個字符",
        range: "'${name}'在 ${min} 到 ${max} 個字符之間",
    },
    number: {
        len: "'${name}' 必須為${len}",
        min: "'${name}' 不能小於${min}",
        max: "'${name}' 不能大於${max}",
        range: "'${name}' 在 ${min} 到 ${max} 之間",
    },
    array: {
        len: "'${name}' 長度壹定為 ${len}",
        min: "'${name}' 長度不能小於 ${min}",
        max: "'${name}' 長度不能大於 than ${max}",
        range: "'${name}' 長度在 ${min} 到 ${max} 之間",
    },
    pattern: {
        mismatch: "'${name}' 沒通過 ${pattern} 校驗",
    },
};
