const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Level = require("../models/levelModel");
const User = require("../models/userModel");
const Examination = require("../models/examinationModel");
const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Attendance = require("../models/attendanceModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");
const {
  getAttendanceByGender,
  processGeneralWeeklyAttendance,
} = require("../config/helper");

const LEVEL_OPTIONS = [
  "Day Care",
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten 1",
  "Kindergarten 2",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "Basic 7",
  "Basic 8",
  "Basic 9",
  "Basic 10",
  "Basic 11",
  "Basic 12",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Stage 1",
  "Stage 2",
  "Stage 3",
  "Stage 4",
  "Stage 5",
  "Stage 6",
  "Stage 7",
  "Stage 8",
  "Stage 9",
  "Stage 10",
  "Stage 11",
  "Stage 12",
  "J.H.S 1",
  "J.H.S 2",
  "J.H.S 3",
];

//@GET all current level by current school session
router.get(
  "/session",
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;
    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
      active: true,
    })
      .populate({
        path: "students",
        match: { active: true },
      })
      .populate("subjects") // Populate subjects
      .populate("grades") // Populate grades
      .populate("fee") // Populate fees
      .populate({
        path: "teacher",
        select: ["firstname", "lastname", "profile"],
      }); // Populate Teacher

    const modifiedLevels = levels.sort(
      (a, b) =>
        LEVEL_OPTIONS.indexOf(a?.level?.name) -
        LEVEL_OPTIONS.indexOf(b?.level?.name)
    );

    const currentSubjects = await Subject.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    }).countDocuments();

    if (_.isEmpty(modifiedLevels)) {
      return res.status(200).json({
        students: [],
        subjects: currentSubjects,
        levelsOption: [],
        fees: [],
        levelSummary: {
          noOfLevels: 0,
          noOfSubjects: 0,
          noOfAssignedTeachers: 0,
        },
      });
    }

    const selectedLevels = modifiedLevels?.map(
      ({ _id, level, fee, students, subjects, teacher }) => {
        return {
          _id,
          level,
          type: `${level?.name}${level?.type || ""}`,
          noOfStudents: students?.length,
          noOfSubjects: subjects?.length,
          teacher: {
            _id: teacher?._id,
            fullName: teacher?.fullname,
            profile: teacher?.profile,
          },
          fee: _.isUndefined(fee)
            ? null
            : {
                _id: fee?._id,
                levelId: _id,
                levelName: `${level?.name}${level?.type || ""}`,
                amount: fee?.amount || 0,
                fees: _.sumBy(fee?.amount, (fees) => fees.amount),
              },
        };
      }
    );

    // NUMBER OF LEVELS
    const noOfLevels = levels.length;

    //NUMBER OF ASSIGNED TEACHERS
    const modifiedTeachers = _.filter(levels, "teacher");
    const noOfAssignedTeachers = _.isEmpty(modifiedTeachers)
      ? 0
      : modifiedTeachers.length;

    //SUBJECTS
    const subjects = _.flatMap(levels, "subjects");
    //FEES
    const fees = _.compact(_.map(selectedLevels, "fee"));

    //STUDENTS
    const modifiedStudents = levels.flatMap(({ _id, students, level }) => {
      return students.map((student) => {
        return {
          ...student._doc,
          fullName: student.fullName,
          levelId: _id,
          levelName: `${level?.name}${level.type || ""}`,
        };
      });
    });

    res.status(200).json({
      students: modifiedStudents,
      subjects: currentSubjects,
      fees,
      levelsOption: selectedLevels,
      levelSummary: {
        noOfLevels,
        noOfSubjects: subjects?.length,
        noOfAssignedTeachers,
      },
    });
  })
);

