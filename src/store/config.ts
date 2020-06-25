import loginStore from "@/page/login/store";

const data = {
    ...loginStore.data
}

const resolvers = {
    ...loginStore.resolvers
}

export default {data,resolvers};