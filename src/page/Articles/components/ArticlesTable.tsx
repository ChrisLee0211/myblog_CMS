import React, { useState, useCallback } from "react";
import {Table, Space} from "antd";
import {parseTime} from "@/utils"
import { ColumnType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";

interface tableItem {
    key:number;
    title:string;
    tag:number;
    created_at:number;
    updated_at:number
}

const ArticleTable:React.FC = () =>{
    const [tableLoading,setTableLoading] = useState(false);
    const [page,setPage] = useState(1);
    const changePage = useCallback((page,pageSize)=>{
        console.log("page",page)
        console.log("pageSize",pageSize)
    },[page])
    const columns:ColumnType<tableItem>[] = [
        {
            align:"center",
            dataIndex:"title",
            title:"标题",
        },
        {
            align:"center",
            dataIndex:"tag",
            title:"标签",
            render(val){
            return <span>{val}</span>
            }
        },
        {
            align:"center",
            dataIndex:"created_at",
            title:"创建时间",
            render(val){
            return <span>{parseTime(val)}</span>
            }
           
        },
        {
            align:"center",
            dataIndex:"updated_at",
            title:"更新时间",
            render(val){
                return <span>{parseTime(val)}</span>
                }
        },
        {
            align:"center",
            dataIndex:"action",
            title:"操作",
            render(){
                return (
                    <Space size="small">
                    <a>编辑</a>
                    <a>查看</a>
                    </Space>
                )
            }
        }
    ]
    const rowSelection:TableRowSelection<tableItem> = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        
      };
    const tableData:tableItem[] = [
        {key:1,tag:1,title:"测试文章1",created_at:1593790759069, updated_at:1593790759069},
        {key:2,tag:1,title:"测试文章2",created_at:1593790759069, updated_at:1593790759069},
        {key:3,tag:1,title:"测试文章3",created_at:1593790759069, updated_at:1593790759069},
        {key:4,tag:1,title:"测试文章4",created_at:1593790759069, updated_at:1593790759069},
        {key:5,tag:1,title:"测试文章5",created_at:1593790759069, updated_at:1593790759069}
    ]

    return (
        <Table
        loading={tableLoading}
        rowKey={(record)=>record.title}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        pagination={{
            pageSize:10,
            current:page,
            onChange:changePage
        }}
        />
    )
}

export default ArticleTable