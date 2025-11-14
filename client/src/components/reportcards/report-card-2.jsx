/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UserContext } from "@/context/providers/UserProvider";
import React, { use } from "react";
import _ from "lodash";
import { SchoolRounded } from "@mui/icons-material";

const TerminalReport2 = ({ student, classScore, examsScore, ratings }) => {
  const { school_info, session } = use(UserContext);

  
  return (
    <div>
      <style>
        {`
        .report-container {
          position: relative;
          background-color: white;
          font-size: 12px !important;
         }
         
          .header {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
          }

          .logo-container {
            flex: 0 0 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .logo {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            overflow: hidden;
          }

          .school-logo {
            width: 80px;
            height: 80px;
          }

          .school-info {
            flex: 1;
            text-align: center;
            padding: 0 20px;
          }

          .school-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .school-details {
            font-size: 12px;
          }

          .report-title {
            font-size: 20px;
            margin-top: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          }

          .student-photo-container {
            flex: 0 0 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .student-photo {
            width: 80px;
            height: 80px;
            background-color: #ecf0f1;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            text-align: center;
            color: #2c3e50;
            overflow: hidden;
          }

          .student-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .student-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            padding: 5px;
            border-bottom: 1px solid #bdc3c7;
          }

          .info-item {
            display: flex;
            flex-direction: column;
          }

          .info-label {
            font-weight: bold;
            color: #7f8c8d;
            font-size: 12px;
            margin-bottom: 3px;
          }

          .info-value {
            font-weight: 600;
            color: #2c3e50;
          }

          .subject-table {
            width: 100%;
            border-collapse: collapse;
          }

          .subject-table th {
            background-color: #34495e;
            color: white;
            padding: 5px;
            text-align: left;
            font-weight: 600;
            font-size: 12px;
          }

          .subject-table td {
            padding: 1px 8px;
            border-bottom: 1px solid #ecf0f1;
          }

          .subject-table tr:hover {
            background-color: #e8f4fc;
          }

          .subject-category {
            background-color: #2c3e50 !important;
            color: white;
            font-weight: bold;
          }

          .remarks-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            padding: 5px;
            margin-top: 10px;
          }

          .remark-card {
            padding: 5px;
          }

          .remark-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 2px;
            font-size: 12px;
            border-bottom: 1px solid #ecf0f1;
            padding-bottom: 3px;
          }

          .remark-content {
            color: #555;
            font-style: italic;
            // text-transform: capitalize;
          }

          .grades-key {
            padding: 5px;
          }

          .grades-key h3 {
            margin-bottom: 8px;
            text-align: center;
          }

          .grades-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 5px;
          }

          .grade-item {
            display: flex;
            align-items: left;
          }

          .grade-box {
            width: 30px;
            height: 15px;
            // margin-right: 10px;
            border-radius: 3px;
            display: inline-block;
          }

          .grade-A1 .grade-box {
            background-color: #4caf50;
          }
          .grade-B2 .grade-box {
            background-color: #8bc34a;
          }
          .grade-B3 .grade-box {
            background-color: #cddc39;
          }
          .grade-C4 .grade-box {
            background-color: #ffeb3b;
          }
          .grade-C5 .grade-box {
            background-color: #ffc107;
          }
          .grade-C6 .grade-box {
            background-color: #ff9800;
          }
          .grade-D7 .grade-box {
            background-color: #ff5722;
          }
          .grade-E8 .grade-box {
            background-color: #f44336;
          }
          .grade-F9 .grade-box {
            background-color: #b71c1c;
          }

          .footer {
            text-align: center;
            padding: 5px;
          }

          .highlight {
            background-color: #fff9c4;
            padding: 2px 4px;
          }

          @media print {
            body {
              background-color: white;
              padding: 0;
            }
            .report-container {
              box-shadow: none;
              border-radius: 0;
            }
           
          }

          @media (max-width: 768px) {
            .logo-container,
            .student-photo-container {
              margin: 10px 0;
            }
            .subject-table {
              font-size: 12px;
            }
            .subject-table th,
            .subject-table td {
              padding: 5px 4px;
            }
          }
        `}
      </style>

      <>
        {/* Background Watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <img
            style={{
              opacity: 0.03,
              width: "6in",
              height: "5.5in",
              objectFit: "contain",
            }}
            alt="report-logo"
            src={school_info?.badge}
          />
        </div>

        <div className="header">
          {school_info?.badge ? (
            <div className="logo">
              <img
                alt="school logo"
                loading="lazy"
                src={school_info?.badge}
                style={{ objectFit: "contain" }}
                className="school-logo"
              />
            </div>
          ) : (
            <SchoolRounded sx={{ width: 50, height: 50 }} />
          )}

          <div className="school-info">
            <div className="school-name"> {_.upperCase(school_info?.name)}</div>
            <div className="school-details">
              {school_info?.address} | {school_info?.location} <br />
              {school_info?.email} | {school_info?.phonenumber} <br />
              {school_info?.motto}
            </div>
            <div className="report-title">TERMINAL REPORT</div>
          </div>

          <div className="student-photo-container">
            <div className="student-photo">
              <div>
                <img
                  width="60"
                  height="60"
                  alt="photo"
                  src={student?.profile}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="student-info">
          <div className="info-item">
            <span className="info-label">NAME</span>
            <span className="info-value">
              {student?.fullName} - {student?.indexnumber}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">CLASS</span>
            <span className="info-value">{student?.level}</span>
          </div>
          {/* <div className="info-item">
            <span className="info-label">HOUSE</span>
            <span className="info-value">Aggrey House</span>
          </div>
          <div className="info-item">
            <span className="info-label">PROGRAMME</span>
            <span className="info-value">SCIENCE</span>
          </div> */}
          <div className="info-item">
            <span className="info-label">ACADEMIC YEAR</span>
            <span className="info-value">{student?.academicYear}</span>
          </div>
          <div className="info-item">
            <span className="info-label">TERM</span>
            <span className="info-value">{student?.term}</span>
          </div>
          <div className="info-item">
            <span className="info-label">VACATION DATE</span>
            <span className="info-value">{student?.vacationDate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">NEXT TERM RE-OPENS</span>
            <span className="info-value">{student?.reOpeningDate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">ROLL NUMBER</span>
            <span className="info-value">{student?.rollNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">TOTAL MARKS</span>
            <span className="info-value">{student?.overallScore}</span>
          </div>
          <div className="info-item">
            <span className="info-label">POSITION</span>
            <span className="info-value">{student?.position}</span>
          </div>
        </div>

        <table className="subject-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class Score({classScore}%)</th>
              <th>Exam Score ({examsScore}%)</th>
              <th>Total Score 100%</th>
              <th>Class Average</th>
              <th>Position</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {student?.scores !== undefined ? (
              student?.scores.length !== 0 &&
              student?.scores.map((score, index) => (
                <tr key={index}>
                  <td
                    width="25%"
                    style={{
                      textAlign: "left",
                      paddingLeft: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {score.subject}
                  </td>
                  <td width="18%">{score.classScore}</td>
                  <td width="18%">{score.examsScore}</td>
                  <td
                    width="15%"
                    style={{ color: "#b72338", fontWeight: "bold" }}
                  >
                    {score.totalScore}
                  </td>
                  <td width="10%">{score.grade}</td>
                  <td width="10%">{score.grade}</td>
                  <td width="14%" style={{ color: "green" }}>
                    {score.remarks}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ padding: "3px 1px", fontSize: "20px" }}
                >
                  No Student Record Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />

        <div className="remarks-section">
          <div className="remark-card">
            <div className="remark-title">ATTENDANCE:</div>
            <div className="remark-content"></div>
          </div>
          <div className="remark-card">
            <div className="remark-title">CONDUCT & ATTITUDE</div>
            <div className="remark-content">{student?.comments?.conduct}</div>
          </div>
          <div className="remark-card">
            <div className="remark-title">INTEREST</div>
            <div className="remark-content">{student?.comments?.interest}</div>
          </div>
          <div className="remark-card">
            <div className="remark-title">FORM MASTER&apos;S REMARKS</div>
            <div className="remark-content">
              {student?.comments?.teachersComments}
            </div>
          </div>
          <div className="remark-card">
            <div className="remark-title">HEADMASTER/HEADMISTRESS</div>
            <div className="remark-content">
              {student?.comments?.headteachersComments}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "end",
            marginBottom: "4px",
          }}
        >
          {session?.headmaster?.signature && (
            <img
              src={session?.headmaster?.signature}
              alt="headmaster signature"
              style={{
                maxWidth: "100%",
                aspectRatio: "16/9",
                width: "100px",
                height: "60px",
                objectFit: "contain",
                transform: "scale(2)",
              }}
            />
          )}
          <span style={{ borderTop: "1px #333 dashed", fontSize: "13px" }}>
            {session?.headmaster?.name} (Headmaster)
          </span>
        </div>
        <hr />

        <div className="grades-key">
          <h3>KEY TO GRADES</h3>
          <div className="grades-grid">
            {ratings?.map((rating) => (
              <div
                key={rating.id}
                className={`grade-item grade-${rating.remarks}`}
              >
                {/* <span className="grade-box"></span> */}
                <span>
                  {rating.grade} {rating.lowestMark} - {rating.highestMark}{" "}
                  {rating.remarks}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          Powered by{" "}
          <a
            href="https://nanaakwasi.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "10px",
              fontStyle: "italic",
              textAlign: "right",
            }}
          >
            Frebby Tech Consult
          </a>{" "}
          (+233543772591). &copy; {new Date().getFullYear()} | All rights
          reserved.
        </div>
        <span
          style={{
            fontSize: "10px",
            fontStyle: "italic",
          }}
        >
          {student?._id}
        </span>
      </>
    </div>
  );
};

export default TerminalReport2;
