import { useContext } from "react";

import { UserContext } from "@/context/providers/UserProvider";

export const useAuth = () => useContext(UserContext);