//Get dashboard info
router.get(
  "/dashboard-info",
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;

    //No of teachers
    const noOfTeachers = await User.find({
      school: req.user.school,
      role: "teacher",
    }).countDocuments({ active: true });

    //No of levels
    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    })
      .populate({
        path: "students",
        match: { active: true },
      })
      .populate("subjects") // Populate subjects
      .populate("grades"); // Populate grades

    //No of Students
    const students = _.flatMap(levels, "students");

    const maleCount = students?.filter((student) => {
      return student?.gender === "male";
    });

    const femaleCount = students?.filter((student) => {
      return student?.gender === "female";
    });

    const attendances = levels.flatMap(async (level) => {
      const attendance = await Attendance.find({
        level: new ObjectId(level?._id),
      })
        .populate({
          path: "level",
          select: "level",
        })
        .select(["date", "status"]);

      const data = attendance.map((at) => {
        return {
          level: level?.levelName,
          date: at?.date,
          status: at?.status,
        };
      });

      return data;
    });

    const allAttendances = await Promise.all(attendances);

    const modifiedAttendance = _.flatMap(allAttendances);
    const weeklyAttendances =
      processGeneralWeeklyAttendance(modifiedAttendance);
    const genderAttendance = getAttendanceByGender(modifiedAttendance);

    //No of Levels
    const noOfLevels = levels.length;

    // No of Subjects
    const subjects = await Subject.find({
      session,
      term,
    }).countDocuments();

    const dashboardInfo = {
      teachers: noOfTeachers,
      levels: noOfLevels,
      courses: subjects,
      students: students?.length,
      studentCount: {
        male: maleCount?.length,
        female: femaleCount?.length,
      },
      weeklyAttendances,
      genderAttendance,
    };

    res.status(200).json(dashboardInfo);
  })
);
//@GET all current level by current school session
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const level = await Level.findById(id)
      .populate({
        path: "students",
        match: { active: true },
      })
      .populate("subjects") // Populate subjects
      .populate("grades"); // Populate grades

    if (level.students?.length !== 0) {
      const modifiedStudents = level?.students.map((student) => {
        return {
          ...student?._doc,
          fullName: student.fullName,
          levelId: id,
          levelName: `${level.level?.name}${level.level?.type}`,
        };
      });

      const modifiedLevel = {
        ...level?._doc,
        students: modifiedStudents,
      };
      // //console.log(modifiedLevel);
      return res.status(200).json(modifiedLevel);
    }

    res.status(200).json(level);
  })
);
//@GET all current level by current school session
router.get(
  "/previous",
  asyncHandler(async (req, res) => {
    const { session, term, student } = req.query;

    const levels = await Level.find({
      session,
      term,
    })
      .populate({
        path: "students",
        match: { active: true },
      })
      .select("level");

    let modifiedLevel = [];

    if (student) {
      modifiedLevel = levels?.map((level) => {
        const students = level?.students?.map((student) => ({
          _id: student?._id,
          indexnumber: student?.indexnumber,
          firstname: student?.firstname,
          surname: student?.surname,
          othername: student?.othername,
          dateofbirth: student?.dateofbirth,
          gender: student?.gender,
          email: student?.email,
          phonenumber: student?.phonenumber,
          address: student?.address,
          residence: student?.residence,
          nationality: student?.nationality,
        }));

        return {
          _id: level?._id,
          level: level?.level,
          file: level?.levelName,
          data: students,
        };
      });
    } else {
      modifiedLevel = levels?.map((level) => {
        return {
          levelName: level?.levelName,
          ...level?.level,
        };
      });
    }

    res.status(200).json(modifiedLevel);
  })
);

//@GET all current subjects by level id
router.get(
  "/subject",
  asyncHandler(async (req, res) => {
    const levelId = req.query.levelId;
    //console.log(levelId);
    const subjects = await Level.findById(levelId).select("subjects grades");
    // console.log(subjects);

    res.status(200).json(subjects);
  })
);

