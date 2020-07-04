const saveItem = (key, list) => {
  const itemJson = JSON.stringify(list);
  localStorage.setItem(key, itemJson);
  return list;
};

const getItem = (key) => JSON.parse(localStorage.getItem(key));

const isExistInList = (list, id) => list.find((video) => video.id === id);

const addItem = (key, item) => {
  const list = getItem(key);
  if (!list) return saveItem(key, [item]);
  if (isExistInList(list, item.id)) return list;
  return saveItem(key, [...list, item]);
};

const isFilteredInList = (list, id) => list.filter((video) => video.id !== id);

const removeItem = (key, item) => {
  const list = getItem(key);
  if (!list) return false;

  if (isFilteredInList(list, item.id)) {
    const result = list.filter((video) => video.id !== item.id);

    if (result.length > 0) {
      saveItem(key, result);
    } else {
      localStorage.removeItem(key);
    }
  }

  return isFilteredInList(list, item.id);
};

module.exports = {
  saveItem,
  getItem,
  addItem,
  removeItem,
};
