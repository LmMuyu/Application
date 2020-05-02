<template>
  <transition
    enter-active-class="animated fadeInRightBig faster"
    leave-active-class="animated fadeOutRightBig faster"
    :duration="{ enter: 150, leave: 100 }"
  >
    <div id="detail">
      <loadIng class="laoding" v-if="loading" />
      <detailHeadColumn class="nav" ref="nav" />
      <detailTabs
        id="tabs"
        class="tabs"
        @sorts="sorts"
        ref="isdetailtabs"
        v-show="detailTabsDisplay"
        @switchdiaplay="switchdiaplay"
      />
      <div v-if="!loading">
        <scroll class="scroll" ref="scroll" @monitor="position" :bounce="false" :probeType="3">
          <PostTemplateContentHaed :pasteval="pasteheadval" />
          <PostTemplateContent @loadimg="loadimg" :content="pastedata.content" class="content" />
          <PostTemplateContentBottom
            :pasteval="pastebottomval"
            class="contentbottom"
            :commentlength="commentlength"
            :id="id"
            :status="pastedata.status"
          />
          <detailTabs
            class="tabs"
            ref="detailtabs"
            @sorts="sorts"
            v-show="!detailTabsDisplay"
            @switchdiaplay="switchdiaplay"
          />
          <displayBar :paste="commentData" :iSposts="false" v-if="bardisply" />
          <detilBottom v-if="!bardisply" />
        </scroll>
      </div>
      <Snackbars :text="text" ref="snackbars" />
      <!--footer 底部 statr-->
      <footer v-if="!loading">
        <DateilSearchFor
          @deleteCollect="onDeleteCollect"
          @collect="collect"
          @focus="focus"
          v-if="publish"
          class="swarchfor"
          :FavoriteStatus="pastedata.favoritestatus"
        />
        <DateilPublish class="publish" @blur="blur" @shareit="shareit" v-else :publish="!publish" />
        <!--footer 底部 end -->
      </footer>
    </div>
  </transition>
</template>

<script>
/** 公共组件*/
import PostTemplateContentBottom from "components/content/posttemplate/PostTemplateContentBottom";
import PostTemplateContentHaed from "components/content/posttemplate/PostTemplateContentHaed";
import PostTemplateContent from "components/content/posttemplate/PostTemplateContent";
import displayBar from "components/content/displaybar/displayBar";
import Snackbars from "components/content/snackbars/Snackbars";
import loadIng from "components/content/loading/loadIng";
import Scroll from "components/content/scroll/Scroll";

/** 子组件*/
import DetailHeadColumn from "./childcomps/DetailHeadColumn";
import DateilSearchFor from "./childcomps/DateilSearchFor";
import DateilPublish from "./childcomps/DateilPublish";
import DetilBottom from "./childcomps/DetilBottom";
import DetailTabs from "./childcomps/DetailTabs";

/**方法 */
import { FAVORITEPOST, DELETECOLLECT } from "@/store/mutations-types";
import { mapGetters } from "vuex";
import {
  DetailModifyData,
  DetailCollect,
  DetailShareit,
  DeleteCollect,
  detaildata,
  addLike
} from "network/detail";

