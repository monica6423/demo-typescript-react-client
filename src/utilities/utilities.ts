export const debounce = (fn: any, delay = 300) => {
  let timer: any;
  return (...args: string[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };
};
