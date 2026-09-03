import type { AppLocale } from "@/i18n/routing";

// WS-013 (Report Hub) -- "what happened over a period", distinct from the
// Dashboard's "what's the situation now" (WS-009/WS-010). Every number
// shown on this page comes straight from WS-012's 4 endpoints; this file
// only carries copy, never a computed value.
export interface ReportsContent {
  title: string;
  subtitle: string;
  period: {
    today: string;
    last7Days: string;
    last30Days: string;
    custom: string;
    customFrom: string;
    customTo: string;
    apply: string;
  };
  summary: {
    title: string;
    transactionCount: string;
    success: string;
    failed: string;
    pending: string;
    cancelled: string;
    successRate: string;
    successRateUnavailable: string;
  };
  financial: {
    title: string;
    volume: string;
    fees: string;
    commissions: string;
    empty: string;
  };
  trend: {
    title: string;
    empty: string;
  };
  table: {
    title: string;
    columns: {
      date: string;
      type: string;
      status: string;
      amount: string;
      station: string;
      reference: string;
    };
    empty: string;
    restricted: string;
    nextPage: string;
    previousPage: string;
    stationUnavailable: string;
  };
  filters: {
    title: string;
    status: string;
    allStatuses: string;
    transactionType: string;
    transactionTypePlaceholder: string;
    currency: string;
    allCurrencies: string;
    apply: string;
    clear: string;
  };
  exportCsv: {
    button: string;
  };
  error: string;
}

export function getReportsContent(locale: AppLocale): ReportsContent {
  if (locale === "fr") {
    return {
      title: "Rapports",
      subtitle: "Historique et analyse des transactions",
      period: {
        today: "Aujourd'hui",
        last7Days: "7 jours",
        last30Days: "30 jours",
        custom: "Personnalisé",
        customFrom: "Du",
        customTo: "Au",
        apply: "Appliquer",
      },
      summary: {
        title: "Résumé",
        transactionCount: "Transactions",
        success: "Réussies",
        failed: "Échouées",
        pending: "En attente",
        cancelled: "Annulées",
        successRate: "Taux de réussite",
        successRateUnavailable: "Indisponible",
      },
      financial: {
        title: "Vue financière",
        volume: "Volume",
        fees: "Frais",
        commissions: "Commissions",
        empty: "Aucune donnée financière pour cette période.",
      },
      trend: {
        title: "Tendance des transactions",
        empty: "Aucune tendance pour cette période.",
      },
      table: {
        title: "Transactions",
        columns: {
          date: "Date",
          type: "Type",
          status: "Statut",
          amount: "Montant",
          station: "Station",
          reference: "Référence",
        },
        empty: "Aucune transaction pour cette période.",
        restricted: "Vous n'avez pas accès à l'historique des transactions.",
        nextPage: "Page suivante",
        previousPage: "Page précédente",
        stationUnavailable: "—",
      },
      filters: {
        title: "Filtres",
        status: "Statut",
        allStatuses: "Tous les statuts",
        transactionType: "Type de transaction",
        transactionTypePlaceholder: "ex. CASH_IN",
        currency: "Devise",
        allCurrencies: "Toutes les devises",
        apply: "Filtrer",
        clear: "Réinitialiser",
      },
      exportCsv: {
        button: "Exporter en CSV",
      },
      error: "Une erreur est survenue. Réessayez.",
    };
  }
  return {
    title: "Reports",
    subtitle: "Historical reporting & transaction analysis",
    period: {
      today: "Today",
      last7Days: "7 days",
      last30Days: "30 days",
      custom: "Custom",
      customFrom: "From",
      customTo: "To",
      apply: "Apply",
    },
    summary: {
      title: "Summary",
      transactionCount: "Transactions",
      success: "Success",
      failed: "Failed",
      pending: "Pending",
      cancelled: "Cancelled",
      successRate: "Success rate",
      successRateUnavailable: "Unavailable",
    },
    financial: {
      title: "Financial Overview",
      volume: "Volume",
      fees: "Fees",
      commissions: "Commissions",
      empty: "No financial data for this period.",
    },
    trend: {
      title: "Transaction Trend",
      empty: "No trend data for this period.",
    },
    table: {
      title: "Transactions",
      columns: {
        date: "Date",
        type: "Type",
        status: "Status",
        amount: "Amount",
        station: "Station",
        reference: "Reference",
      },
      empty: "No transactions for this period.",
      restricted: "You don't have access to transaction history.",
      nextPage: "Next page",
      previousPage: "Previous page",
      stationUnavailable: "—",
    },
    filters: {
      title: "Filters",
      status: "Status",
      allStatuses: "All statuses",
      transactionType: "Transaction type",
      transactionTypePlaceholder: "e.g. CASH_IN",
      currency: "Currency",
      allCurrencies: "All currencies",
      apply: "Filter",
      clear: "Clear",
    },
    exportCsv: {
      button: "Export CSV",
    },
    error: "Something went wrong. Try again.",
  };
}
