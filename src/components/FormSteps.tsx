"use client";

import { AnamneseFormData } from "@/lib/types";
import {
  CheckboxGroup,
  RadioGroup,
  SectionTitle,
  TextField,
  YesNoField,
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
      <TextField label="Idade" value={data.idade} onChange={(v) => update("idade", v)} required />
      <TextField label="Contato" value={data.contato} onChange={(v) => update("contato", v)} required placeholder="Telefone ou WhatsApp" />
      <TextField label="Endereço" value={data.endereco} onChange={(v) => update("endereco", v)} />
    </>
  );
}

const historicoGeralQuestions: {
  key: keyof AnamneseFormData;
  detailKey: keyof AnamneseFormData;
  label: string;
}[] = [
  { key: "tratamentoEsteticoAnterior", detailKey: "tratamentoEsteticoAnteriorQual", label: "Fez tratamento estético anterior?" },
  { key: "antecedentesAlergicos", detailKey: "antecedentesAlergicosQual", label: "Antecedentes alérgicos?" },
  { key: "funcionamentoIntestinal", detailKey: "funcionamentoIntestinalQual", label: "Funcionamento intestinal regular?" },
  { key: "praticaEsportes", detailKey: "praticaEsportesQual", label: "Pratica esportes?" },
  { key: "fumanteHistorico", detailKey: "fumanteHistoricoQual", label: "É fumante?" },
  { key: "alimentacaoBalanceada", detailKey: "alimentacaoBalanceadaQual", label: "Alimentação balanceada?" },
  { key: "tratamentoMedico", detailKey: "tratamentoMedicoQual", label: "Faz algum tratamento médico?" },
  { key: "usaMedicamento", detailKey: "usaMedicamentoQual", label: "Usa algum medicamento?" },
  { key: "usaAcidos", detailKey: "usaAcidosQual", label: "Usa ou já usou ácidos na pele?" },
  { key: "gestanteHistorico", detailKey: "gestanteHistoricoQual", label: "É gestante?" },
  { key: "marcapasso", detailKey: "marcapassoQual", label: "Portador de marcapasso?" },
];

export function StepHistoricoGeral({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Histórico Geral</SectionTitle>
      {historicoGeralQuestions.map((q) => (
        <YesNoField
          key={q.key}
          label={q.label}
          value={data[q.key] as string}
          detail={data[q.detailKey] as string}
          onChange={(v) => update(q.key, v)}
          onDetailChange={(v) => update(q.detailKey, v)}
        />
      ))}
    </>
  );
}

const historicoGeralContQuestions: typeof historicoGeralQuestions = [
  { key: "protesesMetalicas", detailKey: "protesesMetalicasQual", label: "Presença de próteses metálicas?" },
  { key: "problemasCardiacos", detailKey: "problemasCardiacosQual", label: "Tem problemas cardíacos?" },
  { key: "epilepsia", detailKey: "epilepsiaQual", label: "Portador de epilepsia?" },
  { key: "antecedentesOncologicos", detailKey: "antecedentesOncologicosQual", label: "Antecedentes oncológicos?" },
  { key: "cicloMenstrual", detailKey: "cicloMenstrualQual", label: "Ciclo menstrual regular?" },
  { key: "metodoAnticoncepcional", detailKey: "metodoAnticoncepcionalQual", label: "Usa método anticoncepcional?" },
  { key: "cuidadosDiarios", detailKey: "cuidadosDiariosQual", label: "Cuidados diários e produtos em uso?" },
  { key: "diabetesHistorico", detailKey: "diabetesHistoricoQual", label: "Tem diabetes?" },
  { key: "protesesDentarias", detailKey: "protesesDentariasQual", label: "Próteses dentárias?" },
  { key: "tomaSol", detailKey: "tomaSolQual", label: "Costuma tomar sol?" },
];

export function StepHistoricoGeralCont({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Histórico Geral (cont.)</SectionTitle>
      {historicoGeralContQuestions.map((q) => (
        <YesNoField
          key={q.key}
          label={q.label}
          value={data[q.key] as string}
          detail={data[q.detailKey] as string}
          onChange={(v) => update(q.key, v)}
          onDetailChange={(v) => update(q.detailKey, v)}
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
      <YesNoSimple label="Está gestante?" value={data.gestanteClinico} onChange={(v) => update("gestanteClinico", v)} />
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
      <CheckboxGroup
        label="Alimentação"
        options={["Doces", "Farináceos", "Refrigerantes", "Frituras", "Álcool"]}
        values={data.alimentacaoHabitos}
        onChange={(v) => update("alimentacaoHabitos", v)}
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

      <SectionTitle>Bem-estar Atual</SectionTitle>
      <CheckboxGroup
        label="Selecione o que se aplica"
        options={[
          "Ansiedade",
          "Apatia",
          "Cansaço",
          "Estresse",
          "Insônia",
          "Raiva",
          "Insegurança",
          "Baixa autoestima",
          "Preocupação",
          "Medo",
          "Tristeza",
        ]}
        values={data.bemEstar}
        onChange={(v) => update("bemEstar", v)}
      />
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
      <TextField label="Alergias?" value={data.alergiasComplementar} onChange={(v) => update("alergiasComplementar", v)} />
      <TextField label="Uso de anticoagulantes?" value={data.anticoagulantes} onChange={(v) => update("anticoagulantes", v)} />
      <TextField label="Problemas respiratórios?" value={data.problemasRespiratorios} onChange={(v) => update("problemasRespiratorios", v)} />
      <YesNoSimple label="Diabetes?" value={data.diabetesComplementar} onChange={(v) => update("diabetesComplementar", v)} />
      <YesNoSimple label="Gestante/Lactante?" value={data.gestanteLactante} onChange={(v) => update("gestanteLactante", v)} />
      <YesNoSimple label="Hepatite/Quelóide?" value={data.hepatiteQueloide} onChange={(v) => update("hepatiteQueloide", v)} />
      <YesNoSimple label="Fumante?" value={data.fumanteComplementar} onChange={(v) => update("fumanteComplementar", v)} />
      <TextField label="Queixa principal" value={data.queixaPrincipal} onChange={(v) => update("queixaPrincipal", v)} multiline />
    </>
  );
}

export function StepTermo({ data, update }: StepProps) {
  return (
    <>
      <SectionTitle>Termo de Responsabilidade</SectionTitle>
      <p className="mb-6 text-sm leading-relaxed text-stone-600">
        Declaro verdadeiras as informações preenchidas acima, isentando o profissional de
        qualquer culpa ou responsabilidade provenientes de omissão ou desconhecimento.
      </p>
      <TextField label="CPF do paciente" value={data.cpf} onChange={(v) => update("cpf", v)} required placeholder="000.000.000-00" />
      <TextField label="Local e data" value={data.localData} onChange={(v) => update("localData", v)} required placeholder="Ex: Belo Horizonte, 23/06/2026" />
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
