const axios = require('axios').default;
const getData = require('../utils/getData');
const UserData = require('../models/user_data');
const e = require('express');
module.exports = (req, res, next) => {
    //lat=57.718&lon=12.022&timespan=10
    axios.get(`https://everyonetest-route-planner.azurewebsites.net/api/plan/route?${req.params.data}`).then(result => {
        if (result.data.routes.length == 0) res.status(200).send('There are not routes'); else {
            let multiple = [];
            result.data.routes[0].legs.forEach(elem => {
                multiple.push(getData(elem.steps))
            })
            UserData.updateMany({ user_id: res.locals.id },
                { $addToSet: { data: multiple } }).then(doc => {
                    res.status(200).send('Data Inserted');
                })
        }
    })
}
