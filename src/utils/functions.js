export function getKeyByValue(object, value) {
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (object[prop] === value) return prop;
    }
  }
}

export function getValuesInform(targetForm) {
  const formData = new FormData(targetForm);
  const datas = Object.fromEntries(formData);

  return datas;
}
