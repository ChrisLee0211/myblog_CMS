import Example from '../page/Example'
import Articles from "../page/Articles"

export interface routerConfigModel {
    path:string,
    component?:any,
    auth?:boolean,
    meta:MetaItem,
    children?:routerConfigModel[]
}

interface MetaItem {
    title:string,
    icon?:string,
    role:string
}

export const routerConfig:routerConfigModel[] = [
    {
        path: '/',
        component:Articles,
        auth:false,
        meta:{title:'主页',role:'home-index'},
    },
    // {
    //     path: '/example',
    //     component:Example,
    //     auth:true,
    //     meta:{title:'示例模块',role:'example-index'},
    // },
    {
        path: '/Articles',
        component:Articles,
        auth:true,
        meta:{title:'文章管理',role:'articles-index'},
    }
]