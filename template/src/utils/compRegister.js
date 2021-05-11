/**
 * @file 组件注入文件入口
 */

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,
    Select,
    Option,
    OptionGroup,
    Message,
    Form,
    FormItem,
    Input,
    Table,
    TableColumn,
    Icon,
    Tabs,
  TabPane
} from 'element-ui';
// 封装一下
const $message = Message;
class Messagemanager {
    constructor() {
        this.messageItem = null;
    }
    show(message, type) {
        const messageObj = {
            message,
            type,
            duration: 1500
        };
        this.messageItem && this.messageItem.close();
        this.messageItem = $message(messageObj);
    }
}
let manager = new Messagemanager();
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);

Vue.config.silent = true;
Vue.prototype.$message = (manager.show).bind(manager);



