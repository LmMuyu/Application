import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import { Tabbar, TabbarItem } from "vant";
import { Swipe, SwipeItem } from "vant";
import { PullRefresh } from "vant";
import { Col, Row } from "vant";
import { Loading } from "vant";
import { Search } from "vant";
import { Field } from "vant";
import { Toast } from "vant";
import { Icon } from "vant";
import { Overlay } from "vant";
import { Form } from "vant";
import { Dialog } from 'vant';

Vue.use(PullRefresh);
Vue.use(TabbarItem);
Vue.use(SwipeItem);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Tabbar);
Vue.use(Search);
Vue.use(Field);
Vue.use(Swipe);
Vue.use(Form);
Vue.use(Vant);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog
