import Mock, { Random } from "mockjs";
import { Math } from "core-js";

// Mock.setup({
//   timeout: "1000-2000",
// });

let swiper = []; //首页轮播图
let paste = []; //帖子
let accountnumber = []; //是来存放用户的账号

/**
 * home
 */

function addLike(id, uid) {
  let post = paste.find((item) => {
    return item.id === id;
  });

  post.likelist.add(uid); //往点赞数组中添加用户id
  return post.like++; //点赞加一
}

function postData(url) {
  let page = url.split("=");
  let t = Number(page[1]);
  let s = 15 * (t - 1);
  return paste.slice(s, 15 * t);
}

for (let i = 0; i < 5; i++) {
  swiper.push(
    Random.image(
      "400x200",
      Random.color(),
      Random.color(),
      "png",
      Random.csentence(3, 5)
    )
  );
}

for (let i = 0; i < 100; i++) {
  paste.push(
    Mock.mock({
      uid: /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
      id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
      name: Random.cname(),
      img: Random.image("64x64", Random.color(), Random.word()),
      date: Date.now(),
      title: Random.title(3, 5),
      like: 0,
      likelist: new Set(),
      plate: "官方",
      content: {
        image: function() {
          let image = [];
          for (let i = 0; i < Math.random() * 3; i++) {
            image.push(
              Random.image(
                `${Random.integer(100, 200)}x${Random.integer(60, 100)}`,
                Random.color(),
                Random.word()
              )
            );
          }
          return image;
        },
        content: Random.cparagraph() + Random.cparagraph(),
      },
      comment: function() {
        let comment = [];

        for (let i = 0; i < Math.random() * 100; i++) {
          comment.push(
            Mock.mock({
              id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
              name: Random.cname(),
              img: Random.image("64x64", Random.color(), Random.word()),
              date: Date.now(),
              title: Random.cparagraph(1, 3),
              county: Random.county(true),
              like: 0,
              likeid: [],
              likeststuc: false,
            })
          );
        }

        return comment;
      },
    })
  );
}

/**
 * @param {string} iid 帖子id
 * @param {string} rid 回复id
 * @param {any} method change 添加
 * @param uid 用户id
 */

function datapost(iid, rid, method, uid) {
  let datas = paste
    .find((item) => {
      return item.id === iid;
    }) //查找帖子再找回复
    .comment.find((item) => {
      return item.id === rid;
    }); //查找帖子下回复

  //增加点赞
  if (method === "change") {
    if (datas.likeid.includes(uid)) return; //判断传过来的用户id在回复点赞数组下有存在吗？
    datas.likeid.unshift(uid); //添加到回复点赞数组中
    datas.like++; //点赞人数加一
    return datas;
  } else {
    // 取消点赞
    let index = datas.likeid.indexOf(uid); //查找用户id位置
    datas.likeid.splice(index, 1); //删除传过来的回复点赞数组
    datas.like--; //点赞人数减一
    return datas;
  }
}

function detaildatas(url) {
  let index = url.indexOf("=");
  let iid = url.slice(index + 1);

  let data = paste.find((item) => {
    return item.id === iid;
  });

  return data;
}

Mock.mock(/home\/swiper/, "get", () => {
  return {
    list: swiper,
    message: "请求成功",
  };
});

Mock.mock(/\/home\/paste/, "get", ({ url }) => {
  let pastes = postData(url);
  let postdata = pastes.map((item) => {
    return Object.assign({}, item);
  });
  
  postdata.forEach((item) => {
    item.likelist = [...item.likelist];
  }); //将new Set()转换为数组

  return {
    list: postdata,
    message: "请求成功",
  };
});

Mock.mock(/home\/paste\/post/, "post", ({ body }) => {
  let { iid, rid, method, uid } = JSON.parse(body); //字符对象转普通对象

  let val = datapost(iid, rid, method, uid);
  return val;
});

Mock.mock(/like\/addLike/, ({ body }) => {
  let { id, uid } = JSON.parse(body);
  let like = addLike(id, uid);
  return like + 1;
});

Mock.mock(/like\/deletelike/, "post", (options) => {
  console.log(options);
});

/**
 * detail
 */

