import Mock, { Random } from "mockjs";

let _mock = Mock.mock;

Mock.setup({
  timeout: "1000-2000",
});

let { swiper } = _mock({
  "swiper|2": [
    Random.image(
      "400x200",
      Random.color(),
      Random.color(),
      "png",
      Random.csentence(3, 5)
    ),
    Random.image(
      "400x200",
      Random.color(),
      Random.color(),
      "png",
      Random.csentence(3, 5)
    ),
    Random.image(
      "400x200",
      Random.color(),
      Random.color(),
      "png",
      Random.csentence(3, 5)
    ),
  ],
});

let paste = [];

for (let i = 0; i < 100; i++) {
  paste.push(
    Mock.mock({
      id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
      "name|1": Random.cname(),
      "img|1": Random.image("64x64", Random.color(), Random.word()),
      date: Date.now(),
      "title|1": Random.title(3, 5),
      like: Math.floor(Math.random() * 10000),
      plate: "官方",
      "content|2": {
        "image|0-3": [Random.image("200x100", Random.color(), Random.word())],
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
  let data = paste.find((item) => {
    return item.id === iid;
  }); //查找主帖子

  let datas = data.comment.find((item) => {
    return item.id === id;
  }); //查找主帖子下回复

  if (method === "change") {
    if (datas.likeid.includes(uid)) return; //判断传过来的用户id在回复点赞数组下有存在吗？
    datas.likeid.unshift(uid); //添加到回复点赞数组中
    datas.like++; //点赞人数加一
    return datas;
  } else {
    let index = datas.likeid.indexOf(uid); //查找用户id位置
    datas.likeid.splice(index, 1); //删除传过来的回复点赞数组
    datas.like--; //点赞人数减一
    return datas;
  }
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
