// src/app/(protected)/map/page.tsx

// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AlertTriangle, Mic, Navigation, X, CheckCircle, Loader2 } from "lucide-react";

// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";

// import api from "@/lib/api";






"use client";

import MapClient from "@/components/map/MapClient";

export default function MapPage() {
  return (
    <div className="h-screen w-full">
      <MapClient />
    </div>
  );
}








// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AlertTriangle, Mic, Navigation, X, CheckCircle, Loader2 } from "lucide-react";

// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";

// import api from "@/lib/api";

// // ... TOUT LE RESTE IDENTIQUE ...

// interface Report {
//   id: string;
//   title: string;
//   description: string;
//   report_type: string;
//   latitude: number;
//   longitude: number;
//   location_name: string;
// }

// /* FIX ICON LEAFLET (Pour éviter les icônes cassées au build Next.js) */
// if (typeof window !== "undefined") {
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//     iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//     shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   });
// }

// function LocationPicker({
//   setPosition,
// }: {
//   setPosition: (pos: [number, number]) => void;
// }) {
//   useMapEvents({
//     click(e) {
//       setPosition([e.latlng.lat, e.latlng.lng]);
//       toast.success("Position sélectionnée sur la carte");
//     },
//   });

//   return null;
// }

// export default function MapClient() {
//   const [reports, setReports] = useState<Report[]>([]);
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const [openForm, setOpenForm] = useState(false);
//   const [locating, setLocating] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     report_type: "TENSION",
//     location_name: "",
//   });

//   /* LOAD REPORTS */
//   const loadReports = async () => {
//     try {
//       const res = await api.get("/api/alerts/reports/");
//       setReports(res.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Erreur lors du chargement de la carte");
//     }
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   /* GPS */
//   const detectPosition = () => {
//     if (!navigator.geolocation) {
//       toast.error("La géolocalisation n'est pas supportée par votre navigateur");
//       return;
//     }

//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//         toast.success("Position détectée avec succès");
//         setLocating(false);
//       },
//       (error) => {
//         console.error(error);
//         toast.error("Impossible de détecter votre position exacte");
//         setLocating(false);
//       },
//       { enableHighAccuracy: true }
//     );
//   };

//   /* SUBMIT */
//   const submitReport = async () => {
//     if (!position) {
//       toast.error("Veuillez choisir une position sur la carte ou utiliser le GPS");
//       return;
//     }

//     if (!form.title.trim()) {
//       toast.error("Veuillez donner un titre à votre signalement");
//       return;
//     }

//     try {
//       await api.post("/api/alerts/reports/", {
//         ...form,
//         latitude: position[0],
//         longitude: position[1],
//       });

//       toast.success("Signalement envoyé avec succès");

//       setOpenForm(false);
//       setForm({
//         title: "",
//         description: "",
//         report_type: "TENSION",
//         location_name: "",
//       });

//       setPosition(null);
//       loadReports();
//     } catch (error) {
//       console.error(error);
//       toast.error("Erreur lors de l'envoi du signalement");
//     }
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden antialiased">
//       {/* MAP */}
//       <MapContainer
//         center={[6.1319, 1.2228]}
//         zoom={13}
//         className="h-full w-full z-10"
//       >
//         <TileLayer 
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {reports.map((r) => (
//           <Marker key={r.id} position={[r.latitude, r.longitude]}>
//             <Popup>
//               <div className="p-1">
//                 <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 uppercase tracking-wide mb-1.5 border border-red-100">
//                   {r.report_type}
//                 </span>
//                 <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
//                 <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">{r.description}</p>
//                 {r.location_name && (
//                   <p className="text-[11px] text-slate-500 font-semibold mt-2 border-t border-slate-100 pt-1.5">
//                     📍 {r.location_name}
//                   </p>
//                 )}
//               </div>
//             </Popup>
//           </Marker>
//         ))}

//         <LocationPicker setPosition={setPosition} />
//       </MapContainer>

//       {/* FLOATING ACTION BUTTONS */}
//       <div className="absolute top-4 left-4 z-[1000] flex gap-2.5">
//         <button
//           onClick={() => setOpenForm(true)}
//           className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 active:scale-98"
//         >
//           <AlertTriangle size={16} />
//           Signaler une tension
//         </button>

//         <button
//           onClick={() => toast("Voice bientôt disponible 🎤")}
//           className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:bg-slate-800"
//         >
//           <Mic size={16} />
//           Rapport vocal
//         </button>
//       </div>

//       {/* FORM MODAL CONTAINER */}
//       {openForm && (
//         <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            
//             {/* Header */}
//             <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
//               <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
//                 <AlertTriangle size={18} className="text-red-500" />
//                 Nouveau signalement
//               </h2>
//               <button
//                 onClick={() => setOpenForm(false)}
//                 className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Fields */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                   Titre du signalement
//                 </label>
//                 <input
//                   value={form.title}
//                   placeholder="Ex: Rassemblement spontané"
//                   className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10"
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                   Description de la situation
//                 </label>
//                 <textarea
//                   value={form.description}
//                   placeholder="Décrivez précisément les faits observés..."
//                   className="min-h-[90px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10"
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
//                   Nom du lieu / Repère géographique
//                 </label>
//                 <input
//                   value={form.location_name}
//                   placeholder="Ex: Près du grand marché, Rue 12"
//                   className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10"
//                   onChange={(e) => setForm({ ...form, location_name: e.target.value })}
//                 />
//               </div>

//               {/* GPS Actions */}
//               <div className="pt-1">
//                 <button
//                   type="button"
//                   onClick={detectPosition}
//                   disabled={locating}
//                   className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-blue-50 py-2.5 text-sm font-bold text-blue-700 transition-all hover:bg-blue-100 disabled:opacity-50"
//                 >
//                   {locating ? (
//                     <>
//                       <Loader2 size={16} className="animate-spin" />
//                       Recherche des coordonnées...
//                     </>
//                   ) : (
//                     <>
//                       <Navigation size={16} />
//                       📍 Détecter ma position GPS
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Location Status Feedback */}
//               {position ? (
//                 <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-100 px-3 py-2.5 text-xs font-bold text-green-700">
//                   <CheckCircle size={14} className="shrink-0" />
//                   <span>Emplacement validé : {position[0].toFixed(4)}, {position[1].toFixed(4)}</span>
//                 </div>
//               ) : (
//                 <p className="text-[11px] font-semibold text-amber-600 bg-amber-50/60 border border-amber-100 rounded-xl px-3 py-2">
//                   💡 Conseil : Vous pouvez aussi cliquer directement sur la carte pour placer le repère.
//                 </p>
//               )}

//               {/* Action Buttons */}
//               <div className="flex gap-3 border-t border-slate-100 pt-4 mt-2">
//                 <button
//                   type="button"
//                   onClick={() => setOpenForm(false)}
//                   className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="button"
//                   onClick={submitReport}
//                   disabled={!position || !form.title.trim()}
//                   className="w-1/2 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-all active:scale-98 disabled:pointer-events-none disabled:opacity-40"
//                 >
//                   Envoyer l'alerte
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

