import Mock, { Random } from "mockjs";

let _mock = Mock.mock;

Mock.setup({
  timeout: "2000-6000"
});

let { swiper } = _mock({
  "swiper|5": [
    Random.image(
      "400x200",
      Random.color(),
      Random.color(),
      "png",
      Random.csentence(3, 5)
    )
  ]
});

let { paste } = _mock({
  "paste|100": [
    {
      id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
      "name|1": Random.cname(),
      "img|1": Random.image("64x64", Random.color(), Random.word()),
      "date|1": Random.date(),
      "title|1": Random.title(3, 5),
      like: Math.floor(Math.random() * 10000),
      "content|1": {
        "image|0-3": [Random.image("200x100", Random.color(), Random.word())],
        content: [Random.cparagraph() + Random.cparagraph()]
      },
      "comment|0-100": [
        {
          id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
          name: Random.cname()
        }
      ]
    }
  ]
});

Mock.mock("/home/swiper", "get", () => {
  return {
    list: swiper,
    message: "请求成功"
  };
});

Mock.mock(/\/home\/paste/, "get", ({ url }) => {
  let page = url.split("=");
  let t = Number(page[1]);
  let s = 15 * (t - 1);
  let pastes = paste.slice(s, 15 * t);

  return {
    list: pastes,
    message: "请求成功"
  };
});
