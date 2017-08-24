var buildEmbed = () => {
  let embedHtml;
  let list = document.getElementsByClassName('uk-list')[0].getElementsByClassName('slack-message');

  let title = document.getElementsByTagName('h3')[0].innerText;
  let page = document.URL;
  embedHtml = `<h4><a href="${page}">${title}</a></h4><hr><dl>`;

  for (let i = 0; i < list.length; i++) {
    // name
    let name = list[i].getElementsByClassName('slack-message-header-name')[0].innerText;
    embedHtml += `<dt>${name}</dt>`;

    // body
    let bodyNode = list[i].getElementsByClassName('slack-message-body')[0];
    let emojis = bodyNode.getElementsByClassName('emoji');
    for (let j = 0; j < emojis.length; j++) {
      let alt = document.createTextNode(emojis[j].alt);
      bodyNode.replaceChild(alt, emojis[j]);
    }

    let body = bodyNode.innerHTML;
    embedHtml += `<dd>${body}</dd>`;

    // cite
    let path      = list[i].getElementsByClassName('slack-message-header-date')[0].href;
    let timestamp = list[i].getElementsByClassName('slack-message-header-date')[0].innerText;
    let channel   = list[i].getElementsByClassName('slack-message-header-channel')[0].innerText;
    embedHtml += `<dd><sub><a href="${path}">${timestamp}</a> ${channel}</sub></dd>`;

    embedHtml += '<hr>';
  };

  embedHtml += '</dl>';

  return embedHtml;
};

// background からの messsage Listener
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  sendResponse({
    embed: buildEmbed()
  });
});
