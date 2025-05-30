async function searchNews() {
  const text = document.getElementById('diary').value;
  const resultDiv = document.getElementById('result');

  if (!text.trim()) {
    resultDiv.innerHTML = '⚠️ 入力してください。';
    return;
  }

  resultDiv.innerHTML = '🔍 検索中...';

  try {
    const response = await fetch(
      'https://news-match-api.maisugimoto2003.workers.dev/api/nearest-news?text=' + encodeURIComponent(text)
    );
    const data = await response.json();
    resultDiv.innerHTML = '';

    if (data.matches.length === 0) {
      resultDiv.textContent = '関連ニュースは見つかりませんでした。';
      return;
    }

    data.matches.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${item.title}</strong><br><p>${item.body.slice(0, 100)}...</p><hr/>`;
      resultDiv.appendChild(div);
    });
  } catch (error) {
    console.error("⚠️ API呼び出し失敗", error);
    resultDiv.innerHTML = '⚠️ エラーが発生しました。';
  }
}
