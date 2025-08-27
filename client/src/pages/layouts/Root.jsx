import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import Loader from "../../config/Loader";
import Shell from "../Shell";
import Login from "../Login";
import PageNotFound from "../PageNotFound";
import MoreAnnouncements from "../announcement/MoreAnnouncements";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import EventSkeleton from "@/components/skeleton/EventSkeleton";
import ProtectedRoute from "./ProtectedRoute";
import AddSession from "../session/AddSession";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import Receipt from "../fees/Receipt";
import StudentFeesReport from "../student/StudentFeesReport";

//Session
const Sessions = lazy(() => import("../session/Sessions"));
const ViewSession = lazy(() => import("../session/ViewSession"));
const EditSessionForm = lazy(() =>
  import("../session/edit-form/EditSessionForm")
);

const LevelFeeInformation = lazy(() => import("../fees/LevelFeeInformation"));
const Subject_Grade = lazy(() => import("../subject"));
const NewAttendance = lazy(() => import("../level/NewAttendance"));

const NotesBoard = lazy(() => import("../notes"));
const Teacher = lazy(() => import("../teacher"));
const TeacherView = lazy(() => import("../teacher/TeacherView"));
const TeacherEdit = lazy(() => import("../teacher/TeacherEdit"));
const Profile = lazy(() => import("../profile"));

// Events 
import Event from "../events";
const MoreEvents = lazy(() => import("../events/MoreEvents"));
const EventHome = lazy(() => import("../events/EventHome"));
const NewEvent = lazy(() => import("../events/NewEvent"));
const ViewEvent = lazy(() => import("../events/ViewEvent"));
const EditEvent = lazy(() => import("../events/EditEvent"));
const TeacherAssignLevel = lazy(() => import("../teacher/TeacherAssignLevel"));
const TeacherAssignCourse = lazy(() =>
  import("../teacher/TeacherAssignCourse")
);
const AddCurrentSubjects = lazy(() =>
  import("../../components/modals/AddCurrentSubjects")
);
const FeePaymentHistory = lazy(() => import("../fees/FeePaymentHistory"));
const StudentFeesHistory = lazy(() => import("../fees/StudentFeesHistory"));
const ExamsScore = lazy(() => import("../examination/ExamsScore"));
const UserAdd = lazy(() => import("../user/UserAdd"));
const User = lazy(() => import("../user"));
const UserView = lazy(() => import("../user/UserView"));
const UserEdit = lazy(() => import("../user/UserEdit"));
const AttendanceHistory = lazy(() => import("../level/AttendanceHistory"));
const Uploads = lazy(() => import("../uploads"));

