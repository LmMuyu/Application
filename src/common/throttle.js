/**
 * @param {*} func //函数体
 * @param {*} delay //执行时间
 */

export function throttle(func, delay) {
  var timer = null;
  return function() {
    const context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}
