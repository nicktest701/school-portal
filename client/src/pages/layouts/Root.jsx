import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import screenfull from 'screenfull';
import Loader from "../../config/Loader";
import Shell from "../Shell";
import Login from "../Login";
import FeePrint from "../fees/FeePrint";
import LevelFeeInformation from "../fees/LevelFeeInformation";
import Subject_Grade from "../subject";
import NewAttendance from "../level/NewAttendance";
import PageNotFound from "../PageNotFound";
import Teacher from "../teacher";
import TeacherView from "../teacher/TeacherView";
import TeacherEdit from "../teacher/TeacherEdit";
import Profile from "../profile";
import Notifications from "../notifications";
import Event from "../events";
import EventHome from "../events/EventHome";
import NewEvent from "../events/NewEvent";
import ViewEvent from "../events/ViewEvent";
import EditEvent from "../events/EditEvent";

const FeeNew = lazy(() => import("../fees/FeeNew"));
const LevelExamScoreInput = lazy(() =>
  import("../examination/LevelExamScoreInput")
);
const ExamsHome = lazy(() => import("../examination/ExamsHome"));
const ExamsLevel = lazy(() => import("../examination/ExamsLevel"));
const ViewExamsReports = lazy(() => import("../examination/ViewExamsReports"));
const SMS = lazy(() => import("../sms"));
const SMSHome = lazy(() => import("../sms/SMSHome"));
const SMSNew = lazy(() => import("../sms/SMSNew"));
const Dashboard = lazy(() => import("../Dashboard"));
const Session = lazy(() => import("../session"));
const Fees = lazy(() => import("../fees"));
const Examination = lazy(() => import("../examination"));
const Student = lazy(() => import("../student"));
const UserHome = lazy(() => import("../user/UserHome"));
//
const StudentHome = lazy(() => import("../student/StudentHome"));
const StudentAdd = lazy(() => import("../student/StudentAdd"));
const StudentEdit = lazy(() => import("../student/StudentEdit"));
const StudentView = lazy(() => import("../student/StudentView"));

const TeacherHome = lazy(() => import("../teacher/TeacherHome"));
const About = lazy(() => import("../About"));
const Settings = lazy(() => import("../settings/Settings"));
const SchoolSession = lazy(() => import("../SchoolSession"));
const StudentAcademicsReport = lazy(() =>
  import("../student/StudentAcademicsReport")
);

const FeeHome = lazy(() => import("../fees/FeeHome"));
const FeeMakePayment = lazy(() => import("../fees/FeeMakePayment"));
const FeeHistory = lazy(() => import("../fees/FeeHistory"));
const FeeSettings = lazy(() => import("../fees/FeeSettings"));
const Level = lazy(() => import("../level"));
const LevelDashboard = lazy(() => import("../level/LevelDashboard"));
const CurrentLevel = lazy(() => import("../level/CurrentLevel"));
const StudentDetails = lazy(() => import("../student/StudentDetails"));
const Course = lazy(() => import("../course"));
const CourseHome = lazy(() => import("../course/CourseHome"));
const CourseLevel = lazy(() => import("../course/CourseLevel"));
const AssignedCourses = lazy(() => import("../course/AssignedCourses"));
const AssignedCoursesResults = lazy(() =>
  import("../course/AssignedCoursesResults")
);

