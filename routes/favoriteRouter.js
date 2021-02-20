const express = require("express");
const Favorite = require("../models/favorites");
const authenticate = require("../authenticate");
const cors = require("./cors");

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("User")
      .populate("Campsite")
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader = ("Content-Type", "application/json");
        res.json(favorites);
      });
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.findOne({ user: req.user._id }).then((favorite) => {
        if (favorite) {
          req.body.forEach((fav) => {
            if (!favorite.campsite.includes(fav._id)) {
              favorite.campsite.push(fav._id).save();
            }
          });
        } else {
          Favorite.create({ user: req.user._id, campsite: req.body }).then(
            (favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            }
          );
        }
      });
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not supported`);
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.findOneAndDelete(req.params.user._id)

        .then((favorite) => {
          if (favorite) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
          } else {
            err = new Error(`No such campsite exists`);
            err.status = 404;
            next(err);
          }
        })
        .catch((err) => next(err));
    }
  );

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    //placeholder
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.findOne({ user: req.user._id }).then((fav) => {
        if (fav) {
          if (!fav.campsite.includes(req.params.campsiteId)) {
            favorite.campsite.push(req.params.campsiteId);
            favorite.save().then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            });
          } else {
            err = new Error(
              `That Campsite is already in the list of campsites`
            );
            err.status = 403;
            return next(err);
          }
        } else {
          Favorite.create({
            user: req.user._id,
            campsite: [req.params.campsiteId],
          }).then((favorite) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
          });
        }
      });
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      //placeholder
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.findOne(req.params.user._id).then((favorite => {
        if (favorite) {
        }
      });
    }
  );

module.exports = favoriteRouter;
