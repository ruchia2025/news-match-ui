async function searchNews() {
  const text = document.getElementById('diary').value;
  const response = await fetch(
    'https://news-match-api.maisugimoto2003.workers.dev/api/nearest-news?text=' + encodeURIComponent(text)
  );
  const data = await response.json();

  const resultDiv = document.getElementById('result');
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
}
