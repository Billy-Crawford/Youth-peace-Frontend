


"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  HeartHandshake, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Mic, 
  PlusCircle, 
  Layers, 
  X,
  Navigation
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import api from "@/lib/api";

interface Report {
  id: string;
  title: string;
  description: string;
  report_type: "TENSION" | "VBG" | "INITIATIVE";
  latitude: string;
  longitude: string;
  location_name: string;
  status: string;
}

interface Statistics {
  total_reports: number;
  total_tensions: number;
  total_vbg: number;
  total_initiatives: number;
  pending_reports: number;
  resolved_reports: number;
}

function LocationPicker({
  setPosition,
}: {
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      toast.success("Position sélectionnée sur la carte");
    },
  });

  return null;
}

export default function MapClient() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    report_type: "TENSION",
    location_name: "",
  });

  const loadReports = async () => {
    try {
      const url =
        filter === "ALL"
          ? "/api/alerts/reports/"
          : `/api/alerts/reports/?report_type=${filter}`;

      const res = await api.get(url);
      setReports(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des signalements");
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get("/api/alerts/statistics/");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReports();
  }, [filter]);

  useEffect(() => {
    loadStats();
  }, []);

  const detectPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        toast.success("Position GPS détectée avec succès");
      },
      () => toast.error("Impossible de récupérer votre position actuelle"),
    );
  };

  const submitReport = async () => {
    if (!position) {
      toast.error("Veuillez sélectionner une position sur la carte");
      return;
    }

    try {
      await api.post("/api/alerts/reports/", {
        ...form,
        latitude: position[0],
        longitude: position[1],
      });

      toast.success("Signalement transmis avec succès");
      setOpenForm(false);
      setForm({
        title: "",
        description: "",
        report_type: "TENSION",
        location_name: "",
      });

      loadReports();
      loadStats();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'envoi du formulaire");
    }
  };

  const getFilterLabel = (type: string) => {
    switch (type) {
      case "ALL": return "Tous les flux";
      case "TENSION": return "Tensions";
      case "VBG": return "VBG";
      case "INITIATIVE": return "Initiatives";
      default: return type;
    }
  };

  return (
    <div className="relative h-screen w-full antialiased font-sans select-none">
      
      {/* 📊 BLOC DES STATISTIQUES (Sublimé & Lisible) */}
      {stats && (
        <div className="absolute right-4 top-4 z-[9999] w-80 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-md">
          {/* En-tête */}
          <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="rounded-lg bg-slate-100 p-2 text-slate-800 border border-slate-200/40">
              <BarChart3 size={16} className="text-slate-700" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Vue d'ensemble
              </h3>
              <p className="text-[10px] font-bold text-slate-500">Données mises à jour en temps réel</p>
            </div>
          </div>

          {/* Contenu & Chiffres */}
          <div className="space-y-3.5">
            {/* Cumul Total */}
            <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Total signalements
              </span>
              <span className="text-2xl font-black tracking-tight">{stats.total_reports}</span>
            </div>

            {/* Grille des types d'alertes */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-red-100 bg-red-50/40 p-3 flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle size={12} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-800">Tensions</span>
                </div>
                <p className="text-xl font-black text-red-900 tracking-tight">{stats.total_tensions}</p>
              </div>

              <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-3 flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-1">
                  <ShieldAlert size={12} className="text-purple-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-800">VBG</span>
                </div>
                <p className="text-xl font-black text-purple-900 tracking-tight">{stats.total_vbg}</p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5 col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <HeartHandshake size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800">Initiatives de paix</span>
                </div>
                <p className="text-lg font-black text-blue-900 tracking-tight">{stats.total_initiatives}</p>
              </div>
            </div>

            {/* États d'avancement / Traitement */}
            <div className="border-t border-slate-100 pt-3 flex items-center gap-2">
              <div className="w-1/2 rounded-xl border border-slate-100 bg-slate-50/60 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
                  <Clock size={11} />
                  <span className="text-[9px] font-black uppercase tracking-wider">En attente</span>
                </div>
                <p className="text-sm font-black text-slate-800">{stats.pending_reports}</p>
              </div>
              
              <div className="w-1/2 rounded-xl border border-emerald-100 bg-emerald-50/30 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-700 mb-0.5">
                  <CheckCircle2 size={11} />
                  <span className="text-[9px] font-black uppercase tracking-wider">Résolus</span>
                </div>
                <p className="text-sm font-black text-emerald-800">{stats.resolved_reports}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 BOUTONS D'ACTION (Haut Gauche) */}
      <div className="absolute left-4 top-4 z-[9999] flex gap-2">
        <button
          onClick={() => setOpenForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition-all active:scale-95"
        >
          <PlusCircle size={16} />
          Nouveau Signalement
        </button>

        <button
          onClick={() => toast("🎤 Fonctionnalité bientôt disponible")}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all active:scale-95"
        >
          <Mic size={16} />
          Voice Audio
        </button>
      </div>

      {/* 📁 FILTRES FLUX (Bas Gauche) */}
      <div className="absolute bottom-6 left-4 z-[9999] flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl backdrop-blur-md">
        <div className="rounded-xl bg-slate-100 p-2 text-slate-500 mr-1 sm:block hidden">
          <Layers size={14} />
        </div>
        {["ALL", "TENSION", "VBG", "INITIATIVE"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              filter === item 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {getFilterLabel(item)}
          </button>
        ))}
      </div>

      {/* 🗺️ CARTE INTERACTIVE */}
      <MapContainer
        center={[6.1319, 1.2228]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false} // Désactivé pour un affichage épuré
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[Number(report.latitude), Number(report.longitude)]}
          >
            <Popup>
              <div className="p-1 space-y-1.5 min-w-[200px]">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600">{report.report_type}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{report.status}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{report.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{report.description}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 pt-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span>{report.location_name}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {position && <Marker position={position} />}
        <LocationPicker setPosition={setPosition} />
      </MapContainer>

      {/* 📝 MODALE FORMULAIRE (Refondue & Élégante) */}
      {openForm && (
        <div className="absolute inset-0 z-[99999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            
            {/* Header Modale */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">Nouveau signalement</h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Renseignez les informations de l'alerte</p>
              </div>
              <button 
                onClick={() => setOpenForm(false)}
                className="rounded-xl border border-slate-200 p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Champs du formulaire */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titre court de l'événement"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                placeholder="Description détaillée des faits observés..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Catégorie</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-700 bg-white outline-none focus:border-blue-500 transition-all cursor-pointer"
                    value={form.report_type}
                    onChange={(e) => setForm({ ...form, report_type: e.target.value })}
                  >
                    <option value="TENSION">🚨 Tension</option>
                    <option value="VBG">💜 VBG</option>
                    <option value="INITIATIVE">🕊️ Initiative</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase text-slate-500 pl-1">Nom du lieu</label>
                  <input
                    type="text"
                    placeholder="Ex: Quartier, Ville"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 transition-all"
                    value={form.location_name}
                    onChange={(e) => setForm({ ...form, location_name: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Géolocalisation & Validation */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={detectPosition}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Navigation size={15} className="fill-blue-700" />
                Détecter ma position GPS
              </button>

              <button
                type="button"
                onClick={submitReport}
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors active:scale-98"
              >
                Envoyer le signalement
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}