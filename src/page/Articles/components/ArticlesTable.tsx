import React from "react";
import {Table, Button} from "antd";
import {parseTime} from "@/utils"
import { ColumnType } from "antd/lib/table";

interface tableItem {
    key:number;
    title:string;
    created_at:number;
    updated_at:number
}

const ArticleTable:React.FC = () =>{

    const columns:ColumnType<tableItem>[] = [
        {
            dataIndex:"title",
            title:"标题",
        },
        {
            dataIndex:"created_at",
            title:"创建时间",
            render(val){
            return <span>{parseTime(val)}</span>
            }
           
        },
        {
            dataIndex:"updated_at",
            title:"更新时间",
            render(val){
                return <span>{parseTime(val)}</span>
                }
        },
        {
            dataIndex:"action",
            title:"操作",
            render(){
                return (
                    <>
                    <Button type="text">编辑</Button>
                    <Button type="text">删除</Button>
                    </>
                )
            }
        }
    ]

    const tableData:tableItem[] = [
        {key:1,title:"测试文章1",created_at:1593790759069, updated_at:1593790759069},
        {key:2,title:"测试文章2",created_at:1593790759069, updated_at:1593790759069},
        {key:3,title:"测试文章3",created_at:1593790759069, updated_at:1593790759069},
        {key:4,title:"测试文章4",created_at:1593790759069, updated_at:1593790759069},
        {key:5,title:"测试文章5",created_at:1593790759069, updated_at:1593790759069}
    ]

    return (
        <Table 
        columns={columns}
        dataSource={tableData}
        />
    )
}

export default ArticleTable