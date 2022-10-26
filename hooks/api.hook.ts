import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useApiHook<R>(props?: string): {
  data?: R;
  hasError: boolean;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  loading: boolean;
} {
  const [value, setValue] = useState<string | undefined>();
  const [data, setData] = useState<R>();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  useEffect(() => {
    setHasError(false);
    setData(undefined);

    if (value) {
      setLoading(true);
      axios
        .patch<R>(`/api/crawler/meta?u=${value}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((res) => setHasError(true))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value]);

  return { data, hasError, setValue, loading };
}
