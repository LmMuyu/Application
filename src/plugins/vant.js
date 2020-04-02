import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import { Tabbar, TabbarItem } from "vant";
import { Search } from "vant";
import { Col, Row } from "vant";
import { Swipe, SwipeItem } from "vant";
import { PullRefresh } from "vant";
import { Toast } from "vant";
import { Loading } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(Loading);
Vue.use(PullRefresh);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Search);
Vue.use(Vant);
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.prototype.$toast = Toast;
