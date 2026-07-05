"use client";

import {
  addTeamMemberAction,
  getTeamMembersAction,
  revokeTeamMemberAction,
  toggleTeamMemberAction,
  type TeamMember,
  type TeamMemberStatus,
} from "@/app/actions/team-access";
import { useCallback, useEffect, useState } from "react";
import { BiBlock, BiCheck, BiUserPlus, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const MAX_MEMBERS = 5;

function StatusBadge({ status }: { status: TeamMemberStatus }) {
  const map: Record<TeamMemberStatus, { label: string; dot: string; cls: string }> = {
    active:   { label: "Active",   dot: "bg-green-500",  cls: "bg-green-100 text-green-700" },
    pending:  { label: "Pending",  dot: "bg-yellow-400", cls: "bg-yellow-100 text-yellow-700" },
    inactive: { label: "Blocked",  dot: "bg-orange-400", cls: "bg-orange-100 text-orange-700" },
    revoked:  { label: "Revoked",  dot: "bg-gray-400",   cls: "bg-gray-100 text-gray-500" },
  };
  const s = map[status] ?? map.revoked;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export default function TeamAccess({ isTeamMember = false }: { isTeamMember?: boolean }) {
  const [members, setMembers]       = useState<TeamMember[]>([]);
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [adding, setAdding]         = useState(false);
  const [actionId, setActionId]     = useState<string | null>(null);
  const [error, setError]           = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await getTeamMembersAction();
    if (res.ok && res.data) setMembers(res.data);
  }, []);

  useEffect(() => { void load(); }, [load]);

  if (isTeamMember) return null;

  const activeCount = members.filter((m) => m.status !== "revoked").length;
  const atLimit     = activeCount >= MAX_MEMBERS;

  const handleAdd = async () => {
    setError(null);
    const n = name.trim();
    const e = email.trim();
    if (!n || !e) { setError("Name and email are required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setError("Enter a valid email address."); return; }
    if (atLimit) { setError(`Maximum of ${MAX_MEMBERS} members reached.`); return; }

    setAdding(true);
    try {
      const res = await addTeamMemberAction(n, e);
      if (!res.ok) { toast.error(res.error ?? "Failed to add member."); return; }
      if (res.data) setMembers((prev) => [res.data!, ...prev]);
      setName("");
      setEmail("");
      toast.success(`Verification email sent to ${e}.`);
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (member: TeamMember) => {
    const next = member.status === "inactive" ? "active" : "inactive";
    setActionId(member.id);
    try {
      const res = await toggleTeamMemberAction(member.id, next);
      if (!res.ok) return;
      setMembers((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, status: next } : m))
      );
    } finally {
      setActionId(null);
    }
  };

  const handleRevoke = async (id: string) => {
    setActionId(id);
    try {
      const res = await revokeTeamMemberAction(id);
      if (!res.ok) return;
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "revoked" } : m))
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="rounded border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BiUserPlus size={16} className="text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Team Access
          </h2>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
          {activeCount} / {MAX_MEMBERS} members
        </span>
      </div>

      <div className="p-6 space-y-5">
        {/* Add form */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Add a team member
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              disabled={adding || atLimit}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              disabled={adding || atLimit}
              onKeyDown={(e) => e.key === "Enter" && void handleAdd()}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => void handleAdd()}
              disabled={adding || atLimit}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap"
            >
              <BiUserPlus size={16} />
              {adding ? "Sending…" : "Add Member"}
            </button>
          </div>

          {atLimit && (
            <p className="text-xs text-amber-600">
              Member limit reached. Revoke a member to add someone new.
            </p>
          )}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>

        {/* Members list */}
        {members.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">
            No team members added yet.
          </p>
        ) : (
          <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-3 px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors"
              >
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{m.name}</p>
                  <p className="truncate text-xs text-gray-500">{m.email}</p>
                </div>

                {/* Status + date + actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <StatusBadge status={m.status} />

                  <span className="hidden text-xs text-gray-400 sm:block">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>

                  {/* Block / Unblock — only for active or inactive */}
                  {(m.status === "active" || m.status === "inactive") && (
                    <button
                      type="button"
                      onClick={() => void handleToggle(m)}
                      disabled={actionId === m.id}
                      title={m.status === "active" ? "Block member" : "Unblock member"}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium disabled:opacity-50 transition-colors ${
                        m.status === "active"
                          ? "border-orange-200 text-orange-600 hover:bg-orange-50"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {m.status === "active" ? (
                        <><BiBlock size={13} /> Block</>
                      ) : (
                        <><BiCheck size={13} /> Unblock</>
                      )}
                    </button>
                  )}

                  {/* Revoke — for anything except already revoked */}
                  {m.status !== "revoked" && (
                    <button
                      type="button"
                      onClick={() => void handleRevoke(m.id)}
                      disabled={actionId === m.id}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <BiX size={14} />
                      {actionId === m.id ? "…" : "Revoke"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
