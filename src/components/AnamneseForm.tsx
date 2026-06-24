"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import {
  StepAnamneseComplementar,
  StepDiagnoseFacial,
  StepHabitosVida,
  StepHistoricoClinico,
  StepHistoricoGeral,
  StepHistoricoGeralCont,
  StepIdentificacao,
  StepTermo,
} from "./FormSteps";
import { AnamneseFormData, initialFormData } from "@/lib/types";
import { formatLocalData } from "@/lib/date";
import { isValidCPF, isValidPhone } from "@/lib/masks";

const STEPS = [
  { id: "identificacao", label: "Identificação", Component: StepIdentificacao },
  { id: "historico-geral", label: "Histórico Geral", Component: StepHistoricoGeral },
  { id: "historico-cont", label: "Histórico (cont.)", Component: StepHistoricoGeralCont },
  { id: "historico-clinico", label: "Histórico Clínico", Component: StepHistoricoClinico },
  { id: "habitos", label: "Hábitos", Component: StepHabitosVida },
  { id: "diagnose", label: "Diagnose Facial", Component: StepDiagnoseFacial },
  { id: "complementar", label: "Complementar", Component: StepAnamneseComplementar },
  { id: "termo", label: "Termo", Component: StepTermo },
] as const;

export function AnamneseForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AnamneseFormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = <K extends keyof AnamneseFormData>(
    key: K,
    value: AnamneseFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (data.cidade) return;
    import("@/lib/date").then(({ inferCityFromGeolocation }) => {
      inferCityFromGeolocation().then((city) => {
        if (city) setData((prev) => (prev.cidade ? prev : { ...prev, cidade: city }));
      });
    });
  }, [data.cidade]);

  const CurrentStep = STEPS[step].Component;
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  const handleSubmit = async () => {
    if (!data.nome || !data.contato || !data.aceiteTermo) {
      setErrorMsg("Preencha nome, contato e aceite o termo de responsabilidade.");
      return;
    }

    if (!isValidPhone(data.contato)) {
      setErrorMsg("Informe um telefone válido com DDD.");
      return;
    }

    if (!isValidCPF(data.cpf)) {
      setErrorMsg("Informe um CPF válido.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          localData: formatLocalData(data.cidade, data.uf),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erro ao enviar formulário");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Header />
        <div className="rounded-2xl border border-gold-200 bg-white p-8 shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
            <svg className="h-8 w-8 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 font-serif text-2xl text-gold-800">Anamnese enviada!</h2>
          <p className="text-stone-600">
            Suas informações foram recebidas com sucesso. A equipe Diamond HOF entrará em contato se necessário.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-24">
        <Header />

        <div className="mb-2 flex justify-between text-xs text-stone-500">
          <span>Etapa {step + 1} de {STEPS.length}</span>
          <span>{STEPS[step].label}</span>
        </div>
        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6 hidden flex-wrap gap-1 sm:flex">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                i === step
                  ? "bg-gold-600 text-white"
                  : i < step
                    ? "bg-gold-100 text-gold-700 cursor-pointer hover:bg-gold-200"
                    : "bg-stone-100 text-stone-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gold-200/60 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <CurrentStep data={data} update={update} />

          {errorMsg && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{errorMsg}</p>
          )}

          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0 || status === "loading"}
              className="rounded-lg border border-stone-300 px-6 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 disabled:opacity-40"
            >
              Voltar
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-8 py-2.5 text-sm font-medium text-white shadow-md transition hover:from-gold-600 hover:to-gold-800 disabled:opacity-60"
              >
                {status === "loading" ? "Enviando..." : "Enviar Anamnese"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-700 px-8 py-2.5 text-sm font-medium text-white shadow-md transition hover:from-gold-600 hover:to-gold-800"
              >
                Próximo
              </button>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-stone-500">
          <p className="font-medium text-gold-700">Dra. Isadora Siman · CRO-MG 72856</p>
          <p className="mt-1">
            <a href="https://instagram.com/dra_isadorasiman" className="hover:text-gold-600">@dra_isadorasiman</a>
          </p>
        </footer>
    </div>
  );
}
