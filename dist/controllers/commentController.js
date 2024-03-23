"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
exports.comments_on_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment.find({
            post: req.params.id,
        })
            .sort({ timestamp: -1 })
            .exec();
        if (!comments) {
            res
                .status(400)
                .json({ success: false, message: 'comments werent found' });
        }
        else {
            res.json({ comments: comments });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.comment_add = [
    body('text', 'text must not be empty and must not be more than 5000 characters')
        .trim()
        .escape()
        .isLength({ min: 1, max: 5000 }),
    body('author', 'text must not be empty and must not be more than 25 characters')
        .trim()
        .escape()
        .isLength({ min: 1, max: 25 }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, message: errors });
            }
            else {
                const comment = new Comment({
                    text: req.body.text,
                    author: req.body.author,
                    post: req.params.id,
                });
                yield comment.save();
                res
                    .status(200)
                    .json({ success: true, message: 'comment added successfully' });
            }
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.comment_update = [
    body('text', 'text must not be empty and must not be more than 5000 characters')
        .trim()
        .escape()
        .isLength({ min: 1, max: 5000 }),
    body('author', 'text must not be empty and must not be more than 25 characters')
        .trim()
        .escape()
        .isLength({ min: 1, max: 25 }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, message: errors });
            }
            else {
                const comment = new Comment({
                    text: req.body.text,
                    author: req.body.author,
                    post: req.params.postId,
                    _id: req.params.commentId,
                });
                yield Comment.findByIdAndUpdate(req.params.commentId, comment, {});
                res
                    .status(200)
                    .json({ success: true, message: 'Comment Updated Successfully' });
            }
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.comment_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Comment.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ success: true, message: 'Comment Deleted Successfully' });
    }
    catch (err) {
        return next(err);
    }
});
