import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { ShieldAlert, Search, Clock, User, Globe } from "lucide-react";

export const AdminAuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await api.getAuditLogs();
      setLogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase();
    return (
      log.action?.toLowerCase().includes(q) ||
      log.details?.toLowerCase().includes(q) ||
      log.user?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            System & Security Audit Logs
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Immutable tracking of administrator logins, service modifications, password updates, and certificate issuances.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-brand-navy/10 flex items-center gap-3 shadow-xs">
        <Search className="w-4 h-4 text-brand-gray" />
        <input
          type="text"
          placeholder="Filter audit logs by action, details, user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading audit trail...</div>
      ) : filteredLogs.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Details</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5 text-brand-gray whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-SG")}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans text-brand-navy max-w-md">{log.details}</td>
                    <td className="p-3.5 text-brand-gray">{log.user}</td>
                    <td className="p-3.5 text-brand-gray">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No audit logs matching query.
        </div>
      )}
    </div>
  );
};
