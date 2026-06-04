"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      setPosition([
        e.latlng.lat,
        e.latlng.lng,
      ]);

      toast.success(
        "Position sélectionnée sur la carte"
      );
    },
  });

  return null;
}

export default function MapClient() {
  const [reports, setReports] =
    useState<Report[]>([]);

  const [stats, setStats] =
    useState<Statistics | null>(null);

  const [filter, setFilter] =
    useState("ALL");

  const [position, setPosition] =
    useState<[number, number] | null>(
      null
    );

  const [openForm, setOpenForm] =
    useState(false);

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
    } catch {
      toast.error(
        "Erreur chargement signalements"
      );
    }
  };

  const loadStats = async () => {
    try {
      const res = await api.get(
        "/api/alerts/statistics/"
      );

      setStats(res.data);
    } catch {}
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
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);

        toast.success(
          "Position détectée"
        );
      },
      () =>
        toast.error(
          "Impossible de récupérer votre position"
        )
    );
  };

  const submitReport = async () => {
    if (!position) {
      toast.error(
        "Sélectionnez une position"
      );
      return;
    }

    try {
      await api.post(
        "/api/alerts/reports/",
        {
          ...form,
          latitude: position[0],
          longitude: position[1],
        }
      );

      toast.success(
        "Signalement envoyé"
      );

      setOpenForm(false);

      setForm({
        title: "",
        description: "",
        report_type: "TENSION",
        location_name: "",
      });

      loadReports();
      loadStats();
    } catch {
      toast.error(
        "Erreur lors de l'envoi"
      );
    }
  };

  return (
    <div className="relative h-screen w-full">

      {/* Stats */}

      {stats && (
        <div className="absolute right-4 top-4 z-[9999] w-72 rounded-2xl bg-white p-4 shadow-xl">
          <h3 className="mb-3 font-bold">
            Statistiques
          </h3>

          <div className="space-y-2 text-sm">
            <p>
              Total :{" "}
              {stats.total_reports}
            </p>

            <p>
              Tensions :{" "}
              {stats.total_tensions}
            </p>

            <p>
              VBG : {stats.total_vbg}
            </p>

            <p>
              Initiatives :{" "}
              {stats.total_initiatives}
            </p>

            <p>
              En attente :{" "}
              {stats.pending_reports}
            </p>

            <p>
              Résolus :{" "}
              {stats.resolved_reports}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}

      <div className="absolute left-4 top-4 z-[9999] flex gap-3">
        <button
          onClick={() =>
            setOpenForm(true)
          }
          className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white shadow-lg"
        >
          Signaler
        </button>

        <button
          onClick={() =>
            toast(
              "🎤 Fonctionnalité bientôt disponible"
            )
          }
          className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white shadow-lg"
        >
          Voice
        </button>
      </div>

      {/* Filtres */}

      <div className="absolute bottom-4 left-4 z-[9999] flex gap-2">
        {[
          "ALL",
          "TENSION",
          "VBG",
          "INITIATIVE",
        ].map((item) => (
          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            className={`rounded-xl px-4 py-2 text-white ${
              filter === item
                ? "bg-blue-600"
                : "bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Carte */}

      <MapContainer
        center={[6.1319, 1.2228]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[
              Number(
                report.latitude
              ),
              Number(
                report.longitude
              ),
            ]}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold">
                  {report.title}
                </h3>

                <p>
                  {
                    report.description
                  }
                </p>

                <p>
                  📍{" "}
                  {
                    report.location_name
                  }
                </p>

                <p>
                  Type :{" "}
                  {
                    report.report_type
                  }
                </p>

                <p>
                  Statut :{" "}
                  {report.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {position && (
          <Marker
            position={position}
          />
        )}

        <LocationPicker
          setPosition={
            setPosition
          }
        />
      </MapContainer>

      {/* Formulaire */}

      {openForm && (
        <div className="absolute inset-0 z-[99999] flex items-center justify-center bg-black/60">
          <div className="w-[450px] rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="mb-4 text-xl font-bold">
              Nouveau signalement
            </h2>

            <input
              placeholder="Titre"
              className="mb-3 w-full rounded-lg border p-3"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="mb-3 w-full rounded-lg border p-3"
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

            <select
              className="mb-3 w-full rounded-lg border p-3"
              value={
                form.report_type
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  report_type:
                    e.target.value,
                })
              }
            >
              <option value="TENSION">
                Tension
              </option>

              <option value="VBG">
                VBG
              </option>

              <option value="INITIATIVE">
                Initiative
              </option>
            </select>

            <input
              placeholder="Nom du lieu"
              className="mb-3 w-full rounded-lg border p-3"
              value={
                form.location_name
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  location_name:
                    e.target.value,
                })
              }
            />

            <button
              onClick={
                detectPosition
              }
              className="mb-3 w-full rounded-lg bg-blue-600 py-3 text-white"
            >
              📍 Détecter ma position
            </button>

            <button
              onClick={
                submitReport
              }
              className="w-full rounded-lg bg-green-600 py-3 text-white"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}