import { useState, useEffect } from "react";
import axios from "axios";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  // Get all URLs from backend
  const getAllUrls = async () => {
    try {
      const response = await axios.get("/api/urls");

      // Backend se directly array aa rahi hai
      setLinks(response.data.data);
    } catch (error) {
      console.error("Get URLs failed:", error);
    }
  };

  // Page load hone par URLs fetch karo
  useEffect(() => {
    getAllUrls();
  }, []);

  // Create short URL
  const createShortUrl = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    try {
      await axios.post("/api/urls", {
        url: url,
      });

      setUrl("");

      // New URL ke baad fresh data fetch karo
      await getAllUrls();
    } catch (error) {
      console.error("Create URL failed:", error);
    }
  };

  // Copy short URL
  const handleCopy = async (shortUrl) => {
    try {
      const fullUrl = `http://localhost:3000/${shortUrl}`;

      await navigator.clipboard.writeText(fullUrl);

      alert("Link copied!");
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // Delete URL
  const handleDelete = async (id) => {

    try {
      await axios.delete(`/api/urls/${id}`);

      // Delete ke baad database se fresh list lao
      await getAllUrls();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Long links? Chhota kar do.
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            Paste a link, get a short one, see how many people clicked it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createShortUrl} className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="h-14 flex-1 rounded-xl border-2 border-orange-200 bg-white px-5 text-lg text-gray-800 outline-none transition focus:border-orange-400"
            />

            <button
              type="submit"
              className="h-14 rounded-xl bg-orange-600 px-8 text-lg font-semibold text-white transition hover:bg-orange-700 active:scale-95"
            >
              Shorten
            </button>
          </div>
        </form>

        {/* Latest Short URL */}
        {links.length > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <a
              href={`http://localhost:3000/${links[0].shortUrl}`}
              target="_blank"
              rel="noreferrer"
              className="truncate text-lg font-semibold text-orange-600"
            >
              http://localhost:3000/{links[0].shortUrl}
            </a>

            <button
              onClick={() => handleCopy(links[0].shortUrl)}
              className="ml-4 shrink-0 rounded-lg bg-orange-600 px-6 py-2.5 font-semibold text-white hover:bg-orange-700"
            >
              Copy
            </button>
          </div>
        )}

        {/* Your Links */}
        <div className="mt-8">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Your links ({links.length})
          </h2>

          <div className="space-y-4">
            {links.map((link) => {

              return (
                <div
                  key={link._id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  {/* URL information */}
                  <div className="min-w-0 flex-1">
                    <a
                      href={`http://localhost:3000/${link.shortUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-orange-600"
                    >
                      http://localhost:3000/{link.shortUrl}
                    </a>

                    <p
                      className="max-w-[600px] truncate text-gray-600"
                      title={link.originalUrl}
                    >
                      {link.originalUrl}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="ml-5 flex items-center gap-3">
                    <span className="text-gray-600">
                      {link.clicks} clicks
                    </span>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(link.shortUrl)}
                      className="rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                    >
                      Copy
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(link._id)}
                      className="rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UrlShortener;