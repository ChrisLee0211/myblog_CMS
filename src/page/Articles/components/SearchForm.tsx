import React from "react";
import FormDrawer, {ComponentProps as FormColumns} from "@/HOC/Gobal/FormDrawer";

interface Props {
    visible:boolean;
    close: ()=>void
}

const SearchForm:React.FC<Props> = (props:Props) => {
    const {visible , close} = props;
    const searchColumns:FormColumns["columns"] = [
        {
            name:"title",
            type:"input",
            label:"标题"
        },
        {
            name:"tag",
            type:"select",
            label: "分类",
            multiple:true,
            options:[{label:"分类一",value:1}]
        },
        {
            name:"created_at",
            type:"rangePicker",
            label:"创建时间",
        },
        {
            name:"update_at",
            type:"rangePicker",
            label:"更新时间",
        },
    ]
    return (
        <FormDrawer 
            title="高级搜索"
            columns={searchColumns}
            mode="search"
            close={close}
            visible={visible}
            form={{}}
        />
    )
}

export default SearchForm