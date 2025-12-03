import { useUrls } from "../context/urlContext";
import { useEffect } from "react";
import Row from "./Row";

function Table() {
  const { allUrls, callGetAllUrlsApi, isLoading } = useUrls();

  useEffect(() => {
    callGetAllUrlsApi();
  }, []);

  if (!isLoading) {
    console.log("From Table.jsx")
    console.log(allUrls);
  }

  return (
    <div>
      <div className="grid grid-cols-3 justify-center items-center m-2 text-2xl font-bold">
        <div>Orginal Url</div>
        <div className="flex justify-center items-center">Short Url</div>
        <div className="flex justify-center  items-center gap-4">Edit/Delete</div>
      </div>
      <hr />
      {!isLoading &&
        allUrls.map(({ _id, url_name, short_url }) => (
          <Row key={_id} children={{ _id, url_name, short_url }}></Row>
          
        ))}
    </div>
  );
}

export default Table;
