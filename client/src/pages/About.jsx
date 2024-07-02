import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "90svh",

      }}
    >
      <Typography variant="h2">About Us</Typography>
      <Stack rowGap={2} paddingY={3}>
        <Typography variant="body2">
          Welcome to FrebbyTech School Manager, the all-in-one solution for
          managing student information and improving school operations. Our
          powerful software makes it easy for administrators and educators to
          handle everything from attendance tracking to grade reporting.
        </Typography>
        <Typography variant="body2">
          With FrebbyTech School Manager, you can quickly access and update
          student records, track attendance, and manage schedules. Our software
          also allows you to generate detailed reports and analytics to help you
          make informed decisions about student progress and school operations.
        </Typography>

        <Typography variant="body2">
          Another important aspect of FrebbyTech School Manager is its
          user-friendliness. We understand that educators and administrators
          have a lot on their plates, and we&rsquo; ve designed our software to
          be intuitive and easy to use. Our interface is straightforward and our
          workflows are streamlined, so you can spend less time navigating
          software and more time working with students.
        </Typography>
        <Typography variant="body2">
          Finally, FrebbyTech School Manager is designed to help schools become
          more efficient and effective. By automating many of the routine
          administrative tasks that can take up so much time, our software frees
          up educators and administrators to focus on what they do best -
          educating students and improving the quality of education.
        </Typography>
        <Typography variant="body2">
          We&rsquo; re confident that FrebbyTech School Manager is the right
          choice for your school. Try it out today and see how it can help you
          streamline your operations and improve student outcomes!
        </Typography>
      </Stack>
      {/* <div>
        <Typography textAlign="center" fontWeight="bold">
          All rights reserved | FrebbyTech Consults @ {new Date().getFullYear()}
        </Typography>
        <Typography textAlign="center" fontWeight="bold">
          +233543772591
        </Typography>
      </div> */}
    </Container>
  );
};

About.propTypes = {};

export default About;
