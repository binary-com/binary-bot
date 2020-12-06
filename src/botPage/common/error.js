/* eslint-disable import/prefer-default-export */
export const createError = (name, message) => {
    const e = new Error(message);
    e.name = name;
    return e;
};
