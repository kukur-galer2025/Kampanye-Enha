const fs = require('fs');
let html = fs.readFileSync('d:/laragon/www/kampanye/dekan_data_center_monitoring/index.html', 'utf8');

// Extract the body content (inside <div class="app-shell">)
const match = html.match(/<div class="app-shell">([\s\S]*?)<\/div>\s*<div class="toast"/);
let bodyContent = match ? `<div className="app-shell">${match[1]}</div>` : html;
const toastContent = `<div className="toast" id="toast"></div><div className="modal-backdrop" id="modal-backdrop"><div className="modal"><button className="modal-close" id="modal-close">×</button><div id="modal-content"></div></div></div>`;

bodyContent = bodyContent + toastContent;

// HTML to JSX replacements
bodyContent = bodyContent
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<input(.*?)>/g, (m) => m.endsWith('/>') ? m : m.replace('>', '/>'))
  .replace(/<img(.*?)>/g, (m) => m.endsWith('/>') ? m : m.replace('>', '/>'))
  .replace(/<br>/g, '<br/>')
  .replace(/<hr>/g, '<hr/>')
  .replace(/style="([^"]*)"/g, (m, p1) => {
    // Basic style converter for style="--value:86" -> style={{'--value': 86}}
    const parts = p1.split(';').filter(Boolean);
    const obj = parts.map(p => {
      let [k, v] = p.split(':');
      k = k.trim(); v = v.trim();
      if (k.startsWith('--')) {
         return `'${k}': '${v}'`;
      }
      k = k.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `${k}: '${v}'`;
    });
    return `style={{${obj.join(', ')}}}`;
  });

const jsx = `"use client";
import Script from "next/script";

export default function Dashboard() {
  return (
    <>
      ${bodyContent}
      <Script src="/dashboard-app.js" strategy="lazyOnload" />
    </>
  );
}`;

fs.writeFileSync('d:/laragon/www/kampanye/kampanye-enha/src/app/(dashboard)/dashboard/page.js', jsx);
console.log('Conversion complete.');
