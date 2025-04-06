import { currencyFormatter } from "@/config/currencyFormatter";
import { UserContext } from "@/context/providers/UserProvider";
import React, { use } from "react";
import { format } from "date-fns";

const FeeReportTemplate = ({ student, feeData = [] }) => {
  const { school_info } = use(UserContext);

  return (
    <div
      className="report-container report-card"
      style={{
        position: "relative",
        // maxWidth: "8.5in",
        height: "11.69in",
        background: ` linear-gradient(
          rgba(255, 255, 255, 0.96),
          rgba(255, 255, 255, 0.96)
        ),
        url("${school_info?.badge}")`,
      }}
    >
      <header>
        <div>
          <h2>Student Fee Report</h2>
          <p>{feeData?.academicYear}</p>
        </div>
        {school_info?.badge !== null && (
          <div className="logo">
            <img
              alt="school logo"
              loading="lazy"
              src={school_info?.badge}
              style={{
                width: 70,
                height: 70,
              }}
            />
          </div>
        )}
      </header>

      <section className="student-info">
        <h3>Student Information</h3>
        <p>
          <strong>Name:</strong> {student}
        </p>
        <p>
          <strong>Level:</strong> {feeData?.level}
        </p>
        <p>
          <strong>Term:</strong> {feeData?.term}
        </p>
      </section>

      <section className="fee-summary">
        <h3>Fee Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount Paid (GHS)</th>
              <th>Outstanding (GHS)</th>
              <th>Issuer</th>
            </tr>
          </thead>
          <tbody>
            {feeData?.payment.map((payment, index) => (
              <tr key={index}>
                <td>
                  {format(
                    new Date(payment?.date || payment?.createdAt),
                    "do MMM, yyyy"
                  )}
                </td>
                <td>{currencyFormatter(payment?.paid)}</td>
                <td>{currencyFormatter(payment?.outstanding)}</td>
                <td>{payment?.issuerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="totals">
        <p>
          <strong>Total Paid:</strong> GHS {feeData?.paid.toFixed(2)}
        </p>
        <p>
          <strong>Outstanding Balance:</strong> GHS{" "}
          {feeData.payment[feeData.payment?.length - 1]?.outstanding.toFixed(2)}
        </p>
      </section>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          className="report-logo"
          // src={"/images/logo.PNG"}
          src={school_info?.badge}
          alt="school logo"
          style={{
            opacity: 0.03,
            // width: "6in",
            // height: "5.5in",
          }}
        />
      </div>
    </div>
  );
};

export default FeeReportTemplate;