const FeeNew = lazy(() => import("../fees/FeeNew"));
const LevelExamScoreInput = lazy(() =>
  import("../examination/LevelExamScoreInput")
);
const UploadSingleSubject = lazy(() =>
  import("../examination/UploadSingleSubject")
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

const FeeHome = lazy(() => import("../fees/FeeHome"));
const FeeMakePayment = lazy(() => import("../fees/FeeMakePayment"));
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
  const { user } = useAuth();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  useEffect(() => {
    const handleOnline = () => {
      schoolSessionDispatch(alertSuccess("Connection Restored"));
    };

    const handleOffline = () => {
      schoolSessionDispatch(
        alertError("Internet Connection Lost! Try reconnecting.")
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [schoolSessionDispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Shell />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            }
          />

          {user?.role === "administrator" && (
            <>
              {/* session */}

              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <Session />
                  </Suspense>
                }
                path="/session"
              >
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <Sessions />
                    </Suspense>
                  }
                  index={true}
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <AddSession />
                    </Suspense>
                  }
                  path="new"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <ViewSession />
                    </Suspense>
                  }
                  path=":id"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <EditSessionForm />
                    </Suspense>
                  }
                  path=":id/edit"
                />
              </Route>

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
                  path=":id"
                />

                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <AddCurrentSubjects />
                    </Suspense>
                  }
                  path=":id/courses"
                />
                <Route
                  path=":id/attendance"
                  element={
                    <Suspense fallback={<Loader />}>
                      <NewAttendance to="/level/current" />
                    </Suspense>
                  }
                />
                <Route
                  path=":id/history"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AttendanceHistory section="level" />
                    </Suspense>
                  }
                />
              </Route>

              {/* subjects  */}
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
                  path="view/:studentId"
                  element={
                    <Suspense fallback={<Loader />}>
                      <StudentDetails />
                    </Suspense>
                  }
                />

                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <StudentFeesReport />
                    </Suspense>
                  }
                  path="view/:studentId/fees"
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
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <TeacherAssignLevel />
                    </Suspense>
                  }
                  path=":id/level"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <TeacherAssignCourse />
                    </Suspense>
                  }
                  path=":id/course"
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
                  path=":levelId"
                  element={<ExamsLevel type="examination" />}
                />

                <Route
                  path=":levelId/student"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ExamsScore />
                    </Suspense>
                  }
                />
                <Route
                  path=":levelId/reports"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ViewExamsReports />
                    </Suspense>
                  }
                />
                <Route
                  path=":levelId/upload"
                  element={
                    <Suspense fallback={<Loader />}>
                      <LevelExamScoreInput />
                    </Suspense>
                  }
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
                      <FeePaymentHistory />
                    </Suspense>
                  }
                  path="history"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <StudentFeesHistory />
                    </Suspense>
                  }
                  path="payment/:student"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <LevelFeeInformation />
                    </Suspense>
                  }
                  path="level"
                />
                <Route element={<Receipt />} path="receipt" />
              </Route>

              {/* messages */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <SMS />
                  </Suspense>
                }
                path="/messages"
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

              {/* uploads */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <Uploads />
                  </Suspense>
                }
                path="/uploads"
              />

              {/* settings */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <Settings />
                  </Suspense>
                }
                path="/settings"
              />

              {/* users */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <User />
                  </Suspense>
                }
                path="/users"
              >
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserHome />
                    </Suspense>
                  }
                  index
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserAdd />
                    </Suspense>
                  }
                  path="new"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserView />
                    </Suspense>
                  }
                  path=":id"
                />
                <Route
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserEdit />
                    </Suspense>
                  }
                  path=":id/edit"
                />
              </Route>
            </>
          )}

          {user?.role === "teacher" && (
            <>
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
                  path="assign/:levelId"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AssignedCoursesResults />
                    </Suspense>
                  }
                />

                <Route
                  path="assign/:levelId/upload"
                  element={
                    <Suspense fallback={<Loader />}>
                      <UploadSingleSubject />
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
                  path="level/:levelId"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ExamsLevel type="course/level" />
                    </Suspense>
                  }
                />

                <Route
                  path="level/:levelId/reports"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ViewExamsReports />
                    </Suspense>
                  }
                />

                <Route
                  path="level/:levelId/student"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ExamsScore />
                    </Suspense>
                  }
                />
                <Route
                  path="level/:levelId/upload"
                  element={
                    <Suspense fallback={<Loader />}>
                      <LevelExamScoreInput />
                    </Suspense>
                  }
                />

                <Route
                  path="level/:id/attendance"
                  element={
                    <Suspense fallback={<Loader />}>
                      <NewAttendance to="course/level" />
                    </Suspense>
                  }
                />
                <Route
                  path="level/:id/history"
                  element={
                    <Suspense fallback={<Loader />}>
                      <AttendanceHistory section="course/level" />
                    </Suspense>
                  }
                />
              </Route>
            </>
          )}

          {["administrator", "teacher"].includes(user?.role) && (
            <>
              {/* Announcements */}
              <Route
                path="/announcements"
                element={
                  <Suspense fallback={<EventSkeleton />}>
                    <MoreAnnouncements />
                  </Suspense>
                }
              />

              {/* profile */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                }
                path="/profile"
              />

              {/* Events */}

              {user?.role === "teacher" && (
                <>
                  <Route
                    element={
                      <Suspense fallback={<EventSkeleton />}>
                        <MoreEvents />
                      </Suspense>
                    }
                    path="/events"
                  />

                  <Route
                    element={
                      <Suspense fallback={<Loader />}>
                        <ViewEvent />
                      </Suspense>
                    }
                    path="/events/:id"
                  />
                </>
              )}

              {user?.role === "administrator" && (
                <Route element={<Event />} path="/events">
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
              )}

              {/* notes */}
              <Route
                element={
                  <Suspense fallback={<Loader />}>
                    <NotesBoard />
                  </Suspense>
                }
                path="/notes"
              />
            </>
          )}

          <Route
            element={
              <Suspense fallback={<Loader />}>
                <About />
              </Suspense>
            }
            path="/about"
          />
        </Route>
        {/* school sessions */}
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Shell />,
//     children: [],
//   },
// ]);
// return <RouterProvider router={router} />;

export default Root;
