const Application = require("../db/Application");
const mongoose = require("mongoose");

const getApplicants = (req, res) => {
    const user = req.user;
    if (user.type === "recruiter") {
      let findParams = {
        recruiterId: user._id,
      };

      if (req.query.jobId) {
        findParams.jobId = new mongoose.Types.ObjectId(req.query.jobId);
      }

      if (req.query.status) {
        findParams.status = Array.isArray(req.query.status) ? 
                             { $in: req.query.status } : req.query.status;
      }

      let sortParams = {};

      if (!req.query.asc && !req.query.desc) {
        sortParams = { _id: 1 };
      }

      if (req.query.asc) {
        sortParams = createSortParams(req.query.asc, 1);
      }

      if (req.query.desc) {
        sortParams = {...sortParams, ...createSortParams(req.query.desc, -1)};
      }

      Application.aggregate([
        {
          $lookup: {
            from: "jobapplicantinfos",
            localField: "userId",
            foreignField: "userId",
            as: "jobApplicant",
          },
        },
        { $unwind: "$jobApplicant" },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        { $match: findParams },
        { $sort: sortParams },
      ])
        .then(applications => {
          if (applications.length === 0) {
            return res.status(404).json({ message: "No applicants found" });
          }
          res.json(applications);
        })
        .catch(err => res.status(400).json(err));
    } else {
      res.status(400).json({ message: "You are not allowed to access applicants list" });
    }
};

const createSortParams = (params, order) => {
    let sortParams = {};
    if (Array.isArray(params)) {
      params.forEach(key => {
        sortParams[key] = order;
      });
    } else {
      sortParams[params] = order;
    }
    return sortParams;
};

module.exports = {
  getApplicants,
};
