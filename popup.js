$("#generate").on("click", () => {
  function waitPageLoad(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs.shift();

      if (currentTab.status === "complete") {
        callback(currentTab);
      } else {
        setTimeout(() => {
          waitPageLoad(callback);
        }, 50);
      }
    });
  }

  waitPageLoad((currentTab) => {
    chrome.tabs.sendMessage(currentTab.id, null, function (response) {
      $("#log").val(response);
    });
  });
});

$("#copy").on("click", () => {
  $("#log").select()
  document.execCommand('copy')
});
