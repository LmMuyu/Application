import Mock, { Random } from "mockjs";

let _mock = Mock.mock;

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
      name: Random.cname(),
      img: Random.image("64x64", Random.color(), Random.word()),
      "image|0-3": [Random.image("200x100", Random.color(), Random.word())],
      date: Random.date(),
      title: Random.title(3, 5),
      content: {
        "image|0-3": [Random.image("200x100", Random.color(), Random.word())],
        "content|1-2": [Random.cparagraph() + Random.cparagraph()]
      }
    }
  ]
});

Mock.mock("/home/swiper", "get", () => {
  return {
    list: swiper,
    message: "请求成功"
  };
});

Mock.mock("/home/paste", "get", () => {
  return {
    list: paste,
    message: "请求成功"
  };
});
