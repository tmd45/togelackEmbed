// クリップボードに保存したことを通知する
let notice = () => {
  chrome.browserAction.setBadgeText({ text: 'OK' });
};

// see http://qiita.com/ororog/items/146b7cdac85a48690c1e
let saveToClipboard = embed => {
  // copy 用に textarea を作る
  let textArea = document.createElement('textarea');
  textArea.style.cssText = "position:absolute;left:-100%";
  document.body.appendChild(textArea);

  textArea.value = embed;
  textArea.select();
  document.execCommand('copy');
  notice();

  document.body.removeChild(textArea);
};

// content script (scrape.js) を呼んで結果を callback に得る
let scrapeTogelack = tabId => {
  chrome.tabs.sendMessage(tabId, {}, function (res) {
    let embedHtml = res.embed;
    saveToClipboard(embedHtml);
  });
};

// browserAction (add-on のアイコン) がクリックされたら
chrome.browserAction.onClicked.addListener(function (tab) {
  scrapeTogelack(tab.id);
});

// ページをリロードしたら badge をリセットする
chrome.tabs.onUpdated.addListener(function () {
  chrome.browserAction.setBadgeText({ text: '' });
});
