"use client";

import { useState, useMemo } from "react";
import { X, Send, Loader2 } from "lucide-react";

interface BulkEmailModalProps {
  open: boolean;
  onClose: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmails(raw: string): string[] {
  return raw
    .split(/[,\n]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => EMAIL_REGEX.test(e));
}

export default function BulkEmailModal({ open, onClose }: BulkEmailModalProps) {
  const [emailsRaw, setEmailsRaw] = useState("");
  const [subject, setSubject] = useState(
    "Actualización sobre tu aplicación — DAMA Panamá"
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const validEmails = useMemo(() => {
    const parsed = parseEmails(emailsRaw);
    return [...new Set(parsed)];
  }, [emailsRaw]);

  async function handleSend() {
    if (validEmails.length === 0 || !subject.trim() || !message.trim()) return;

    setSending(true);
    try {
      const res = await fetch("/api/admin/bulk-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: validEmails,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (data.ok) {
        alert(
          `Envío completado: ${data.sent} enviado${data.sent !== 1 ? "s" : ""}${
            data.failed > 0 ? `, ${data.failed} fallido${data.failed !== 1 ? "s" : ""}` : ""
          }`
        );
        setEmailsRaw("");
        setMessage("");
        onClose();
      } else {
        alert(`Error: ${data.error || "Error desconocido"}`);
      }
    } catch {
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-dama-blue-dark font-[family-name:var(--font-heading)]">
            Envío masivo
          </h2>
          <button
            onClick={onClose}
            disabled={sending}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-4">
          {/* Emails textarea */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Destinatarios
            </label>
            <textarea
              rows={4}
              placeholder="Ingresa los emails, uno por línea o separados por coma"
              value={emailsRaw}
              onChange={(e) => setEmailsRaw(e.target.value)}
              disabled={sending}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-dama-blue focus:outline-none focus:ring-2 focus:ring-dama-blue/20 disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-gray-500">
              {validEmails.length} email{validEmails.length !== 1 ? "s" : ""}{" "}
              válido{validEmails.length !== 1 ? "s" : ""} detectado
              {validEmails.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Asunto
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={sending}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-dama-blue focus:outline-none focus:ring-2 focus:ring-dama-blue/20 disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <textarea
              rows={6}
              placeholder="Escribe el mensaje que recibirán todos los destinatarios..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={sending}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-dama-blue focus:outline-none focus:ring-2 focus:ring-dama-blue/20 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={sending}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={
              sending || validEmails.length === 0 || !subject.trim() || !message.trim()
            }
            className="inline-flex items-center gap-2 rounded-lg bg-dama-blue px-4 py-2 text-sm font-medium text-white hover:bg-dama-blue-dark disabled:opacity-50"
          >
            {sending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {sending
              ? "Enviando..."
              : `Enviar a ${validEmails.length} destinatario${
                  validEmails.length !== 1 ? "s" : ""
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}
