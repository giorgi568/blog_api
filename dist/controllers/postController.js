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
const Post = require('../models/post');
exports.posts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post.find({})
            .sort({ timestamp: -1 })
            .populate('author')
            .exec();
        if (!posts) {
            res.status(400).json({ success: false, message: 'posts werent found' });
        }
        else {
            res.json({ posts: posts });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield Post.findById(postId).exec();
        if (!post) {
            res.status(400).json({ success: false, message: 'post was not found' });
        }
        else {
            res.json({ post: post });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.post_add = [
    body('title', 'title must not be empty').trim().escape().isLength({ min: 1, max: 200 }),
    body('text', 'text must not be empty').trim().escape().isLength({ min: 1, max: 10000 }),
    body('author', 'author must not be empty')
        .trim()
        .escape()
        .isLength({ min: 1 }),
    body('published', 'published status must be specified')
        .trim()
        .escape()
        .isBoolean(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, message: errors });
            }
            else {
                const post = new Post({
                    title: req.body.title,
                    text: req.body.text,
                    author: req.body.author,
                    published: req.body.published,
                });
                yield post.save();
                res
                    .status(200)
                    .json({ success: true, message: 'Post saved successfully' });
            }
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.post_update = [
    body('title', 'title must not be empty').trim().escape().isLength({ min: 1, max: 200 }),
    body('text', 'text must not be empty').trim().escape().isLength({ min: 1, max: 10000 }),
    body('author', 'author must not be empty')
        .trim()
        .escape()
        .isLength({ min: 1 }),
    body('published', 'published status must be specified')
        .trim()
        .escape()
        .isBoolean(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ success: false, message: errors });
            }
            else {
                const post = new Post({
                    title: req.body.title,
                    text: req.body.text,
                    author: req.body.author,
                    published: req.body.published,
                    _id: req.params.id,
                });
                yield Post.findByIdAndUpdate(req.params.id, post, {});
                res
                    .status(200)
                    .json({ success: true, message: 'Post Updated successfully' });
            }
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }),
];
exports.post_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ success: true, message: 'Post Deleted successfully' });
    }
    catch (err) {
        return next(err);
    }
});
