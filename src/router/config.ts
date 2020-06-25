import Example from '../page/Example'


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
        component:Example,
        auth:false,
        meta:{title:'主页',role:'home-index'},
    },
    {
        path: '/example',
        component:Example,
        auth:true,
        meta:{title:'示例模块',role:'example-index'},
    }
]