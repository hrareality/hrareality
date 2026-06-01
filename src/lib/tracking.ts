/**
 * Dynamické spouštění analytických a reklamních skriptů po udělení souhlasu (GDPR Opt-In).
 */
export function initTracking() {
  if (typeof window === "undefined") return;

  // 1. Inicializace Google Analytics
  if (!document.getElementById("google-tag-manager")) {
    const gaScript = document.createElement("script");
    gaScript.id = "google-tag-manager";
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6F9R9TNE28";
    document.head.appendChild(gaScript);

    const gaInit = document.createElement("script");
    gaInit.id = "google-analytics-init";
    gaInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-6F9R9TNE28');
    `;
    document.head.appendChild(gaInit);
  }

  // 2. Inicializace Meta Pixel Code
  if (!document.getElementById("meta-pixel-script")) {
    const fbScript = document.createElement("script");
    fbScript.id = "meta-pixel-script";
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1474007570872661');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);
  }
}
