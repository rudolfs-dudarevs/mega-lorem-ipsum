const serializedForm = (form) => {
    let dataObj = {};
    let formData = new FormData(form);

    for (let key of formData.keys()) {
        dataObj[key] = formData.get(key);
    }

    return dataObj;
};
