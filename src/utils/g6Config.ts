import G6 from "@antv/g6";
import { IShape } from "@antv/g2/lib/dependents";

/**
 * 圆角方框型节点注册逻辑
 * @author chrislee
 * @Time 2020/5/10
 */
G6.registerNode("rect-node", {
    draw(cfg, group) {
        let shape: IShape = {} as any;
        const rectWidth: number = cfg?.size instanceof Array ? cfg.size[0] : cfg?.size ?? 100;
        const rectHeight: number = Number(rectWidth) / 2;
        if (group) {
            shape = group.addShape("rect", {
                attrs: {
                    x: 0,
                    y: 0,
                    width: rectWidth,
                    height: rectHeight,
                    stroke: "#1890FF",
                    fill: "#1890FF",
                    radius: 5,
                },
                name: "rectNode",
                draggable: true
            });
            group.addShape("text", {
                attrs: {
                    x: rectWidth / 2,
                    y: rectHeight / 2,
                    text: cfg?.label,
                    fontSize: cfg?.labelCfg?.style?.fontSize,
                    fill: "#000",
                    width: rectWidth,
                    height: rectHeight,
                    textAlign: "center",
                    textBaseline: "middle",
                    lineHeight: rectHeight,
                },
                name: "rectNode-text",
                draggable: true
            });
        }
        return shape;
    },
}, "rect");

// /**
//  * 箭头边注册逻辑
//  * @author chrislee
//  * @Time 2020/5/11
//  */
// G6.registerEdge("arrow-line", {
//     getPath(points: any[]) {
//         const startPoint = points[0];
//         const endPoint = points[1];
//         return [
//             ["M", startPoint.x, startPoint.y],
//             ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
//             ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
//             ["L", endPoint.x, endPoint.y],
//         ];
//     },
//     getShapeStyle(cfg: any) {
//         console.log("cfg", cfg)
//         const { startPoint, endPoint } = cfg;
//         const controlPoints = this.getControlPoints(cfg);
//         let points = [startPoint]; // 添加起始点
//         // 添加控制点
//         if (controlPoints) {
//             points = points.concat(controlPoints);
//         }
//         // 添加结束点
//         points.push(endPoint);
//         const path = this.getPath(points);
//         const style = {
//             ...G6.Global.defaultEdge.style,
//             stroke: "#BBB",
//             lineWidth: 2,
//             path,
//             ...cfg.style,
//         };
//         return style;
//     },
// }, "polyline");

export default G6;