//@GET all current level by current school session
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const level = await Level.findById(id)
      .populate({
        path: "students",
        match: { active: true },
      })
      .populate("subjects") // Populate subjects
      .populate("grades") // Populate grades
      .populate("fee") // Populate fees
      .populate({
        path: "teacher",
        select: ["firstname", "lastname", "profile"],
      }); // Populate Teacher

    res.status(200).json(level);
  })
);

router.post(
  "/students/all",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    const AllStudents = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    }).populate({
      path: "students",
      match: { active: true },
    });

    if (_.isEmpty(AllStudents)) {
      return res.status(200).json([]);
    }

    const modifiedStudents = AllStudents.flatMap(({ _id, students, level }) => {
      return students.map((student) => {
        return {
          ...student._doc,
          fullName: student.fullName,
          levelId: _id,
          levelName: `${level?.name}${level.type}`,
        };
      });
    });

    res.status(200).json(modifiedStudents);
  })
);

//Generate next term level details if not exists
router.post(
  "/generate",
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    //FInd if current level exists
    const currentLevels = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    });

    if (!_.isEmpty(currentLevels)) {
      return res.status(200).json([]);
    }

    //find prevoius levels
    //FInd if levels exists
    const levels = await Level.find({
      session: new ObjectId(sessionId),
    });

    if (_.isEmpty(levels)) {
      return res.status(200).json([]);
    }

    //GET all existing students
    const previousLevels = await Level.find({
      session: new ObjectId(sessionId),
    });

    const selectedLevels = previousLevels.map(({ level }) => {
      return {
        levelName: `${level.name}${level.type}`,
      };
    });

    // //Merge all levels with same name
    const mergedLevels = _.values(
      _.merge(_.keyBy(selectedLevels, "levelName"))
    );

    //GENERATE New Level info
    const students = mergedLevels.map(
      ({ level, teacher, subjects, students, grades }) => {
        return {
          session: new ObjectId(sessionId),
          term: new ObjectId(termId),
          teacher,
          level,
          subjects,
          grades,
          students: _.uniqWith(students, _.isEqual),
          rollNumber: students?.length || 0,
          attendance: 0,
        };
      }
    );

    //ADD Students to new class
    const newLevels = await Level.insertMany(students);

    //GENERATE examination info of students
    const newStudents = newLevels.flatMap(({ _id, students }) => {
      return students.map((student) => {
        return {
          session: sessionId,
          term: termId,
          level: _id,
          student: student?._id,
          scores: [],
          overallScore: 0,
          comments: {},
        };
      });
    });

    await Examination.insertMany(newStudents);

    res.sendStatus(201);
  })
);

