import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, TrendingUp, Minus, AlertTriangle, RefreshCw, Star, ExternalLink } from 'lucide-react';

// Mock data for immediate demo
const MOCK_APPS = [
  {
    id: '1',
    name: 'Reddit',
    icon: '🟠',
    category: 'social',
    developer: 'Reddit Inc.',
    currentScore: 45,
    trend: 'declining',
    complaintsCount: 156,
    lastUpdated: new Date(),
    recentComplaints: [
      {
        id: '1',
        title: 'App keeps crashing after update',
        content: 'The Reddit app has been crashing constantly since the latest update. Very frustrating experience.',
        author: 'user_frustrated',
        platform: 'reddit',
        sentiment: -0.8,
        publishedAt: new Date('2024-01-15T10:00:00Z'),
        upvotes: 45
      },
      {
        id: '2',
        title: 'Video player not working',
        content: 'Videos won\'t play properly in the app. Always buffering.',
        author: 'video_watcher',
        platform: 'reddit',
        sentiment: -0.6,
        publishedAt: new Date('2024-01-15T09:30:00Z'),
        upvotes: 23
      }
    ]
  },
  {
    id: '2',
    name: 'TikTok',
    icon: '🎵',
    category: 'entertainment',
    developer: 'TikTok Pte. Ltd.',
    currentScore: 72,
    trend: 'stable',
    complaintsCount: 89,
    lastUpdated: new Date(),
    recentComplaints: [
      {
        id: '3',
        title: 'Audio sync issues',
        content: 'Audio is out of sync with video on many posts.',
        author: 'tiktok_user',
        platform: 'app_store',
        sentiment: -0.4,
        publishedAt: new Date('2024-01-15T11:00:00Z'),
        rating: 2
      }
    ]
  },
  {
    id: '3',
    name: 'Instagram',
    icon: '📸',
    category: 'social',
    developer: 'Meta Platforms, Inc.',
    currentScore: 68,
    trend: 'improving',
    complaintsCount: 42,
    lastUpdated: new Date(),
    recentComplaints: [
      {
        id: '4',
        title: 'Stories not loading',
        content: 'Instagram stories take forever to load or don\'t load at all.',
        author: 'insta_fan',
        platform: 'twitter',
        sentiment: -0.5,
        publishedAt: new Date('2024-01-15T08:45:00Z'),
        upvotes: 12
      }
    ]
  },
  {
    id: '4',
    name: 'Character.AI',
    icon: '🤖',
    category: 'entertainment',
    developer: 'Character Technologies Inc.',
    currentScore: 38,
    trend: 'declining',
    complaintsCount: 203,
    lastUpdated: new Date(),
    recentComplaints: [
      {
        id: '5',
        title: 'Slow response times',
        content: 'Characters are taking way too long to respond. The service has become unusable.',
        author: 'ai_enthusiast',
        platform: 'reddit',
        sentiment: -0.9,
        publishedAt: new Date('2024-01-15T12:00:00Z'),
        upvotes: 87
      }
    ]
  }
];

const HEALTH_HISTORY = [
  { date: '2024-01-09', score: 52 },
  { date: '2024-01-10', score: 49 },
  { date: '2024-01-11', score: 46 },
  { date: '2024-01-12', score: 44 },
  { date: '2024-01-13', score: 42 },
  { date: '2024-01-14', score: 40 },
  { date: '2024-01-15', score: 45 }
];