const Root = () => {
  // useEffect(() => {
  //   if (screenfull.isEnabled) {
  //     screenfull.request();
  //   }
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Session />
              </Suspense>
            }
            path="/session"
          />

          {/* Class and Subjects */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Level />
              </Suspense>
            }
            path="level"
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <LevelDashboard />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <CurrentLevel />
                </Suspense>
              }
              path="current/:id/:type"
            />
            <Route
              path="attendance/:id/:type"
              element={
                <Suspense fallback={<Loader />}>
                  <NewAttendance to="/level/current" />
                </Suspense>
              }
            />
            {/* <Route
          element={
            <Suspense fallback={<Loader />}>
              <AddStudentModal />
            </Suspense>
          }
          path="student/new"
        /> */}
          </Route>

          <Route
            path="subject"
            element={
              <Suspense fallback={<Loader />}>
                <Subject_Grade />
              </Suspense>
            }
          />

          {/* Student */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Student />
              </Suspense>
            }
            path="/student"
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <StudentHome />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <StudentAdd />
                </Suspense>
              }
              path="new"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <StudentEdit />
                </Suspense>
              }
              path="edit"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <StudentView />
                </Suspense>
              }
              path="view"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <StudentDetails />
                </Suspense>
              }
              path="profile/:id/:type/:studentId"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <StudentAcademicsReport />
                </Suspense>
              }
              path="exam/:examsId"
            />
          </Route>

          {/* Teacher */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Teacher />
              </Suspense>
            }
            path="/teacher"
          >
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <TeacherHome />
                </Suspense>
              }
              index
            />

            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <TeacherView />
                </Suspense>
              }
              path=":id"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <TeacherEdit />
                </Suspense>
              }
              path=":id/edit"
            />
          </Route>

          {/* Fees */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Fees />
              </Suspense>
            }
            path="/fee"
          >
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeeHome />
                </Suspense>
              }
              index
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeeNew />
                </Suspense>
              }
              path="new"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeeMakePayment />
                </Suspense>
              }
              path="payment"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <LevelFeeInformation />
                </Suspense>
              }
              path="level"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeeHistory />
                </Suspense>
              }
              path="history"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeeSettings />
                </Suspense>
              }
              path="settings"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <FeePrint />
                </Suspense>
              }
              path="print"
            />
          </Route>
          {/* Course */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Course />
              </Suspense>
            }
            path="/course"
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <CourseHome />
                </Suspense>
              }
            />
            <Route
              path="assign"
              element={
                <Suspense fallback={<Loader />}>
                  <AssignedCourses />
                </Suspense>
              }
            />
            <Route
              path="assign/students"
              element={
                <Suspense fallback={<Loader />}>
                  <AssignedCoursesResults />
                </Suspense>
              }
            />
            <Route
              path="level"
              element={
                <Suspense fallback={<Loader />}>
                  <CourseLevel />
                </Suspense>
              }
            />
            <Route
              path="level/:levelId/:level"
              element={
                <Suspense fallback={<Loader />}>
                  <ExamsLevel type="course" />
                </Suspense>
              }
            />

            <Route
              path="reports/:levelId"
              element={
                <Suspense fallback={<Loader />}>
                  <ViewExamsReports />
                </Suspense>
              }
            />
            <Route
              path="attendance/:id/:type"
              element={
                <Suspense fallback={<Loader />}>
                  <NewAttendance to="/course" />
                </Suspense>
              }
            />
          </Route>

          {/* Examination */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Examination />
              </Suspense>
            }
            path="/examination"
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <ExamsHome />
                </Suspense>
              }
            />

            <Route
              path="level/:levelId/:level"
              element={<ExamsLevel type="examination" />}
            />
            <Route
              path="reports/:levelId"
              element={
                <Suspense fallback={<Loader />}>
                  <ViewExamsReports />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <LevelExamScoreInput />
              </Suspense>
            }
            path="/result"
          />

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <SMS />
              </Suspense>
            }
            path="/sms"
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <SMSHome />
                </Suspense>
              }
            />
            <Route
              path="new"
              element={
                <Suspense fallback={<Loader />}>
                  <SMSNew />
                </Suspense>
              }
            />
          </Route>

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
            path="/profile"
          />

          {/* Teacher */}
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Event />
              </Suspense>
            }
            path="/events"
          >
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <EventHome />
                </Suspense>
              }
              index
            />

            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <NewEvent />
                </Suspense>
              }
              path="new"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <ViewEvent />
                </Suspense>
              }
              path=":id"
            />
            <Route
              element={
                <Suspense fallback={<Loader />}>
                  <EditEvent />
                </Suspense>
              }
              path=":id/edit"
            />
          </Route>
          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Notifications />
              </Suspense>
            }
            path="/notifications"
          />

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
            path="/settings"
          />

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <UserHome />
              </Suspense>
            }
            path="/users"
          ></Route>

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <About />
              </Suspense>
            }
            path="/about"
          />
        </Route>

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <SchoolSession />
            </Suspense>
          }
          path="/school-session"
        />
        <Route element={<Login />} path="/login" />

        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </>
  );
};

export default Root;
