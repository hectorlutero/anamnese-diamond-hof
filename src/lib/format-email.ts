import { AnamneseFormData, YesNo } from "./types";

function yn(value: YesNo): string {
  if (value === "sim") return "Sim";
  if (value === "nao") return "Não";
  return "—";
}

function ynWithDetail(value: YesNo, detail: string): string {
  const base = yn(value);
  if (detail.trim()) return `${base} — ${detail}`;
  return base;
}

function list(items: string[]): string {
  return items.length > 0 ? items.join(", ") : "—";
}

export function formatAnamneseEmail(data: AnamneseFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Nova Anamnese — ${data.nome || "Paciente"}`;

  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: "Identificação",
      rows: [
        ["Nome", data.nome],
        ["Idade", data.idade],
        ["Contato", data.contato],
        ["Endereço", data.endereco],
      ],
    },
    {
      title: "Histórico Geral",
      rows: [
        ["Tratamento estético anterior", ynWithDetail(data.tratamentoEsteticoAnterior, data.tratamentoEsteticoAnteriorQual)],
        ["Antecedentes alérgicos", ynWithDetail(data.antecedentesAlergicos, data.antecedentesAlergicosQual)],
        ["Funcionamento intestinal regular", ynWithDetail(data.funcionamentoIntestinal, data.funcionamentoIntestinalQual)],
        ["Pratica esportes", ynWithDetail(data.praticaEsportes, data.praticaEsportesQual)],
        ["É fumante", ynWithDetail(data.fumanteHistorico, data.fumanteHistoricoQual)],
        ["Alimentação balanceada", ynWithDetail(data.alimentacaoBalanceada, data.alimentacaoBalanceadaQual)],
        ["Faz tratamento médico", ynWithDetail(data.tratamentoMedico, data.tratamentoMedicoQual)],
        ["Usa medicamento", ynWithDetail(data.usaMedicamento, data.usaMedicamentoQual)],
        ["Usa ou já usou ácidos na pele", ynWithDetail(data.usaAcidos, data.usaAcidosQual)],
        ["É gestante", ynWithDetail(data.gestanteHistorico, data.gestanteHistoricoQual)],
        ["Portador de marcapasso", ynWithDetail(data.marcapasso, data.marcapassoQual)],
      ],
    },
    {
      title: "Histórico Geral (cont.)",
      rows: [
        ["Próteses metálicas", ynWithDetail(data.protesesMetalicas, data.protesesMetalicasQual)],
        ["Problemas cardíacos", ynWithDetail(data.problemasCardiacos, data.problemasCardiacosQual)],
        ["Epilepsia", ynWithDetail(data.epilepsia, data.epilepsiaQual)],
        ["Antecedentes oncológicos", ynWithDetail(data.antecedentesOncologicos, data.antecedentesOncologicosQual)],
        ["Ciclo menstrual regular", ynWithDetail(data.cicloMenstrual, data.cicloMenstrualQual)],
        ["Método anticoncepcional", ynWithDetail(data.metodoAnticoncepcional, data.metodoAnticoncepcionalQual)],
        ["Cuidados diários e produtos", ynWithDetail(data.cuidadosDiarios, data.cuidadosDiariosQual)],
        ["Diabetes", ynWithDetail(data.diabetesHistorico, data.diabetesHistoricoQual)],
        ["Próteses dentárias", ynWithDetail(data.protesesDentarias, data.protesesDentariasQual)],
        ["Costuma tomar sol", ynWithDetail(data.tomaSol, data.tomaSolQual)],
      ],
    },
    {
      title: "Histórico Clínico",
      rows: [
        ["Condições", list(data.condicoesClinicas)],
        ["Cirurgias", data.cirurgia || "—"],
        ["Alergias", data.alergia || "—"],
        ["Medicamentos atuais", data.medicamentoAtual || "—"],
        ["Gestante", yn(data.gestanteClinico)],
      ],
    },
    {
      title: "Hábitos de Vida",
      rows: [
        ["Água diária", data.aguaDiaria || "—"],
        ["Fumante", data.fumanteHabitos || "—"],
        ["Alimentação", list(data.alimentacaoHabitos)],
        ["Intestino", data.intestino || "—"],
        ["Qualidade do sono", data.qualidadeSono || "—"],
      ],
    },
    {
      title: "Diagnose Facial",
      rows: [
        ["Produtos em uso", list(data.produtosUso)],
        ["Procedimento facial (3 meses)", yn(data.procedimentoFacial)],
        ["Alergia/sensibilidade cosmético", yn(data.alergiaCosmetico)],
        ["Bem-estar atual", list(data.bemEstar)],
      ],
    },
    {
      title: "Anamnese Complementar",
      rows: [
        ["Medicamentos controlados", data.medicamentosControlados || "—"],
        ["Tratamento médico atual", data.tratamentoMedicoAtual || "—"],
        ["Tratamento estético atual", data.tratamentoEsteticoAtual || "—"],
        ["Atividade física", data.atividadeFisica || "—"],
        ["Alergias", data.alergiasComplementar || "—"],
        ["Anticoagulantes", data.anticoagulantes || "—"],
        ["Problemas respiratórios", data.problemasRespiratorios || "—"],
        ["Diabetes", yn(data.diabetesComplementar)],
        ["Gestante/Lactante", yn(data.gestanteLactante)],
        ["Hepatite/Quelóide", yn(data.hepatiteQueloide)],
        ["Fumante", yn(data.fumanteComplementar)],
        ["Queixa principal", data.queixaPrincipal || "—"],
      ],
    },
    {
      title: "Termo de Responsabilidade",
      rows: [
        ["CPF", data.cpf],
        ["Local e data", data.localData],
        ["Aceite", data.aceiteTermo ? "Sim" : "Não"],
      ],
    },
  ];

  const htmlSections = sections
    .map(
      (s) => `
      <h2 style="color:#B8860B;font-size:16px;margin:24px 0 8px;border-bottom:1px solid #E8D5A3;padding-bottom:4px;">${s.title}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${s.rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:40%;">${label}</td>
            <td style="padding:6px 0;color:#333;vertical-align:top;">${value.replace(/\n/g, "<br>")}</td>
          </tr>`
          )
          .join("")}
      </table>`
    )
    .join("");

  const html = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;">
      <div style="text-align:center;padding:24px 0;border-bottom:2px solid #B8860B;">
        <h1 style="color:#B8860B;margin:0;font-size:24px;">Diamond HOF</h1>
        <p style="color:#888;margin:4px 0 0;font-size:12px;letter-spacing:2px;">ESTÉTICA INTEGRADA PREMIUM</p>
      </div>
      <p style="color:#666;font-size:13px;margin:16px 0;">Nova ficha de anamnese recebida em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
      ${htmlSections}
    </div>`;

  const text = sections
    .map(
      (s) =>
        `\n=== ${s.title} ===\n${s.rows.map(([l, v]) => `${l}: ${v}`).join("\n")}`
    )
    .join("\n");

  return { subject, html, text };
}
