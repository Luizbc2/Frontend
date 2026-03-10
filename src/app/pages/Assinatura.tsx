import { Check, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: "R$ 49",
    annualPrice: "R$ 490",
    description: "Para começar",
    features: [
      { text: "1 profissional", included: true },
      { text: "Agenda básica", included: true },
      { text: "100 agendamentos/mês", included: true },
      { text: "Relatórios básicos", included: true },
      { text: "WhatsApp integrado", included: false },
      { text: "Google Calendar", included: false },
      { text: "Múltiplas unidades", included: false },
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "R$ 99",
    annualPrice: "R$ 990",
    description: "Mais popular",
    popular: true,
    features: [
      { text: "Até 5 profissionais", included: true },
      { text: "Agenda completa", included: true },
      { text: "Agendamentos ilimitados", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "WhatsApp integrado", included: true },
      { text: "Google Calendar", included: true },
      { text: "Múltiplas unidades", included: false },
    ],
  },
  {
    name: "Business",
    monthlyPrice: "R$ 199",
    annualPrice: "R$ 1.990",
    description: "Para crescer",
    features: [
      { text: "Profissionais ilimitados", included: true },
      { text: "Agenda completa", included: true },
      { text: "Agendamentos ilimitados", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "WhatsApp integrado", included: true },
      { text: "Google Calendar", included: true },
      { text: "Múltiplas unidades", included: true },
    ],
  },
];

export function Assinatura() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">CRESCIMENTO &gt; ASSINATURA</p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-lg shadow-sm p-1">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-md text-sm transition-colors ${
              billingPeriod === "monthly"
                ? "bg-[#4a9d9d] text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-6 py-2 rounded-md text-sm transition-colors ${
              billingPeriod === "annual"
                ? "bg-[#4a9d9d] text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Anual
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              -17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg shadow-sm overflow-hidden ${
              plan.popular ? "ring-2 ring-[#4a9d9d]" : ""
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              {plan.popular && (
                <div className="mb-2">
                  <span className="px-3 py-1 bg-[#4a9d9d] text-white rounded-full text-xs">
                    Mais Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-4">
                <span className="text-4xl">
                  {billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-gray-600 ml-2">
                  /{billingPeriod === "monthly" ? "mês" : "ano"}
                </span>
              </div>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#4a9d9d] hover:bg-[#3d8585] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                Escolher Plano
              </Button>
            </div>

            {/* Features */}
            <div className="p-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-[#4a9d9d] flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ or Additional Info */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg mb-4">Perguntas Frequentes</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="mb-2">
                <strong>Posso mudar de plano a qualquer momento?</strong>
              </p>
              <p>
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Como funciona o período de teste?</strong>
              </p>
              <p>
                Todos os planos incluem 14 dias de teste grátis, sem necessidade de cartão de crédito.
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Posso cancelar a qualquer momento?</strong>
              </p>
              <p>
                Sim, você pode cancelar sua assinatura a qualquer momento sem multas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
