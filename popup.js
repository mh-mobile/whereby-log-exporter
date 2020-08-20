$("#generate").on("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, null, function (response) {
      $("#log").val(response)
    })
  });
});

$("#copy").on("click", () => {
  $("#log").select()
  document.execCommand('copy')
});
