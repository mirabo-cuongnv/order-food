export const SPLIT_NUMBER = /\B(?=(\d{3})+(?!\d))/g;

export const formatPrice = (num, sufix = 'VND') => {
  let numFunc;
  if (num < 0) {
    numFunc = num * -1;
  } else {
    numFunc = num;
  }

  return `${Math.round(numFunc)}${sufix}`.replace(SPLIT_NUMBER, ',');
};

export function formatDate(timeSecond) {
  return new Date(timeSecond * 1000).toLocaleString();
}
