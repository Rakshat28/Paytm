import React from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/atom";
import { Navigate } from "react-router-dom";

const PrivateRourte = ({ children }) => {
  const token = useRecoilValue(tokenAtom);

  if (token !== null) {
    return children;
  } else {
    return <Navigate to={"/signin"} />;
  }
};

export default PrivateRourte;