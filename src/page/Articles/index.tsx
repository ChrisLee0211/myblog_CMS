import React, { useState } from "react";
import {Tooltip} from "antd";
import Icon from "@/components/SvgIcon";
import {useVisible} from "@/utils/hook/useVisible";
import ArticlesTable from "./components/ArticlesTable"
import SearchForm from "./components/SearchForm";
import "./index.scss"


const Articles:React.FC = () => {
    const [searchFormVisible, openSearchForm, closeSearchForm] = useVisible(false);

    return (
        <div className="articles">
            <section className="main-header">
                <div className="articles-title">文章管理</div>
                <div className="articles-btn">
                    <Tooltip placement="topLeft" title={"搜索"}>
                        <span className="articles-btn-text" onClick={()=>{openSearchForm()}}>
                            <Icon name="sousuo" />
                        </span>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"添加"}>
                        <span className="articles-btn-text">
                            <Icon name="tianjia" />
                        </span>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"删除"}>
                        <span className="articles-btn-text">
                            <Icon name="shanchuguan" />
                        </span>
                    </Tooltip>
                </div>
            </section>
            <section className="main-body">
                <ArticlesTable />
            </section>
            <SearchForm visible={searchFormVisible} close={closeSearchForm}/>
        </div>
    )
}

export default Articles