import React from "react";

interface VProps {
    children: React.ReactElement;
}

interface viewport {
    width: number;
    height: number;
}

const viewportContext = React.createContext<viewport>({} as viewport);

const ViewportProvider: React.FC<VProps> = (props: VProps) => {
    const { children } = props;
    // 顺带监听下高度，备用
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleWindowResize = (): void => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};

const useViewport = (): { width: number; height: number } => {
    const { width, height } = React.useContext(viewportContext);
    return { width, height };
};

export default ViewportProvider;
export { useViewport };
