const ValidationMethods = ['body', 'params', 'query'];

const validationFunction = (schema) => {
    return (req, res, next) => {
        let validationErrors = [];
        ValidationMethods.forEach((key) => {
            if (schema[key]) {
                const validateData = schema[key].validate(req[key], {
                    abortEarly: false
                })
                if (validateData.error) {
                    validationErrors.push(validateData.error);
                }
            }
        });
        if (validationErrors.length) {
            res.json({
                message: "validation error",
                validationErrors
            })
        } else {
            next()
        }
    }
}

module.exports = validationFunction;