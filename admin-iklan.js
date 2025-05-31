async function loadIklan() {
  const res = await fetch('/iklan.json');
  const iklan = await res.json();
  const list = document.getElementById('iklanList');
  list.innerHTML = iklan.length ? iklan.map((ik, idx) => `
    <div style="border:1px solid #ffb71b;padding:8px;margin:5px 0;">
      <span>${ik.text}</span>
      <button onclick="deleteIklan(${idx})" style="float:right;">Hapus</button>
    </div>
  `).join('') : "<i>Belum ada iklan</i>";
}
async function tambahIklan(e) {
  e.preventDefault();
  const text = document.getElementById('iklanText').value.trim();
  if (!text) return;
  await fetch('/iklan.json', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text, time: Date.now() })
  });
  document.getElementById('iklanText').value = "";
  loadIklan();
}
async function deleteIklan(idx) {
  await fetch('/iklan.json', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ deleteIdx: idx })
  });
  loadIklan();
}
document.getElementById('iklanForm').onsubmit = tambahIklan;
loadIklan();
