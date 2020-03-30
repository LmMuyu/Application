import Mock, { Random } from "mockjs";

let _mock = Mock.mock;

let { list } = Mock.mock({
  "list|50": [
    {
      id: 1
    }
  ]
});

let { swiper } = _mock({
  swiper: [Random.image("400x200", "#50B347", "#FFF", "Mock.js")]
});

_mock("/home/swiper", "get", () => {
  return {
    status: 200,
    list: swiper,
    message: "请求成功"
  };
});

console.log(list);
