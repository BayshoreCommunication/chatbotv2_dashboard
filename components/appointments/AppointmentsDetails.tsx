"use client";

import { useEffect, useState } from "react";
import {
  BiSave,
  BiCalendar,
  BiTime,
  BiUser,
  BiCog,
  BiLinkExternal,
  BiEdit,
  BiLoaderAlt,
  BiTrash,
  BiX,
} from "react-icons/bi";
import {
  connectCalendlyToken,
  deleteCalendlyToken,
  getCalendlySnapshot,
  updateCalendlyEventType,
  testCalendlyConnection,
  type CalendlySettings,
  type CalendlyEvent,
  type CalendlySlot,
  type CalendlyStats,
  type CalendlySnapshot,
} from "@/app/actions/appointments";

const EMPTY_STATS: CalendlyStats = {
  total_events: 0,
  active_events: 0,
  upcoming_bookings: 0,
};

const EMPTY_SETTINGS: CalendlySettings = {
  calendly_url: "",
  calendly_access_token: "",
  event_type_uri: "",
  auto_embed: true,
};

const AppointmentsDetails = () => {
  const [settings, setSettings] = useState<CalendlySettings>(EMPTY_SETTINGS);
  const [savedSettings, setSavedSettings] = useState<CalendlySettings>(EMPTY_SETTINGS);
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [stats, setStats] = useState<CalendlyStats>(EMPTY_STATS);
  const [availableSlots, setAvailableSlots] = useState<CalendlySlot[]>([]);

  const [settingsLoading, setSettingsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isEditingToken, setIsEditingToken] = useState(false);
  const [isTestingToken, setIsTestingToken] = useState(false);
  const [isSavingToken, setIsSavingToken] = useState(false);
  const [isDeletingToken, setIsDeletingToken] = useState(false);
  const [isSavingEventType, setIsSavingEventType] = useState(false);
  const [hasSavedToken, setHasSavedToken] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const hasInputToken = settings.calendly_access_token.trim().length > 0;
  const tokenLocked = hasSavedToken && isConnected && !isEditingToken;

  const applySnapshot = (snapshot: CalendlySnapshot) => {
    const tokenConfigured = !!snapshot.token_configured;
    const normalizedSettings = {
      ...snapshot.settings,
      calendly_access_token: tokenConfigured
        ? snapshot.settings.calendly_access_token
        : "",
    };

    setHasSavedToken(tokenConfigured);
    setSettings(normalizedSettings);
    setSavedSettings(normalizedSettings);
    setEvents(snapshot.events || []);
    setStats(snapshot.stats || EMPTY_STATS);
    setAvailableSlots(snapshot.slots || []);
    setIsConnected(!!snapshot.connected);
    if (snapshot.error) {
      setMessage({ type: "error", text: snapshot.error });
    }
  };

  useEffect(() => {
    const init = async () => {
      setSettingsLoading(true);
      try {
        const snapshotResult = await getCalendlySnapshot();
        if (!snapshotResult.ok || !snapshotResult.snapshot) {
          setMessage({
            type: "error",
            text: snapshotResult.error || "Failed to load Calendly integration",
          });
          return;
        }

        applySnapshot(snapshotResult.snapshot);

        if (snapshotResult.snapshot.token_configured && !snapshotResult.snapshot.connected) {
          setIsEditingToken(true);
        }
      } catch {
        setMessage({ type: "error", text: "Error loading Calendly integration" });
      } finally {
        setSettingsLoading(false);
      }
    };

    init();
  }, []);

  const handleTestToken = async () => {
    if (!settings.calendly_access_token.trim()) {
      setMessage({ type: "error", text: "Please enter your Calendly access token" });
      return;
    }

    setIsTestingToken(true);
    setMessage(null);

    try {
      const result = await testCalendlyConnection(settings.calendly_access_token);
      if (!result.ok || !result.valid) {
        setMessage({ type: "error", text: result.error || "Invalid Calendly access token" });
        return;
      }
      setMessage({ type: "success", text: "Token is valid." });
    } catch {
      setMessage({ type: "error", text: "Failed to test Calendly token" });
    } finally {
      setIsTestingToken(false);
    }
  };

  const handleSaveToken = async () => {
    if (!settings.calendly_access_token.trim()) {
      setMessage({ type: "error", text: "Please enter your Calendly access token" });
      return;
    }

    setIsSavingToken(true);
    setMessage(null);

    try {
      const result = await connectCalendlyToken(settings.calendly_access_token);
      if (!result.ok || !result.snapshot) {
        setMessage({ type: "error", text: result.error || "Failed to connect token" });
        return;
      }

      applySnapshot(result.snapshot);
      setIsEditingToken(false);
      setMessage({ type: "success", text: "Calendly token saved and connected successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save Calendly token" });
    } finally {
      setIsSavingToken(false);
    }
  };

  const handleDeleteToken = async () => {
    setIsDeletingToken(true);
    setMessage(null);

    try {
      const result = await deleteCalendlyToken();
      if (!result.ok || !result.snapshot) {
        setMessage({ type: "error", text: result.error || "Failed to delete token" });
        return;
      }

      applySnapshot(result.snapshot);
      setIsEditingToken(false);
      setMessage({ type: "success", text: "Calendly token removed successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to delete Calendly token" });
    } finally {
      setIsDeletingToken(false);
    }
  };

  const handleCancelTokenEdit = () => {
    setSettings(savedSettings);
    setIsEditingToken(false);
    setMessage(null);
  };

  const handleEventTypeChange = async (eventTypeUri: string) => {
    setIsSavingEventType(true);
    setMessage(null);

    try {
      const result = await updateCalendlyEventType(eventTypeUri);
      if (!result.ok || !result.snapshot) {
        setMessage({ type: "error", text: result.error || "Failed to save event type" });
        return;
      }

      applySnapshot(result.snapshot);
      setMessage({
        type: "success",
        text: eventTypeUri ? "Event type saved." : "Event type cleared.",
      });
    } catch {
      setMessage({ type: "error", text: "Failed to update event type" });
    } finally {
      setIsSavingEventType(false);
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const SettingsCardSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-10 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex gap-2">
        <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="h-4 w-56 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="space-y-3 pt-2">
        <div className="h-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-20 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );

  const SlotsSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
      <div className="h-6 w-44 rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
      <div className="h-4 w-72 rounded bg-gray-200 dark:bg-gray-700 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded bg-gray-200 dark:bg-gray-700"></div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Calendly Integration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Connect your Calendly account to enable AI-powered appointment booking.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BiCog className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Setup Instructions</h2>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Go to your
            <a
              href="https://calendly.com/integrations/api_webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
            >
              Calendly API and Webhooks page
            </a>
          </li>
          <li>Click Create token under Personal Access Tokens</li>
          <li>Copy the generated token and paste it below</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Calendly Configuration</h2>

          {settingsLoading ? (
            <SettingsCardSkeleton />
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="access-token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Calendly Access Token *
                </label>
                <input
                  id="access-token"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your Calendly Personal Access Token"
                  value={settings.calendly_access_token}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      calendly_access_token: e.target.value,
                    })
                  }
                  disabled={tokenLocked || settingsLoading || isSavingToken || isDeletingToken}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                />
                {isConnected && (
                  <p className="text-xs text-green-600 dark:text-green-400">Connected and verified</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {(isEditingToken || !hasSavedToken) && (
                  <>
                    <button
                      onClick={handleTestToken}
                      disabled={isTestingToken || !hasInputToken}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isTestingToken ? <BiLoaderAlt className="h-4 w-4 animate-spin" /> : null}
                      <span>{isTestingToken ? "Testing..." : "Test Token"}</span>
                    </button>
                    <button
                      onClick={handleSaveToken}
                      disabled={isSavingToken || !hasInputToken}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSavingToken ? <BiLoaderAlt className="h-4 w-4 animate-spin" /> : <BiSave className="h-4 w-4" />}
                      <span>{isSavingToken ? "Saving..." : hasSavedToken ? "Save Token" : "Add Token"}</span>
                    </button>
                  </>
                )}

                {!isEditingToken && hasSavedToken && (
                  <button
                    onClick={() => setIsEditingToken(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <BiEdit className="h-4 w-4" />
                    <span>Edit Token</span>
                  </button>
                )}

                {isEditingToken && hasSavedToken && (
                  <button
                    onClick={handleCancelTokenEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <BiX className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                )}

                {hasSavedToken && (
                  <button
                    onClick={handleDeleteToken}
                    disabled={isDeletingToken || isSavingToken}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isDeletingToken ? <BiLoaderAlt className="h-4 w-4 animate-spin" /> : <BiTrash className="h-4 w-4" />}
                    <span>{isDeletingToken ? "Deleting..." : "Delete Token"}</span>
                  </button>
                )}
              </div>

              {isConnected && (
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Event Type for AI Booking
                  </label>
                  <select
                    id="event-type"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={settings.event_type_uri}
                    onChange={(e) => handleEventTypeChange(e.target.value)}
                  >
                    <option value="">Select an event type...</option>
                    {events.map((event) => (
                      <option key={event.uri} value={event.uri}>
                        {event.name} ({event.duration} min)
                      </option>
                    ))}
                  </select>
                  {isSavingEventType && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <BiLoaderAlt className="h-3 w-3 animate-spin" /> Saving selection...
                    </p>
                  )}
                  {events.length === 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      No event types found in this Calendly account.
                    </p>
                  )}
                </div>
              )}

              {isConnected && events.length > 0 && (
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Your Event Types</h4>
                  {events.map((event) => (
                    <div
                      key={event.uri}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">{event.name}</h5>
                        {settings.event_type_uri === event.uri && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-700 rounded text-xs">
                            AI Enabled
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <BiTime className="w-3 h-3" />
                            <span>{event.duration} minutes</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400">
                            {event.status}
                          </span>
                        </div>
                        <a
                          href={event.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1"
                        >
                          <BiLinkExternal className="w-3 h-3" />
                          View Page
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Overview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Your Calendly integration status and key metrics
          </p>

          {settingsLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          ) : isConnected ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total_events}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active_events}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Events</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{availableSlots.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Available Slots</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Next 7 days</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {settings.event_type_uri ? "Configured" : "Pending"}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Integration</div>
                </div>
              </div>

              <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800 dark:text-green-400">Connected to Calendly</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-500">
                  Your AI assistant can now access your calendar and book appointments.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BiCalendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Connect Your Calendly Account</h3>
              <p className="text-sm mb-4">Add your access token above to get started.</p>
            </div>
          )}
        </div>
      </div>

      {settingsLoading ? (
        <SlotsSkeleton />
      ) : isConnected && availableSlots.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Next Available Slots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            These are the slots your AI assistant will offer to customers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableSlots.slice(0, 6).map((slot) => {
              const { date, time } = formatDateTime(slot.start_time);
              return (
                <div
                  key={slot.start_time}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{date}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{time}</div>
                  <a
                    href={slot.scheduling_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center gap-1"
                  >
                    <BiLinkExternal className="w-3 h-3" />
                    Booking URL
                  </a>
                </div>
              );
            })}
          </div>
          {availableSlots.length > 6 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              ... and {availableSlots.length - 6} more slots available
            </p>
          )}
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">How AI Booking Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <BiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">1. AI Fetches Availability</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your AI assistant checks Calendly for open appointment slots.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <BiUser className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">2. Customer Selects Time</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customers choose from available times directly in chat.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <BiLinkExternal className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">3. Direct Calendly Booking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI sends the booking link for the selected slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDetails;




