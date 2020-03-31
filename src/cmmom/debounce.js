/**
 * @param 防抖函数
 * @param {*} func //传入函数体
 * @param {*} delay //多少毫秒运行一次
 */

export function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    if (timer) {
      clearTimeout(timer); //判断timer有没有值,有就清除
    }

    // eslint-disable-next-line no-const-assign
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