export default function AppPulseDemo() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [apps, setApps] = useState(MOCK_APPS);
  const [loading, setLoading] = useState(false);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const getSentimentLabel = (sentiment) => {
    if (sentiment > 0.3) return 'Positive';
    if (sentiment > -0.3) return 'Neutral';
    return 'Negative';
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.3) return 'text-green-600 bg-green-50';
    if (sentiment > -0.3) return 'text-gray-600 bg-gray-50';
    return 'text-red-600 bg-red-50';
  };

  const simulateDataUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate small score changes
      const updatedApps = apps.map(app => ({
        ...app,
        currentScore: Math.max(0, Math.min(100, app.currentScore + (Math.random() - 0.5) * 10)),
        lastUpdated: new Date()
      }));
      setApps(updatedApps);
      setLoading(false);
    }, 2000);
  };

  const stats = {
    totalApps: apps.length,
    declining: apps.filter(app => app.trend === 'declining').length,
    criticalIssues: apps.filter(app => app.currentScore < 40).length,
    avgScore: Math.round(apps.reduce((sum, app) => sum + app.currentScore, 0) / apps.length)
  };

  if (selectedApp) {
    const app = apps.find(a => a.id === selectedApp);
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <span>←</span>
                <span>Back to Dashboard</span>
              </button>
              <span className="text-4xl">{app.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                <p className="text-gray-600">by {app.developer}</p>
              </div>
            </div>
            <button
              onClick={simulateDataUpdate}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Updating...' : 'Update Data'}</span>
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Health Score</h3>
              <div className="flex items-center space-x-3">
                <span className={`text-3xl font-bold px-4 py-2 rounded-full ${getHealthColor(app.currentScore)}`}>
                  {app.currentScore}
                </span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(app.trend)}
                  <span className="font-medium capitalize">{app.trend}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total mentions:</span>
                  <span className="font-medium">{app.complaintsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Negative feedback:</span>
                  <span className="font-medium text-red-600">
                    {app.recentComplaints.filter(c => c.sentiment < -0.1).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend (7 days)</h3>
              <div className="flex items-center justify-center h-16">
                <svg width="120" height="60" className="text-blue-600">
                  {HEALTH_HISTORY.map((point, index) => {
                    if (index === 0) return null;
                    const prevPoint = HEALTH_HISTORY[index - 1];
                    return (
                      <line
                        key={index}
                        x1={((index - 1) / (HEALTH_HISTORY.length - 1)) * 120}
                        y1={60 - (prevPoint.score / 100) * 60}
                        x2={(index / (HEALTH_HISTORY.length - 1)) * 120}
                        y2={60 - (point.score / 100) * 60}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent User Feedback</h2>
            {app.recentComplaints.length > 0 ? (
              <div className="space-y-4">
                {app.recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {complaint.platform === 'reddit' ? '🟠' : 
                           complaint.platform === 'twitter' ? '🐦' : '📱'}
                        </span>
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {complaint.platform.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(complaint.sentiment)}`}>
                          {getSentimentLabel(complaint.sentiment)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(complaint.publishedAt)}</span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{complaint.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{complaint.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>by {complaint.author}</span>
                        {complaint.upvotes && (
                          <div className="flex items-center space-x-1">
                            <span>↑</span>
                            <span>{complaint.upvotes}</span>
                          </div>
                        )}
                        {complaint.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span>{complaint.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent feedback available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AppPulse</h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                DEMO
              </span>
            </div>
            <button
              onClick={simulateDataUpdate}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Updating...' : 'Refresh Data'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Apps</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Declining</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.declining}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.criticalIssues}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">⚡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Health</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.avgScore}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Monitored Apps ({apps.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{app.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{app.name}</h3>
                    <p className="text-sm text-gray-600">Updated {formatDate(app.lastUpdated)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTrendIcon(app.trend)}
                  {app.complaintsCount > 20 && (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Health Score</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getHealthColor(app.currentScore)}`}>
                    {app.currentScore}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      app.currentScore >= 80 ? 'bg-green-500' :
                      app.currentScore >= 60 ? 'bg-yellow-500' :
                      app.currentScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${app.currentScore}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{app.complaintsCount} recent mentions</span>
                  <span className="capitalize">{app.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-blue-600 mr-3">ℹ️</div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Demo Mode</h3>
              <p className="text-sm text-blue-700 mt-1">
                This is a demonstration of AppPulse with mock data. In production, this would show real-time data from Reddit, Twitter, and app stores.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
