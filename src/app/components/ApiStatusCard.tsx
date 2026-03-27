import { useEffect, useState } from "react";

import { API_BASE_URL } from "../lib/api";
import { getHealthStatus } from "../services/health";

type ApiStatusState = "checking" | "online" | "offline";

export function ApiStatusCard() {
  const [status, setStatus] = useState<ApiStatusState>("checking");
  const [message, setMessage] = useState("Verificando conexão com a API...");

  useEffect(() => {
    let active = true;

    async function checkHealth() {
      try {
        const response = await getHealthStatus();

        if (!active) {
          return;
        }

        setStatus("online");
        setMessage(response.message || response.status || "API respondeu com sucesso.");
      } catch {
        if (!active) {
          return;
        }

        setStatus("offline");
        setMessage("Não foi possível conectar ao backend local.");
      }
    }

    void checkHealth();

    return () => {
      active = false;
    };
  }, []);

  const toneClassName =
    status === "online"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
      : status === "offline"
        ? "border-red-500/20 bg-red-500/10 text-red-100"
        : "border-white/10 bg-white/6 text-sidebar-foreground/80";

  const label =
    status === "online" ? "API online" : status === "offline" ? "API offline" : "API verificando";

  return (
    <div className={`mt-4 rounded-[1rem] border px-3 py-3 text-sm ${toneClassName}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">{label}</p>
        <span className="text-[0.65rem] uppercase tracking-[0.24em] opacity-75">/health</span>
      </div>
      <p className="mt-2 text-xs leading-5 opacity-90">{message}</p>
      <p className="mt-2 truncate text-[0.7rem] opacity-70">{API_BASE_URL}</p>
    </div>
  );
}
