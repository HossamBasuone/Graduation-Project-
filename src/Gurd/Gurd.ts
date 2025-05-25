import  {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../lib/store";

export function IsAuthinticatedPartner() {
  const { token, role } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth
  );
  const [data, setData] = useState(false);

 useEffect(() => {
  if (token && role == "partner") {
    setData(true) ;
  } else {
    setData(false) ;
  }
 }, [token, role]);
 return data;
}

export function IsAuthinticatedUser() {
  const { token, role } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth
  );
  const [data, setData] = useState(false);
  useEffect(() => {
    if (token && role == "user") {
      setData(true) ;
    } else {
      setData(false) ;
    }
  }, [token, role]);
  return data;
}
