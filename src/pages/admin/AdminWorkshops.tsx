import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Laptop, Plus, Users, Calendar, MapPin, CheckCircle2, Clock } from "lucide-react";

export const AdminWorkshops: React.FC = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"workshops" | "participants">("workshops");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ws, parts] = await Promise.all([
        api.getWorkshops(),
        api.getWorkshopParticipants(),
      ]);
      setWorkshops(ws || []);
      setParticipants(parts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Technical Masterclasses & Corporate Workshops
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage developer masterclasses, Singapore corporate training, and participant registrations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("workshops")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "workshops" ? "bg-brand-blue text-white" : "bg-white text-brand-navy border border-brand-navy/10"
            }`}
          >
            Workshops ({workshops.length})
          </button>
          <button
            onClick={() => setActiveTab("participants")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "participants" ? "bg-brand-blue text-white" : "bg-white text-brand-navy border border-brand-navy/10"
            }`}
          >
            Participants ({participants.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading workshop records...</div>
      ) : activeTab === "workshops" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {workshops.map((ws) => (
            <div key={ws.id} className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-brand-blue uppercase font-mono">{ws.category}</span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{ws.format}</span>
              </div>
              <h3 className="font-display text-base font-bold text-brand-navy mb-1">{ws.title}</h3>
              <p className="text-xs text-brand-gray mb-3">{ws.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-brand-navy/8">
                <div>
                  <span className="text-brand-gray text-[10px] block">Date & Time</span>
                  <strong className="text-brand-navy">{ws.date}</strong>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] block">Fee (SGD)</span>
                  <strong className="text-brand-blue">S${ws.priceSGD?.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Participant</th>
                  <th className="p-3.5">Email / Company</th>
                  <th className="p-3.5">Workshop Track</th>
                  <th className="p-3.5">Registered Date</th>
                  <th className="p-3.5">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {participants.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5 font-bold text-brand-navy">{p.name}</td>
                    <td className="p-3.5 text-brand-gray">{p.email} {p.company && `(${p.company})`}</td>
                    <td className="p-3.5 font-semibold text-brand-blue">{p.workshopId}</td>
                    <td className="p-3.5 text-brand-gray">{p.registeredAt?.split("T")[0] || "Today"}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
