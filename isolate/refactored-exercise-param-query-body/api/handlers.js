const handlers = {

    readValues: (req, res) => {
        const paramValue = req.params.value;
        const queryValue = req.query.value; //but this returns undefined i dont understand why
        const bodyValue = req.body.value;

        console.log(`param value: ${paramValue}`);
        console.log(`query value: ${queryValue}`);
        console.log(`body value: ${bodyValue}`);

        const responseData = {
            paramValue,
            queryValue,
            bodyValue,
        };
        res.json(responseData);
    }
};
module.exports = handlers;