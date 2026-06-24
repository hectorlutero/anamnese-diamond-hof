"use client";

import { AnamneseFormData } from "@/lib/types";
import { formatLocalData } from "@/lib/date";
import { maskCPF, maskPhone } from "@/lib/masks";
import { AddressFields } from "./AddressFields";
import {
  CheckboxGroup,
  MaskedField,
  MoodPicker,
  RadioGroup,
  SectionTitle,
  TextField,
  YesNoSimple,
} from "./FormFields";

interface StepProps {
  data: AnamneseFormData;
  update: <K extends keyof AnamneseFormData>(
    key: K,
    value: AnamneseFormData[K]
  ) => void;
}

export function StepIdentificacao({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Identificação</SectionTitle>
      <TextField label="Nome" value={data.nome} onChange={(v) => update("nome", v)} required />
      <TextField label="Idade" value={data.idade} onChange={(v) => update("idade", v)} required inputMode="numeric" />
      <MaskedField
        label="Contato"
        value={data.contato}
        onChange={(v) => update("contato", v)}
        mask={maskPhone}
        required
        placeholder="(31) 99999-9999"
        inputMode="tel"
      />
      <AddressFields data={data} update={update} />
    </>
  );
}

const historicoGeralQuestions: {
  key: keyof AnamneseFormData;
  label: string;
}[] = [
  { key: "tratamentoEsteticoAnterior", label: "Fez tratamento estético anterior?" },
  { key: "usaAcidos", label: "Usa ou já usou ácidos na pele?" },
  { key: "marcapasso", label: "Portador de marcapasso?" },
];

export function StepHistoricoGeral({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Histórico Geral</SectionTitle>
      {historicoGeralQuestions.map((q) => (
        <YesNoSimple
          key={q.key}
          label={q.label}
          value={data[q.key] as string}
          onChange={(v) => update(q.key, v)}
        />
      ))}
    </>
  );
}

const historicoGeralContQuestions: typeof historicoGeralQuestions = [
  { key: "protesesMetalicas", label: "Presença de próteses metálicas?" },
  { key: "problemasCardiacos", label: "Tem problemas cardíacos?" },
  { key: "epilepsia", label: "Portador de epilepsia?" },
  { key: "antecedentesOncologicos", label: "Antecedentes oncológicos?" },
  { key: "cicloMenstrual", label: "Ciclo menstrual regular?" },
  { key: "metodoAnticoncepcional", label: "Usa método anticoncepcional?" },
  { key: "cuidadosDiarios", label: "Cuidados diários e produtos em uso?" },
  { key: "protesesDentarias", label: "Próteses dentárias?" },
  { key: "tomaSol", label: "Costuma tomar sol?" },
];

export function StepHistoricoGeralCont({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Histórico Geral (cont.)</SectionTitle>
      {historicoGeralContQuestions.map((q) => (
        <YesNoSimple
          key={q.key}
          label={q.label}
          value={data[q.key] as string}
          onChange={(v) => update(q.key, v)}
        />
      ))}
    </>
  );
}

export function StepHistoricoClinico({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Histórico Clínico</SectionTitle>
      <CheckboxGroup
        label="Condições"
        options={[
          "Diabetes",
          "Hipertensão",
          "Hipotensão",
          "Depressão",
          "Anemia",
          "Câncer",
          "Alterações hormonais",
          "Problemas vasculares",
          "Alterações na tireóide",
          "Colesterol alterado",
          "Triglicerídeos alterado",
          "Nenhuma",
        ]}
        values={data.condicoesClinicas}
        onChange={(v) => update("condicoesClinicas", v)}
      />
      <TextField label="Já fez alguma cirurgia? Se sim, qual?" value={data.cirurgia} onChange={(v) => update("cirurgia", v)} multiline />
      <TextField label="Possui alguma alergia? A que?" value={data.alergia} onChange={(v) => update("alergia", v)} multiline />
      <TextField label="Usa medicamento atualmente? Se sim, qual?" value={data.medicamentoAtual} onChange={(v) => update("medicamentoAtual", v)} multiline />
      <YesNoSimple label="Gestante/Lactante?" value={data.gestanteLactante} onChange={(v) => update("gestanteLactante", v)} />
    </>
  );
}

