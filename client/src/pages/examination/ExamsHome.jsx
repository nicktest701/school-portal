import React from "react";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { EXAMS_COLUMNS } from "@/mockup/columns/sessionColumns";
import { useNavigate } from "react-router-dom";
import useLevel from "@/components/hooks/useLevel";
import exams_icon from "@/assets/images/header/exams_ico.svg";
import { EMPTY_IMAGES } from "@/config/images";
import CustomTitle from "@/components/custom/CustomTitle";

const ExamsHome = () => {
  const navigate = useNavigate();

  const { levelsOption, levelLoading } = useLevel();

  const handleRowClick = (levelId, type) => {
    navigate(`${levelId}?level=${type}`, {
      state: {
        level: type,
      },
    });
  };

  return (
    <>
      <CustomTitle
        title="Examination Portal"
        subtitle="Organize and oversee exams, schedule, and results to ensure a fair and efficient examination process."
        img={exams_icon}
        color="primary.main"
      />

      <CustomizedMaterialTable
        title="Current Levels"
        search
        icon={exams_icon}
        isPending={levelLoading}
        columns={EXAMS_COLUMNS}
        data={levelsOption !== undefined ? levelsOption : []}
        actions={[]}
        options={{
          selection: false,
        }}
        onRowClick={({ _id, type }) => handleRowClick(_id, type)}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage="😑 No Students recently added !!!!"
      />
    </>
  );
};

export default ExamsHome;
