import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard.api";
import UrlCard from "../components/UrlCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboard()
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-600 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!data)
    return (
      <p className="text-center text-slate-600 py-12">
        Failed to load dashboard data.
      </p>
    );

  // Calculate stats
  const totalUrls = data.urls?.length || 0;
  const activeUrls =
    data.urls?.filter((url) => new Date(url.expiresAt) > new Date()).length ||
    0;
  const totalClicks = data.totalClicks || 0;
  const avgClicksPerUrl =
    totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600">
          Track and manage all your shortened links
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
        {/* Total Clicks */}
        <div className="glass-card p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Total Clicks
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-semibold flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              Active
            </span>
            <span className="text-slate-500 ml-2">across all links</span>
          </div>
        </div>

        {/* Total URLs */}
        <div className="glass-card p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Total Links
              </p>
              <p className="text-3xl font-bold text-slate-800">{totalUrls}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-indigo-600 font-semibold">
              {activeUrls} active
            </span>
            <span className="text-slate-500 ml-2">
              • {totalUrls - activeUrls} expired
            </span>
          </div>
        </div>

        {/* Average Clicks */}
        <div className="glass-card p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Avg. Clicks/Link
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {avgClicksPerUrl}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-500">
            Performance metric
          </div>
        </div>

        {/* Quick Action */}
        <div
          className="glass-card p-6 card-hover cursor-pointer group"
          onClick={() => navigate("/create")}
        >
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-200 transform group-hover:scale-110 mb-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="font-semibold text-slate-800 mb-1">Create New Link</p>
            <p className="text-sm text-slate-600">Shorten a URL now</p>
          </div>
        </div>
      </div>

      {/* URLs List */}
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Links</h2>
          {totalUrls > 0 && (
            <span className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {totalUrls} {totalUrls === 1 ? "link" : "links"}
            </span>
          )}
        </div>

        {totalUrls === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
                <svg
                  className="w-16 h-16 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No links yet
              </h3>
              <p className="text-slate-600 mb-6">
                Start by creating your first shortened link
              </p>
              <button
                onClick={() => navigate("/create")}
                className="btn-primary"
              >
                Create Your First Link
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {data.urls.map((url, index) => (
              <div
                key={url._id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-scale-in"
              >
                <UrlCard url={url} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
