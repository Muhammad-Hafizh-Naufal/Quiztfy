import { useEffect, useState } from "react";
import api from "./api";

export default function useResource(path) {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setState({ data: null, error: "", loading: true });
    api
      .get(path)
      .then((data) => {
        if (active) setState({ data, error: "", loading: false });
      })
      .catch((error) => {
        if (active)
          setState({ data: null, error: error.message, loading: false });
      });
    return () => {
      active = false;
    };
  }, [path, revision]);
  return { ...state, retry: () => setRevision((value) => value + 1) };
}
