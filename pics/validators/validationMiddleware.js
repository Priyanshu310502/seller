const validation = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(200).send("error : " + error.details[0].message);
        console.log(`error: ${error}, value: ${value}`);
    } else {
        next();
    }
};

module.exports = { validation };






















