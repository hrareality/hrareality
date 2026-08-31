/**
 * Sdílené HTML komponenty pro e-mailové šablony (api/_lib/email-templates.js) —
 * jednoduchý inline-styled obal, ať se nerozjede v e-mailových klientech
 * (žádné externí CSS, žádný flexbox/grid, jen tabulky a inline style).
 */

const BRAND_COLOR = "#111111";

export function wrapEmail(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="cs">
<body style="margin:0;padding:0;background:#f5f5f0;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:32px 28px;font-size:16px;line-height:1.65;">
${bodyHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Odstavec z prostého textu (zachová jednoduché zalomení uvnitř odstavce). */
export function p(text) {
  return `<p style="margin:0 0 16px;">${text.replace(/\n/g, "<br>")}</p>`;
}

/** Tučný "section header" — v dodaných textech psané VELKÝMI PÍSMENY. */
export function heading(text) {
  return `<p style="margin:24px 0 8px;font-weight:bold;letter-spacing:0.02em;">${text}</p>`;
}

export function ctaButton(label, url) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;"><tr><td style="background:${BRAND_COLOR};border-radius:6px;">
  <a href="${url}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">${label}</a>
</td></tr></table>`;
}

export function signatureBlock() {
  return p("Tomáš<br>Founder Hry Reality ∞");
}