export function StepHabitosVida({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Hábitos de Vida</SectionTitle>
      <RadioGroup
        label="Água diária"
        options={[
          { value: "menos-1l", label: "Menos de 1L" },
          { value: "1l-ou-mais", label: "1L ou mais" },
        ]}
        value={data.aguaDiaria}
        onChange={(v) => update("aguaDiaria", v)}
      />
      <RadioGroup
        label="Fumante"
        options={[
          { value: "sim", label: "Sim" },
          { value: "nunca", label: "Não sou, nunca fui" },
          { value: "ex", label: "Não sou, mas já fui" },
        ]}
        value={data.fumanteHabitos}
        onChange={(v) => update("fumanteHabitos", v)}
      />
      <TextField
        label="Quais você consome?"
        value={data.quaisConsome}
        onChange={(v) => update("quaisConsome", v)}
        multiline
        placeholder="Descreva alimentos, bebidas e substâncias que consome regularmente"
      />
      <RadioGroup
        label="Intestino"
        options={[
          { value: "excelente", label: "Excelente" },
          { value: "bom", label: "Bom" },
          { value: "regular", label: "Regular" },
          { value: "ruim", label: "Ruim" },
          { value: "pessimo", label: "Péssimo" },
        ]}
        value={data.intestino}
        onChange={(v) => update("intestino", v)}
      />
      <TextField label="Qualidade do sono" value={data.qualidadeSono} onChange={(v) => update("qualidadeSono", v)} multiline />
    </>
  );
}

export function StepDiagnoseFacial({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Diagnose Facial</SectionTitle>
      <CheckboxGroup
        label="Produtos em uso"
        options={["Sabonete", "Ácido", "Esfoliante", "Tônico", "Hidratante", "Filtro solar", "Maquiagem"]}
        values={data.produtosUso}
        onChange={(v) => update("produtosUso", v)}
      />
      <YesNoSimple label="Procedimento facial nos últimos 3 meses?" value={data.procedimentoFacial} onChange={(v) => update("procedimentoFacial", v)} />
      <YesNoSimple label="Alergia ou sensibilidade a cosmético?" value={data.alergiaCosmetico} onChange={(v) => update("alergiaCosmetico", v)} />
      <MoodPicker values={data.humor} onChange={(v) => update("humor", v)} />
    </>
  );
}

export function StepAnamneseComplementar({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Anamnese Complementar</SectionTitle>
      <TextField label="Medicamentos controlados?" value={data.medicamentosControlados} onChange={(v) => update("medicamentosControlados", v)} />
      <TextField label="Tratamento médico atual?" value={data.tratamentoMedicoAtual} onChange={(v) => update("tratamentoMedicoAtual", v)} />
      <TextField label="Tratamento estético atual?" value={data.tratamentoEsteticoAtual} onChange={(v) => update("tratamentoEsteticoAtual", v)} />
      <TextField label="Atividade física?" value={data.atividadeFisica} onChange={(v) => update("atividadeFisica", v)} />
      <TextField label="Uso de anticoagulantes?" value={data.anticoagulantes} onChange={(v) => update("anticoagulantes", v)} />
      <TextField label="Problemas respiratórios?" value={data.problemasRespiratorios} onChange={(v) => update("problemasRespiratorios", v)} />
      <YesNoSimple label="Quelóide?" value={data.queloide} onChange={(v) => update("queloide", v)} />
      <TextField label="Queixa principal" value={data.queixaPrincipal} onChange={(v) => update("queixaPrincipal", v)} multiline />
    </>
  );
}

export function StepTermo({ data, update }: StepProps) {
  const localData = formatLocalData(data.cidade, data.uf);

  return (
    <>
      <SectionTitle>Termo de Responsabilidade</SectionTitle>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        Declaro verdadeiras as informações preenchidas acima, isentando o profissional de
        qualquer culpa ou responsabilidade provenientes de omissão ou desconhecimento.
      </p>
      <MaskedField
        label="CPF do paciente"
        value={data.cpf}
        onChange={(v) => update("cpf", v)}
        mask={maskCPF}
        required
        placeholder="000.000.000-00"
        inputMode="numeric"
      />
      <div className="mb-5 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Local e data</p>
        <p className="mt-1 text-sm text-stone-800">{localData}</p>
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-gold-200 bg-gold-50/50 p-4">
        <input
          type="checkbox"
          checked={data.aceiteTermo}
          onChange={(e) => update("aceiteTermo", e.target.checked)}
          required
          className="mt-0.5 accent-gold-600"
        />
        <span className="text-sm text-stone-700">
          Li e concordo com o termo de responsabilidade acima.
        </span>
      </label>
    </>
  );
}
