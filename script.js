document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("queryInput").value.trim();
  const container = document.getElementById("results");

  if (!query) {
    container.innerHTML = "<p>検索語を入力してください。</p>";
    return;
  }

  const apiUrl = `https://news-match-api.maisugimoto2003.workers.dev/api/nearest-news?text=${encodeURIComponent(query)}&limit=5`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log("🎯 API結果:", data);
      if (data.matches.length === 0) {
        container.innerHTML = `<p>関連ニュースは見つかりませんでした。</p>`;
      } else {
        container.innerHTML = data.matches.map(match => `
          <div class="card">
            <h3>${match.title}</h3>
            <p>${match.body.substring(0, 120)}...</p>
          </div>
        `).join('');
      }
    })
    .catch(err => {
      console.error("⚠️ API呼び出し失敗", err);
      container.innerHTML = "<p>エラーが発生しました。</p>";
    });
});
