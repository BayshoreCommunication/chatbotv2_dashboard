"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BiDownload,
  BiEnvelope,
  BiFile,
  BiGroup,
  BiRefresh,
  BiUser,
  BiTrash,
} from "react-icons/bi";
import { getLeadsAction, deleteLeadAction, Lead } from "@/app/actions/leads";
import { toast } from "react-hot-toast";

const LeadsDetailsView = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const headers = ["ID", "Name", "Email", "Phone", "Message", "Session ID", "Date"];
    
    // Create CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...leads.map((lead) => [
        `"${lead.id}"`,
        `"${lead.name || ""}"`,
        `"${lead.email || ""}"`,
        `"${lead.phone || ""}"`,
        `"${(lead.message || "").replace(/"/g, '""')}"`,
        `"${lead.session_id}"`,
        `"${new Date(lead.created_at).toLocaleString()}"`,
      ].join(",")),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV download started");
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-2">
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="mb-1 text-3xl font-bold text-gray-900">
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
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-100 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-48 bg-gray-100 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-28 bg-gray-100 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-8 bg-gray-100 animate-pulse rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : leads.length > 0 ? (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{lead.email || "N/A"}</div>
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
                      <div className="text-sm text-gray-700 max-w-xs truncate" title={lead.message || ""}>
                        {lead.message || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
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
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {!loading && leads.length === 0 && (
          <div className="text-center py-20 bg-white">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BiUser size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No leads captured yet</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Once your chatbot starts capturing visitor information, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDetailsView;

