/**
 * @param {*} func //函数体
 * @param {*} delay //执行时间
 */

export function throttle(func, delay) {
  let timer = null;
  return function() {
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        timer = null;
        func.apply(this, args);
      }, delay);
    }
  };
}
