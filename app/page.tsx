"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);
      setLoading(false);
      setUrl("");
    } catch (error) {
      console.error(error);
      setResponse(null);
      setError(error as string);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-y-hidden">
      <div className="flex flex-col gap-4 h-3/4 w-10/12">
        <h1 className="text-3xl font-bold">Get JSON</h1>
        <div className="flex flex-col gap-8 border p-4 rounded-lg ">
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to fetch JSON"
              className="bg-slate-200 p-3 rounded-lg w-full outline-none"
            />
            <button
              onClick={fetchData}
              className="bg-blue-400 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 "
            >
              Query
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center">Loading...</div>
          ) : (
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2 w-1/2">
                <span>URL Response</span>
                <div className="bg-slate-200 p-2 rounded-lg w-full h-[50vh] overflow-y-auto">
                  {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 w-1/2">
                <span>Processed URL Response</span>
                <div className=" p-2 rounded-lg border  w-full h-[50vh] overflow-y-auto">
                  {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
