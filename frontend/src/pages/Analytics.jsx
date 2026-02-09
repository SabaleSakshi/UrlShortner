import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalyticsOverview, getUrlAnalytics } from "../api/analytics.api";
import ChartCard from "../components/ChartCard";
import Navbar from "../components/Navbar";

export default function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({ scope: "all", shortUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      getUrlAnalytics(id)
        .then((res) => {
          setData(res.data.analytics);
          setMeta({ scope: "url", shortUrl: res.data.shortUrl || "" });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
      return;
    }

    getAnalyticsOverview()
      .then((res) => {
        setData(res.data.data);
        setMeta({ scope: "all", shortUrl: "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 font-medium">
              Loading analytics...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-card p-12 text-center">
            <svg
              className="w-16 h-16 text-slate-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Unable to load analytics
            </h3>
            <p className="text-slate-600 mb-6">
              The analytics data could not be loaded
            </p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  const totalClicks =
    data.totalClicks ??
    (data.clicksByDate?.reduce((sum, d) => sum + d.count, 0) || 0);

  const summaryCards = [
    {
      key: "totalClicks",
      label: "Total Clicks",
      value: totalClicks,
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
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
      ),
      accent: "bg-blue-100",
    },
  ];

  if (data.deviceStats) {
    summaryCards.push({
      key: "devices",
      label: "Devices",
      value: data.deviceStats.length || 0,
      icon: (
        <svg
          className="w-5 h-5 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      accent: "bg-purple-100",
    });
  }

  if (data.browserStats) {
    summaryCards.push({
      key: "browsers",
      label: "Browsers",
      value: data.browserStats.length || 0,
      icon: (
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      accent: "bg-green-100",
    });
  }

  if (data.osStats) {
    summaryCards.push({
      key: "os",
      label: "Operating Systems",
      value: data.osStats.length || 0,
      icon: (
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      accent: "bg-indigo-100",
    });
  }

  if (data.geoStats) {
    summaryCards.push({
      key: "countries",
      label: "Countries",
      value: data.geoStats.length || 0,
      icon: (
        <svg
          className="w-5 h-5 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.2-4-10s1.5-7.3 4-10z"
          />
        </svg>
      ),
      accent: "bg-amber-100",
    });
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-slate-600 hover:text-indigo-600 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {meta.scope === "url" ? "Link Analytics" : "All Links Analytics"}
          </h1>
          <p className="text-slate-600">
            {meta.scope === "url"
              ? "Detailed insights and performance metrics"
              : "Global performance across all your links"}
          </p>
          {meta.shortUrl && (
            <p className="text-sm text-indigo-600 mt-2">{meta.shortUrl}</p>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          {summaryCards.map((card) => (
            <div className="glass-card p-6" key={card.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">
                  {card.label}
                </span>
                <div className={`p-2 rounded-lg ${card.accent}`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {data.clicksByDate && data.clicksByDate.length > 0 && (
            <ChartCard
              title="Clicks Per Day"
              labels={data.clicksByDate.map((d) => d._id)}
              data={data.clicksByDate.map((d) => d.count)}
              type="bar"
            />
          )}

          {data.deviceStats && data.deviceStats.length > 0 && (
            <ChartCard
              title="Device Distribution"
              labels={data.deviceStats.map((d) => d._id || "Unknown")}
              data={data.deviceStats.map((d) => d.count)}
              type="doughnut"
            />
          )}

          {data.browserStats && data.browserStats.length > 0 && (
            <ChartCard
              title="Browser Distribution"
              labels={data.browserStats.map((d) => d._id || "Unknown")}
              data={data.browserStats.map((d) => d.count)}
              type="doughnut"
            />
          )}

          {data.osStats && data.osStats.length > 0 && (
            <ChartCard
              title="OS Distribution"
              labels={data.osStats.map((d) => d._id || "Unknown")}
              data={data.osStats.map((d) => d.count)}
              type="doughnut"
            />
          )}

          {data.geoStats && data.geoStats.length > 0 && (
            <ChartCard
              title="Country Distribution"
              labels={data.geoStats.map((d) => d._id || "Unknown")}
              data={data.geoStats.map((d) => d.count)}
              type="doughnut"
            />
          )}
        </div>

        {/* No Data Message */}
        {(!data.clicksByDate || data.clicksByDate.length === 0) && (
          <div className="glass-card p-12 text-center mt-8">
            <svg
              className="w-16 h-16 text-slate-400 mx-auto mb-4"
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
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No analytics data yet
            </h3>
            <p className="text-slate-600">
              Share your link to start collecting data
            </p>
          </div>
        )}
      </div>
    </>
  );
}
