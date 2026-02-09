"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  Loader2,
  Mail,
} from "lucide-react";
import BulkEmailModal from "@/components/BulkEmailModal";

interface Registro {
  id: number;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  pais: string;
  empresa: string | null;
  experiencia_gestion_datos: string;
  estado: string;
  created_at: string;
}

const PAGE_SIZE = 20;

const estadoBadge: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  aprobado: "bg-green-100 text-green-800",
  rechazado: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [bulkEmailOpen, setBulkEmailOpen] = useState(false);

  const fetchRegistros = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });
      if (search) params.set("search", search);
      if (estado) params.set("estado", estado);

      const res = await fetch(`/api/admin/registros?${params}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setRegistros(data.registros);
      setTotal(data.total);
    } catch {
      console.error("Error cargando registros");
    } finally {
      setLoading(false);
    }
  }, [page, search, estado, router]);

  useEffect(() => {
    fetchRegistros();
  }, [fetchRegistros]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users size={28} className="text-dama-blue" />
          <div>
            <h1 className="text-2xl font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
              Registros
            </h1>
            <p className="text-sm text-gray-500">
              {total} registro{total !== 1 ? "s" : ""} en total
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBulkEmailOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-dama-blue px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-dama-blue-dark"
          >
            <Mail size={16} />
            Envío masivo
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm text-gray-800 focus:border-dama-blue focus:outline-none focus:ring-2 focus:ring-dama-blue/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-dama-blue px-4 py-2 text-sm font-medium text-white hover:bg-dama-blue-dark"
          >
            Buscar
          </button>
        </form>

        <select
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-dama-blue focus:outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="px-4 py-3 font-medium text-gray-600">Nombre</th>
                <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 font-medium text-gray-600">País</th>
                <th className="px-4 py-3 font-medium text-gray-600">Empresa</th>
                <th className="px-4 py-3 font-medium text-gray-600">
                  Experiencia
                </th>
                <th className="px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Loader2
                      size={24}
                      className="mx-auto animate-spin text-dama-blue"
                    />
                  </td>
                </tr>
              ) : registros.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                registros.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {r.nombre_completo}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{r.email}</td>
                    <td className="px-4 py-3 text-gray-600">{r.pais}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.empresa || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.experiencia_gestion_datos}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          estadoBadge[r.estado] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.created_at).toLocaleDateString("es-PA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500">
              Página {page} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <BulkEmailModal
        open={bulkEmailOpen}
        onClose={() => setBulkEmailOpen(false)}
      />
    </div>
  );
}
