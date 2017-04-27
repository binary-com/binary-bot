const createError = (name, message) => {
    const e = new Error(message);
    e.name = name;
    return e;
};

export default createError;
