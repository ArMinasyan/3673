// {
//     date: string
//        startPoint: {
//     latitude: number
//     longitude: number
//     },
//           endPoint:  {
//     latitude: number
//     longitude: number
//     },
//           duration: string,
//           distance: string
//     }

const UserData = require('../models/user_data');
module.exports = (req, res, next) => {
    UserData.updateMany({ user_id: res.locals.id },
        {
            $addToSet: {
                history: req.body
            }
        }).then(doc => {
            if (doc.nModified !== 0) res.status(200).send('Inserted');
            else res.status(304).send('Not Modified');
        })
}