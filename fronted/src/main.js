import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import 'vant/lib/index.css'; 
import { NavBar } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant';

import Router from './router'

import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(Router)
app.use(pinia)
app.use(Tabbar);
app.use(TabbarItem);
app.use(Icon);
app.use(Cell);
app.use(CellGroup);
app.use(VanImage);
app.use(NavBar);
app.mount('#app')




