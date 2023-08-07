import { useRouteError } from "react-router-dom";

type ErrData = {
  data: string;
};

const Error = () => {
  const err = useRouteError() as ErrData;
  console.log(err);

  return <div className="">{err?.data}</div>;
};

export default Error;
