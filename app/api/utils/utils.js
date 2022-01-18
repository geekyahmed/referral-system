module.exports = (res, code, msg) => {
    //Refactor codes for response
    return res.status(code).json({
        code: code,
        msg: msg,
    });
};
