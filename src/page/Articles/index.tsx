import React from "react";
import {Tooltip} from "antd";
import Icon from "@/components/SvgIcon";
import "./index.scss"


const Articles:React.FC = () => {
    return (
        <div className="articles">
            <section className="main-header">
                <div className="articles-title">文章管理</div>
                <div className="articles-btn">
                    <Tooltip placement="topLeft" title={"搜索"}>
                        <span className="articles-btn-text">
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
                主体区
            </section>
            <section className="main-footer">
                底部
            </section>
        </div>
    )
}

export default Articles