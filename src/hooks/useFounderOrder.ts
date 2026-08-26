import { useQuery } from "@tanstack/react-query";

export interface FounderOrderData {
  firstName: string;
  package: string;
  pricePaid: number;
  paymentStatus: string;
  orderNumber: string;
  email: string;
  founderNumber: number | null;
  founderNumberDisplay: string | null;
  discordUsername: string | null;
  discordJoinedAt: string | null;
  isUpgrade: boolean;
  founderWallChoice: string | null;
  founderWallDisplayName: string | null;
  founderWallConsent: boolean;
}

/**
 * Načte data objednávky podle bezpečného tokenu z URL (?t=...).
 * Token se nikdy neověřuje na klientovi — jen server (api/founder/get-order) zná
 * FOUNDER_TOKEN_SECRET, viz docs/founder-membership/security-and-access.md.
 */
export function useFounderOrder(token: string | null) {
  return useQuery<FounderOrderData>({
    queryKey: ["founder-order", token],
    queryFn: async () => {
      const res = await fetch(`/api/founder/get-order?t=${encodeURIComponent(token!)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "order_fetch_failed");
      }
      return res.json();
    },
    enabled: !!token,
    retry: false,
    staleTime: 30_000,
  });
}
