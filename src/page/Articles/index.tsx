import React from "react";
import Icon from "@/components/SvgIcon";
import "./index.scss"


const Articles:React.FC = () => {
    return (
        <div className="articles">
            <section className="main-header">
                <div className="articles-title">文章管理</div>
                <div className="articles-btn">
                    <Icon name="sousuo" />
                    <Icon name="tianjia" />
                    <Icon name="shanchuguan" />
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