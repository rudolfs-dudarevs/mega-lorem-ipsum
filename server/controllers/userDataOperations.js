const mongoose = require('mongoose');

const User = require('../models/user.js')

const get = async (req, res) => {
    try {
        let allDocuments = await User.find({});

        res.status(200).json(allDocuments)
    } catch (error) {
        res.status(500).json({
            msg: "Failed to UPDATE user data!"
        })
    }
};

const update = async (req, res, next) => {
    try {
        let userDocument = await User.findOneAndUpdate({
            "_id": req.query._id
        }, {
            $set: req.body
        }, {
            new: true,
            useFindAndModify: false
        });

        res.status(200).json({
            msg: "Succesfully UPDATE user data!"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Failed to UPDATE user data!"
        })
    }
};

const remove = async (req, res, next) => {
    try {
        User.find({
            "_id": req.query._id
        }).remove().exec(() => {
            res.status(200).json({
                msg: "Succesfully REMOVED user data!"
            })
        });
    } catch (error) {
        res.status(500).json({
            msg: "Failed to REMOVE user data!"
        })
    }
}

const add = async (req, res, next) => {
    try {
        let userDocument = new User(req.body);

        await userDocument.save();

        res.status(200).json({
            msg: "Succesfully UPDATE user data!"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Failed to UPDATE user data!"
        })
    }
};

module.exports = {
    get,
    update,
    add,
    remove
}