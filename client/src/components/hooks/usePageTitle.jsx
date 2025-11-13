import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";

export const usePageTitle = () => {
  const { pathname } = useLocation();
  const { school_info } = useAuth();

  const schoolName = school_info?.name || "School Portal";

  // Split pathname → get first segment
  // "/students/manage/profile" → "students"
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!firstSegment) return schoolName;

  // Format → "student-profile" → "Student Profile"
  const formatted = firstSegment
    .replace(/-/g, " ") // convert dashes to spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize

  return `${formatted || "App"} | ${schoolName}`;
};
