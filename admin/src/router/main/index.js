import index from '@/views/index'
import home from '@/views/main/home'
import main21 from '@/views/main/2-1'
import main212 from '@/views/main/2-1-2'

export default {
    path: '/index',
    component: index,
    children: [
        {
            path: 'home',
            component: home,
        },
        {
            path: '2-1',
            component: main21,
        },
        {
            path: '2-1-2',
            component: main212,
        },
    ]
}