export default {
  name: "detail",
  components: {
    PostTemplateContentBottom,
    PostTemplateContentHaed,
    PostTemplateContent,
    DetailHeadColumn,
    DateilSearchFor,
    DateilPublish,
    DetilBottom,
    DetailTabs,
    displayBar,
    Snackbars,
    loadIng, //加载组件
    Scroll
  },
  provide() {
    return {
      divider: true,
      istexts: true
    };
  },
  data() {
    return {
      id: "", //帖子id
      goto: false, //进来是否跳转到评论
      pastedata: {}, //数据
      loading: true, //加载显示
      PitchHeight: 0, //评论下的标签栏的距离高
      detailTabsDisplay: false, //标签栏是否显示
      commentlength: 0, //评论数目
      commentData: [], //用来切换楼主评论和全部评论
      bardisply: true, //楼主评论和全部评论没有评论将用暂无评论来代替
      publish: true, //评论栏显示与隐藏
      text: "正在回复中..."
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),
    scroll() {
      return this.$refs.scroll.scroll;
    },
    pasteheadval() {
      //帖子头部信息栏
      class paste {
        constructor({ img, name, date }) {
          this.img = img; //头像
          this.name = name; //名称
          this.date = date; //时间
        }
      }
      return new paste(this.pastedata);
    },
    pastebottomval() {
      //主帖子底部值
      class paste {
        constructor({ plate, like }) {
          this.plate = plate; //回复
          this.like = like; //点赞
        }
      }
      return new paste(this.pastedata);
    },
    yesnull() {
      if (this.commentData.length === 0) return false;
      return true;
    },
    snackbar() {
      return this.$refs.snackbars;
    }
  },
  watch: {
    pastedata() {
      // let tx = Array.isArray(this.pastedata.comment); //检查是不是数组
      // if (tx) {
      // }
      this.commentlength = this.pastedata.comment.length; //回复数量

      [].forEach.call(this.pastedata.comment, item => {
        item.likeststuc = item.likeid.includes(this.userinfo.id); //首次进入详情页判度登录者id有没有在每一个回复点赞人数数组下
      });

      this.pastedata.status = this.pastedata.likelist.includes(
        this.userinfo.id
      ); //判断在首页跳转到详情页时有没有给帖子点赞

      //没有登录不要检查
      if (localStorage.getItem("user")) {
        //进来第一时间看一下用户有没有对这个帖子收藏
        this.userinfo.collect.forEach(item => {
          //判断用户收藏的帖子id 和 进入的贴子id
          //有就改变收藏图标
          if (item.id === this.id) {
            this.pastedata.favoritestatus = true;
          }
        });
      }

      this.$nextTick(() => {
        this.goto ? this.scroll.scrollTo(0, -this.PitchHeight, 1) : false; //进来是否跳转到评论
      });
    },
    loading: {
      handler() {
        this.$nextTick(() => {
          //在下次dom循环更新后执行
          this.loadimg(); //初始化"detailTabs"子组件距离父组件"scrol"高度
        });
      }
    },
    $route(to) {
      if (to.path === "/detail") {
        this.publish = true;
      }
    },
    deep: true,
    immediate: true
  },
  created() {
    this.goto = this.$route.query.goto; //进来是否跳转到评论
    this.id = this.$route.query.id; //进入详情页传过来的id

    detaildata(this.id).then(
      ({ detaildata }) => {
        this.loading = false;
        this.pastedata = detaildata; //详情数据
        this.commentData = detaildata.comment; //回复数据
      },
      reason => {
        console.log(reason);
      }
    );
  },
  methods: {
    position(position) {
      //当滑动一定高度时是否显示标签栏
      //PitchHeight 标签栏距离父组件高度 动态获取
      this.detailTabsDisplay = -position >= this.PitchHeight;
    },
    loadimg() {
      this.$refs.scroll.refresh(); //一有图片刷新重新刷新文档

      this.PitchHeight =
        this.$refs.detailtabs.$el.offsetTop - this.$refs.nav.$el.offsetHeight; //"detailTabs"子组件距离父组件"scroll"高度
    },
    /**
     * @param rid
     */
    findData(pastedata, rid) {
      let { id } = this.userinfo;
      let uid = id; //用户id

      //查找帖子下的回复
      let obj = pastedata.comment.find(item => {
        return item.id === rid;
      });

      if (obj.likeid.includes(uid)) return; //用户id在回复的点赞人数下有存在吗？
      obj.likeid.push(uid);
    },
    //排序
    sorts(value, index) {
      this.$refs.isdetailtabs.isindex = this.$refs.detailtabs.isindex = index;

      if (value === "inverted") {
        this.pastedata.comment.sort((a, b) => {
          return b.date - a.date;
        });
      } else {
        this.pastedata.comment.sort((a, b) => {
          return a.date - b.date;
        });
      }
    },
    //查看全部评论或楼主评论
    switchdiaplay(index) {
      this.$refs.isdetailtabs.indexs = this.$refs.detailtabs.indexs = index;

      //查看楼主评论
      if (index === 1) {
        let Lzid = this.pastedata.comment.filter(item => {
          return item.id === this.pastedata.uid;
        });

        this.commentData = Lzid;
        if (Lzid.length === 0) {
          this.bardisply = false;
        }
      } else {
        //查看全部评论
        this.commentData = this.pastedata.comment;
        this.bardisply = true;
      }
    },
    focus() {
      this.$router.push("/detail/pubilsh").catch(err => {
        err;
      });
      this.publish = false; //获取焦点时隐藏
    },
    blur() {
      this.publish = true; //失去焦点时显示
    },

    //发表回复
    shareit(value) {
      if (!localStorage.getItem("token")) {
        this.$toast("请登录");
      } else {
        this.snackbar.snackbar = true;
        let pid = this.id; //帖子id

        //收集信息发送到后台
        class userinfo {
          constructor({ id, name, image }) {
            this.pasteid = pid; //帖子id
            this.id = id; //用户id
            this.name = name; //用户名称
            this.img = image; //用户头像
            this.data = Date.now(); //发表时间
            this.title = value; //发表内容
            this.county = "广东省"; //地址
            this.like = 0; //点赞数量
            this.likeid = []; //点赞的人
            this.likeststuc = false; //点赞图标颜色
          }
        }

        const data = new userinfo(this.userinfo);

        DetailShareit(data)
          .then(({ data }) => {
            this.snackbar.snackbar = false;
            this.publish = true; //请求成功后隐藏
            this.pastedata.comment.unshift(data); //添加到回复数组最前面
            this.$refs.scroll.scrollTo(0, -this.PitchHeight, 1); //立刻跳转到发表的位置
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //点击收藏业务
    collect() {
      this.pastedata.favoritestatus = true; //改变收藏图标

      let _this = this;
      class collect {
        constructor({ id, img, name, uid, content, title }) {
          this.id = id; //帖子id
          this.uid = _this.userinfo.id; //用户id
          this.uid = uid; //帖子用户uid
          this.img = img; //帖子用户头像
          this.name = name; //帖子用户名称
          this.title = title; //描述
          this.postimage = content.image[0]; //随便一张帖子照片
        }
      }
      let collectdata = new collect(this.pastedata);

      this.$store.commit(FAVORITEPOST, collectdata);

      DetailCollect(collectdata)
        .then(val => {
          return new Promise((resolve, reject) => {
            !val && reject(new Error("异常错误!"));

            resolve(val);
          }).then(value => {
            value;
          });
        })
        .catch(error => {
          this.$toast(error);
        });
    },

    //取消/删除收藏
    onDeleteCollect() {
      this.pastedata.favoritestatus = false; //改变收藏图标

      let obj = {};
      obj.id = this.id; //帖子id
      obj.uid = this.userinfo.id; //用户idZZ

      DeleteCollect(obj).then(
        value => {
          this.$store.commit(DELETECOLLECT, value);
        },
        reason => {
          Promise.reject(reason);
        }
      );
    }
  },
  mounted() {
    this.$bus.$on("islike", rid => {
      let { id } = this.userinfo; //用户id

      let uid = id;

      //查找帖子下的回复
      let iid = this.pastedata.comment.find(item => {
        return item.id === rid;
      });

      //查找回复的kikeid数组中有没有登录者id
      let likeid = iid.likeid.includes(uid);

      //有登录者id
      if (likeid) {
        let index = iid.likeid.indexOf(uid); //查找登录者id位置

        iid.like--; //再次点赞时取消点赞并点赞数减一
        iid.likeid.splice(index, 1); //删除登录者id
        iid.likeststuc = false; //点赞图标变色

        //发送请求让后台删除点赞用户id
        DetailModifyData({
          iid: this.pastedata.id, //帖子id
          rid, //回复id
          method: "detele", //删除
          uid //用户id
        }).then(({ res }) => {
          res;
        });
      } else {
        //没有登录者id
        this.findData(this.pastedata, rid); //将登录者id添加到数组中

        iid.like++; //点赞数加一
        iid.likeststuc = true; //点赞图标变色

        /**iid 帖子id  id 要点赞回复的id */
        //发送请求让后台添加点赞用户id
        DetailModifyData({
          iid: this.pastedata.id, //帖子id
          rid, //回复id
          method: "change", //增加
          uid //用户id
        }).then(value => {
          value;
        });
      }
    }); //src\components\content\displaybar\displayPosts.vue

    this.$bus.$on("detailAddLike", id => {
      addLike({ id, uid: this.userinfo.id })
        .then(res => {
          this.pastedata.status = true;
          this.pastedata.like = res;
        })
        .catch(err => {
          this.$toast(err);
        });
    }); //src\components\content\posttemplate\PostTemplateContentBottom.vue
  }
};
</script>

<style scoped>
#detail {
  background-color: #fafafa;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  z-index: 99;
}
#tabs {
  box-shadow: 0 1px #fafafa;
}
.head {
  box-shadow: 0 1px #f0f0f0;
}
.nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #ffffff;
}
.scroll {
  height: calc(100vh - 40px - 44px - 32px);
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tabs {
  background: #ffffff;
  position: relative;
  z-index: 999;
}
.contentbottom {
  background: #ffffff;
  margin-bottom: 10px;
}
.swarchfor {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.tabbar {
  width: 100%;
}
.publish {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
</style>