//发表评论
let shareit = (data) => {
  let datas = JSON.parse(data); //字符串对象转为普通对象
  let { pasteid } = datas; //获取在发表评论下的帖子id
  delete datas["pasteid"]; //删除帖子id

  paste
    .find((item) => {
      return item.id === pasteid;
    }) //查找帖子
    .comment.unshift(datas); //在前面插入回复
  return datas;
};

let collects = (uid, rinfo) => {
  users
    .find((itme) => {
      return itme.id === uid;
    }) //查找用户
    .collect.unshift(rinfo); //添加收藏

  return true;
};

function deletecollect(id, uid) {
  let collectposte = users.find((item) => {
    return item.id === uid;
  }); //查找用户

  let collectIndex = collectposte.collect.findIndex((item) => {
    return item.id === id;
  }); //找到收藏帖子

  collectposte.collect.splice(collectIndex, 1); //删除收藏

  return collectIndex;
}

Mock.mock(/detail\/data/, "get", ({ url }) => {
  let detaildata = detaildatas(url);
  let postedata = Object.assign({}, detaildata);
  postedata.likelist = [...postedata.likelist];

  return {
    detaildata: postedata,
    maessage: "请求成功",
  };
});

//发表评论
Mock.mock(/detail\/data\/shareit/, "post", ({ body }) => {
  let data = shareit(body);
  return {
    data,
    meassage: "请求成功",
  };
});

//点击收藏
Mock.mock(/detail\/collect/, ({ body }) => {
  let data = JSON.parse(body);
  let { uid } = data;

  class UserData {
    constructor({ id, image, name, postimage }) {
      this.id = id; //帖子用户id
      this.image = image; //帖子用户头像
      this.name = name; //帖子用户名称
      this.postimage = postimage; //帖子图片
    }
  }
  let Rinfo = new UserData(data);
  let infocollect = collects(uid, Rinfo);

  return infocollect;
});

//取消收藏
Mock.mock(/detail\/deletecollect/, "post", ({ body }) => {
  let { id, uid } = JSON.parse(body);

  let collectIndex = deletecollect(id, uid);

  return collectIndex;
});

/**
 * login页面
 */

//用户id  //注册用的
let { id } = Mock.mock({
  id: /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
});

//注册时初始化
class createuser {
  constructor(name, account, password) {
    this.id = id;
    this.name = name; //名称
    this.image = Random.image(
      "200x100",
      Random.hex(),
      Random.hex(),
      Random.word()
    ); //头像
    this.posts = []; //帖子
    this.grade = 1; //级别
    this.attention = []; //关注数量
    this.account = account; //账号
    this.password = password; //密码
    this.recording = []; //记录
    this.collect = []; //收藏
    this.token = Random.guid(); //token令牌
  }
}

let users = []; //是来存放用户

//注册
let output_Information = function(user, username, password) {
  //注册时判断有没有该用户，有返回一个信息
  if (accountnumber.includes(username)) {
    return "账号已存在";
  }

  accountnumber.push(username); //添加账号
  let userinformation = new createuser(user, username, password); //注册用户
  users.push(userinformation); //添加信息用户

  return userinformation; //返回返回注册信息用户
};

//登录
/**
 *
 * @param {*} username 账号
 * @param {*} password 密码
 */
let loginInfos = (username, password) => {
  //判断有没有账号
  if (!accountnumber.includes(username)) {
    return "没有该用户或账号错误!";
  }

  //查找登录者信息
  let info = users.find((item) => {
    return item.account === username;
  });

  //看一下密码正确吗
  if (!info.password === password) {
    return "密码错误!";
  }

  //没有问题返回信息，登录成功
  return {
    info,
    measasage: true,
  };
};

//登录地址
Mock.mock(/login/, "post", ({ body }) => {
  let { username, password } = JSON.parse(body); //把字符串对象转换为普通对象

  let meassage = loginInfos(username, password);
  return meassage; //把信息返回回去
});

//注册地址
Mock.mock(/registered/, "post", ({ body }) => {
  //名称 账号 密码
  let { user, username, password } = JSON.parse(body); //把字符串对象转换为普通对象
  let textData = output_Information(user, username, password);

  return textData;
});
/**
 * login
 */
