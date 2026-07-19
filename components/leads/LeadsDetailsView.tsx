"use client";

import {
  deleteLeadAction,
  getLeadsAction,
  setLeadContactedAction,
  Lead,
} from "@/app/actions/leads";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import {
  BiCalendarCheck,
  BiCalendarEvent,
  BiDownload,
  BiEnvelope,
  BiFile,
  BiGroup,
  BiRefresh,
  BiTrash,
  BiUser,
  BiX,
} from "react-icons/bi";

function truncateWords(text: string, limit = 8): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
}

function formatAppointment(iso: string | null): { label: string; isPast: boolean } | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return {
    label: date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    isPast: date.getTime() < Date.now(),
  };
}

function MessageCell({ message }: { message: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block max-w-xs truncate whitespace-nowrap overflow-hidden text-left text-sm text-gray-700 hover:text-gray-900 hover:underline"
      >
        {truncateWords(message)}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full min-w-80 max-w-md min-h-40 rounded-xl bg-white p-5 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-gray-900">Inquiry</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <BiX size={20} />
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm text-gray-700">{message}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

const LeadsDetailsView = () => {
  const searchParams = useSearchParams();
  const highlightedLeadId = searchParams.get("leadId");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to and briefly highlight a lead opened from the topbar search
  useEffect(() => {
    if (!highlightedLeadId || leads.length === 0) return;
    const row = document.getElementById(`lead-row-${highlightedLeadId}`);
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightedLeadId, leads]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLeadsAction();
      if (response.ok && response.data) {
        setLeads(response.data);
      } else {
        setError(response.error || "Failed to fetch leads");
        toast.error(response.error || "Failed to fetch leads");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await deleteLeadAction(id);
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        toast.success("Lead deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete lead");
      }
    } catch (err) {
      toast.error("Failed to delete lead");
    }
  };

  const handleSetContacted = async (lead: Lead, next: boolean) => {
    if (next === lead.is_contacted) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, is_contacted: next } : l)),
    );

    try {
      const res = await setLeadContactedAction(lead.id, next);
      if (res.ok) {
        toast.success(
          next ? "Marked as contacted" : "Marked as not contacted",
        );
      } else {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id ? { ...l, is_contacted: !next } : l,
          ),
        );
        toast.error(res.error || "Failed to update lead");
      }
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, is_contacted: !next } : l,
        ),
      );
      toast.error("Failed to update lead");
    }
  };

  // Calculate statistics
  const totalLeads = leads.length;
  const withEmail = leads.filter((lead) => !!lead.email).length;
  const withName = leads.filter((lead) => !!lead.name).length;
  const totalProfiles = leads.length;

  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      subtitle: "Complete contact information",
      icon: <BiUser size={20} />,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "With Email",
      value: withEmail,
      subtitle: "Email addresses collected",
      icon: <BiEnvelope size={20} />,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "With Name",
      value: withName,
      subtitle: "Names collected",
      icon: <BiGroup size={20} />,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Profiles",
      value: totalProfiles,
      subtitle: "All user profiles",
      icon: <BiFile size={20} />,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const handleDownloadCSV = () => {
    if (leads.length === 0) {
      toast.error("No leads to download");
      return;
    }

    // Define headers
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Message",
      "Session ID",
      "Date",
    ];

    // Create CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...leads.map((lead) =>
        [
          `"${lead.id}"`,
          `"${lead.name || ""}"`,
          `"${lead.email || ""}"`,
          `"${lead.phone || ""}"`,
          `"${(lead.message || "").replace(/"/g, '""')}"`,
          `"${lead.session_id}"`,
          `"${new Date(lead.created_at).toLocaleString()}"`,
        ].join(","),
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `leads_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV download started");
  };

  console.log("LeadsDetailsView rendered with leads:", leads);

  return (
    // @container: the stat grid below reacts to the actual space available
    // for this page's content, not the raw viewport — see DashboardDetailsView
    // for why viewport breakpoints (sm/lg) don't work here (the fixed nav
    // sidebar's expand/collapse toggle changes available space without
    // changing the viewport).
    <div className="@container">
      <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visitor Leads</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all visitor contact information collected by your
              chatbot
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <BiRefresh size={18} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleDownloadCSV}
              disabled={leads.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <BiDownload size={18} />
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-5 @7xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700">
                {stat.title}
              </h3>
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-900 @7xl:text-3xl">
              {loading ? (
                <span className="block h-8 w-16 bg-gray-100 animate-pulse rounded"></span>
              ) : (
                stat.value
              )}
            </p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Inquiry
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contacted
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-48 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-28 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-28 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-8 bg-gray-100 animate-pulse rounded ml-auto"></div>
                      </td>
                    </tr>
                  ))
                : leads.length > 0
                  ? leads.map((lead) => (
                      <tr
                        key={lead.id}
                        id={`lead-row-${lead.id}`}
                        className={`transition-colors ${
                          lead.id === highlightedLeadId
                            ? "bg-blue-50 hover:bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {lead.email || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              !lead.phone
                                ? "text-yellow-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {lead.phone || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {lead.message ? (
                            <MessageCell message={lead.message} />
                          ) : (
                            <span className="text-sm text-gray-700">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const appt = formatAppointment(lead.appointment_time);
                            if (!appt) {
                              return <span className="text-sm text-gray-700">N/A</span>;
                            }
                            return appt.isPast ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                <BiCalendarCheck size={14} />
                                Confirmed · {appt.label}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                <BiCalendarEvent size={14} />
                                {appt.label}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={lead.is_contacted ? "contacted" : "not_contacted"}
                            onChange={(e) =>
                              handleSetContacted(lead, e.target.value === "contacted")
                            }
                            className={`cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                              lead.is_contacted
                                ? "bg-green-50 text-green-700 focus:ring-green-400"
                                : "bg-gray-100 text-gray-600 focus:ring-gray-400"
                            }`}
                          >
                            <option value="not_contacted">Not contacted</option>
                            <option value="contacted">Contacted</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            title="Delete Lead"
                          >
                            <BiTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!loading && leads.length === 0 && (
          <div className="text-center py-20 bg-white">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BiUser size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No leads captured yet
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Once your chatbot starts capturing visitor information, they will
              appear here.
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default LeadsDetailsView;
