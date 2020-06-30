import React from "react";
import { Spin } from "antd";
import Loadable from "react-loadable";

const LoadingComponent: React.FC = () => (
    <div style={{ width: "100wv", height: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin spinning={true} size="large">

        </Spin>
    </div>
);

type loaderType = Promise<React.ComponentType<any> | { default: React.ComponentType<any> }>;
export default (loader: () => loaderType, loading = LoadingComponent): any => Loadable({
    loader,
    loading
});
