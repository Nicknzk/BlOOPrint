import { useState } from "react";
import Papa from "papaparse";

export default function ReactCSVUploader() {
  const [data, setData] = useState<String[]>([]);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data as String[]);
      },
    });
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {console.log(data.length ? data : null)}
    </>
  );
}
//<div>{data.length ? data : null}</div>
/*
{data.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>dependencies</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.dependencies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
*/
