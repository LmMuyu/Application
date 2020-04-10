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

let { paste } = _mock({
  "paste|100": [
    {
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
      "comment|0-50": [
        {
          id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
          name: Random.cname(),
          img: Random.image("64x64", Random.color(), Random.word()),
          date: Date.now(),
          title: Random.cparagraph(1, 3),
          county: Random.county(true),
          like: 0,
          likeid: [],
          likeststuc: false,
        },
      ],
    },
  ],
});

/**
 * @param {string} iid 帖子id
 * @param {string} id 帖子回复id
 */
function datapost(iid, id, method) {
  let data = paste.find((item) => {
    return item.id === iid;
  }); //查找帖子对象

  let datas = data.comment.find((item) => {
    return item.id === id;
  }); //查找帖子对象下回复帖子

  if (method === "change") {
    if (datas.likeid.includes(id)) return; //判断传过来的id在回复帖子下有没有存在
    datas.likeid.unshift(id);
  } else {
    let index = datas.likeid.indexOf(id);
    datas.likeid.splice(index, 1);
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

  datapost(iid, id, method);
});
