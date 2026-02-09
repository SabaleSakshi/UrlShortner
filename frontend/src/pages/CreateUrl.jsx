import { useState } from "react";
import { createUrl } from "../api/url.api";
import { useNavigate } from "react-router-dom";

export default function CreateUrl() {
  const [form, setForm] = useState({
    originalUrl: "",
    expiryDays: 7
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setLoading(true);

    try {
      const res = await createUrl(form);
      setSuccess(res.data.data);
      setForm({ originalUrl: "", expiryDays: 7 });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(success.shortUrl);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-block p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Create Short Link
        </h1>
        <p className="text-slate-600">Transform your long URLs into short, shareable links</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="glass-card p-6 mb-8 animate-scale-in bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Link Created Successfully!</h3>
              <p className="text-sm text-green-700 mb-3">Your shortened URL is ready to use</p>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-200">
                <a 
                  href={success.shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-indigo-600 font-semibold hover:text-indigo-700 break-all"
                >
                  {success.shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-green-600 mt-3">Redirecting to dashboard in 3 seconds...</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={submit} className="glass-card p-8 animate-slide-up">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 animate-scale-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter Your Long URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="url"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                className="input-field pl-12"
                value={form.originalUrl}
                onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
                required
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">Paste any URL you want to shorten</p>
          </div>

          {/* Expiry Days */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Link Expiration
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[7, 14, 30, 90].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setForm({ ...form, expiryDays: days })}
                  className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                    form.expiryDays === days
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  <div className="text-lg font-bold">{days}</div>
                  <div className="text-xs">{days === 1 ? "day" : "days"}</div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Select when this link should expire</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary w-full text-lg py-4"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your link...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Shorten URL
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 glass-card hover:shadow-xl transition-all duration-300">
          <div className="inline-block p-3 bg-blue-100 rounded-xl mb-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Secure & Reliable</h3>
          <p className="text-sm text-slate-600">Your links are safe and always accessible</p>
        </div>

        <div className="text-center p-6 glass-card hover:shadow-xl transition-all duration-300">
          <div className="inline-block p-3 bg-purple-100 rounded-xl mb-3">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Detailed Analytics</h3>
          <p className="text-sm text-slate-600">Track clicks and analyze your audience</p>
        </div>

        <div className="text-center p-6 glass-card hover:shadow-xl transition-all duration-300">
          <div className="inline-block p-3 bg-green-100 rounded-xl mb-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Lightning Fast</h3>
          <p className="text-sm text-slate-600">Create and share links in seconds</p>
        </div>
      </div>
    </div>
  );
}
