import Mock, { Random } from "mockjs";
import { Math } from "core-js";

Mock.setup({
  timeout: "1000-2000",
});

let swiper = [];

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

let paste = [];

for (let i = 0; i < 100; i++) {
  paste.push(
    Mock.mock({
      uid: /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
      id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
      name: Random.cname(),
      img: Random.image("64x64", Random.color(), Random.word()),
      date: Date.now(),
      title: Random.title(3, 5),
      like: Math.floor(Math.random() * 10000),
      plate: "官方",
      content: {
        image: function() {
          let image = [];
          for (let i = 0; i < Math.random() * 3; i++) {
            image.push(Random.image("200x100", Random.color(), Random.word()));
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
 * @param {string} id 回复id
 * @param {any} method change 添加
 * @param uid 用户id
 */

function datapost(iid, id, method, uid = 1000) {
  let datas = paste
    .find((item) => {
      return item.id === iid;
    })
    .comment.find((item) => {
      return item.id === id;
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

Mock.mock("/home/swiper", "get", () => {
  return {
    list: swiper,
    message: "请求成功",
  };
});

Mock.mock(/\/home\/paste/, "get", ({ url }) => {
  let page = url.split("=");
  let t = Number(page[1]);
  let s = 15 * (t - 1);
  let pastes = paste.slice(s, 15 * t);

  return {
    list: pastes,
    message: "请求成功",
  };
});

Mock.mock(/home\/paste\/post/, "post", ({ body }) => {
  let { iid, id, method } = JSON.parse(body); //字符对象转普通对象

  let val = datapost(iid, id, method);
  return val;
});

/**
 * detail
 */

//发表评论
let shareit = (data) => {
  let datas = JSON.parse(data); //字符串对象转为普通对象

  //判断传过来的对象有没有id
  if (datas.id instanceof Object) {
    let { id } = Mock.mock({
      id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
    });
    datas.id = id;
  }
  let { pasteid } = datas; //获取在发表评论下的帖子id

  delete datas["pasteid"]; //删除帖子id

  paste
    .find((item) => {
      return item.id === pasteid;
    })
    .comment.unshift(datas);
  return datas;
};

Mock.mock(/detail\/data/, "get", ({ url }) => {
  let detaildata = detaildatas(url);

  return {
    detaildata,
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