//@POST add new level to current school session
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newLevel = req.body;

    // console.log(newLevel)

    const level = await Level.create({
      ...newLevel,
      createdBy: req.user?.id,
    });

    if (_.isEmpty(level)) {
      return res.status(404).json("Error creating new levels.Try again later");
    }

    res.status(201).json("New Level created successfully!!!");
  })
);
//@POST add new level to current school session
router.post(
  "/many",
  asyncHandler(async (req, res) => {
    const { session, term, levels } = req.body;

    const existingLevels = await Level.find({
      session,
      term,
      level: {
        $in: levels,
      },
    }).select("level");

    if (!_.isEmpty(existingLevels)) {
      return res.status(400).json({
        isDuplicateError: true,
        message: `Some Levels already exist.Please check and try again.`,
        data: _.map(existingLevels, "levelName"),
      });
    }

    const modifiedLevels = levels.map((level) => {
      return {
        level,
        session,
        term,
        createdBy: req.user?.id,
      };
    });

    const level = await Level.insertMany(modifiedLevels);

    if (_.isEmpty(level)) {
      return res.status(404).json("Error creating new levels.Try again later");
    }

    res.status(201).json("News Level created successfully!!!");
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const updatedLevel = req.body;
    const level = await Level.findByIdAndUpdate(
      updatedLevel._id,
      {
        $set: {
          level: updatedLevel?.level,
          teacher: updatedLevel?.teacher,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json("Error updating level info.Try again later");
    }

    res.status(201).json("Level details updated successfully!!!");
  })
);

router.put(
  "/grade",
  asyncHandler(async (req, res) => {
    const { levels, grade } = req.body;

    const level = await Level.updateMany(
      {
        _id: {
          $in: levels,
        },
      },
      {
        $set: {
          grades: new ObjectId(grade),
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json("Error assigning grades.Try again later");
    }

    res.status(201).json("Grades Assigned Successfully!!!");
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, id } = req.query;
    const deletedLevel = await Level.findByIdAndDelete(id);

    if (_.isEmpty(deletedLevel)) {
      return res.status(404).json("Error removing level info.Try again later");
    }

    res.status(201).json(" Level has been removed successfully!!!");
  })
);

router.post(
  "/delete/many",
  asyncHandler(async (req, res) => {
    const ids = req.body.ids;
    const deletedLevels = await Level.deleteMany(ids);

    if (_.isEmpty(deletedLevels)) {
      return res.status(404).json("Error removing levels info.Try again later");
    }

    res.status(201).json(" Levels Removed!");
  })
);

////////////......................SUBJECTS........................\\\\\\\\\\\\\\

//@POST add new subjects to current level

router.put(
  "/subject",
  asyncHandler(async (req, res) => {
    const { levelId, subjects } = req.body;
    const newSubjects = await Level.findByIdAndUpdate(levelId, {
      subjects: _.map(subjects, (subject) => new ObjectId(subject)),
    });
    if (_.isEmpty(newSubjects)) {
      return res
        .status(404)
        .send("Error creating new Subjects.Try again later");
    }

    res.status(201).json("New Courses Added !!!");
  })
);

//@GET Teacher current level
router.post(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, teacher } = req.body;

    const level = await Level.findOne({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      teacher: {
        _id: teacher,
      },
    }).populate("level");

    const modifiedLevel = {
      _id: level?._id || "",
      type: `${level?.level?.name}${level?.level?.type}` || "",
    };

    res.status(200).json(modifiedLevel);
  })
);

//@PUT Assign a Teacher
router.put(
  "/assign-teacher",
  asyncHandler(async (req, res) => {
    const { _id, teacher } = req.body;

    const isLevelAssigned = await Level.findById(_id).populate({
      path: "teacher",
      select: ["firstname", "lastname", "profile"],
    });

    if (!_.isEmpty(isLevelAssigned.teacher)) {
      return res
        .status(400)
        .json(`Level already assigned to ${isLevelAssigned.teacher?.fullname}`);
    }

    const level = await Level.findByIdAndUpdate(
      _id,
      {
        $set: {
          teacher,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(400).json("Error assigning Level.Try again later");
    }

    res.status(201).json("Level has been assigned successfully!!!");
  })
);

router.put(
  "/unassign-teacher",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const level = await Level.findByIdAndUpdate(
      id,
      {
        $set: {
          teacher: null,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json("Error updating info.Try again later");
    }

    res.status(201).json("Changes Saved!!!");
  })
);

// Birthdays

router.get(
  "/recent/birthday",
  asyncHandler(async (req, res) => {
    const targetDate = new Date();
    const month = targetDate.getMonth();
    const day = targetDate.getDate();

    // return res.status(200).json([]);

    const students = await Student.find({
      $expr: {
        $and: [
          { $eq: [{ $month: { $toDate: "$dateofbirth" } }, month + 1] }, // +1 since JS months are 0-based
          { $eq: [{ $dayOfMonth: { $toDate: "$dateofbirth" } }, day] },
        ],
      },
      active: true,
    });

    const bds = students.map((student) => {
      return {
        _id: student?._id,
        profile: student?.profile,
        fullname: student?.fullName,
        dob: student?.dateofbirth,
      };
    });

    res.status(200).json(bds);
  })
);

module.exports = router;
