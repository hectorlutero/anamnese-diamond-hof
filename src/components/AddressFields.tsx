"use client";

import { useState } from "react";
import { AnamneseFormData } from "@/lib/types";
import { maskCEP } from "@/lib/masks";
import { fetchAddressByCep } from "@/lib/viacep";
import { TextField } from "./FormFields";

interface AddressFieldsProps {
  data: AnamneseFormData;
  update: <K extends keyof AnamneseFormData>(
    key: K,
    value: AnamneseFormData[K]
  ) => void;
}

export function AddressFields({ data, update }: AddressFieldsProps) {
  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  const handleCepChange = async (value: string) => {
    const masked = maskCEP(value);
    update("cep", masked);
    setCepError("");

    const digits = masked.replace(/\D/g, "");
    if (digits.length !== 8) return;

    setLoading(true);
    try {
      const result = await fetchAddressByCep(masked);
      if (!result) {
        setCepError("CEP não encontrado");
        return;
      }
      update("logradouro", result.logradouro || "");
      update("bairro", result.bairro || "");
      update("cidade", result.localidade || "");
      update("uf", result.uf || "");
    } catch {
      setCepError("Erro ao buscar CEP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-2">
      <p className="mb-3 text-sm font-medium text-stone-700">Endereço</p>

      <label className="mb-5 block">
        <span className="mb-1 block text-sm font-medium text-stone-700">CEP</span>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={data.cep}
            onChange={(e) => handleCepChange(e.target.value)}
            placeholder="00000-000"
            className="w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-stone-800 placeholder:text-stone-400 focus:border-gold-500 focus:outline-none transition-colors"
          />
          {loading && (
            <span className="absolute right-0 top-2 text-xs text-gold-600">Buscando...</span>
          )}
        </div>
        {cepError && <p className="mt-1 text-xs text-red-600">{cepError}</p>}
      </label>

      <TextField
        label="Logradouro"
        value={data.logradouro}
        onChange={(v) => update("logradouro", v)}
        placeholder="Rua, avenida..."
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Número" value={data.numero} onChange={(v) => update("numero", v)} placeholder="123" />
        <TextField label="Complemento" value={data.complemento} onChange={(v) => update("complemento", v)} placeholder="Apto, bloco..." />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField label="Bairro" value={data.bairro} onChange={(v) => update("bairro", v)} />
        <TextField label="Cidade" value={data.cidade} onChange={(v) => update("cidade", v)} />
        <TextField label="UF" value={data.uf} onChange={(v) => update("uf", v.toUpperCase().slice(0, 2))} placeholder="MG" />
      </div>
    </div>
  );
}
