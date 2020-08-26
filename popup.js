$("#generate").on("click", () => {
  function waitPageLoad(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs.shift();
      if (currentTab.status === 'complete') {
        callback(currentTab)
      } else {
        setTimeout(() => {
          waitPageLoad(callback)
        }, 100)
      }
    })
  }

  function ping(currentTab) {
    chrome.tabs.sendMessage(currentTab.id, null, function (response) {
      if (chrome.runtime.lastError) {
        setTimeout(() => {
          ping(currentTab)
        }, 1000)
      } else {
        if (response) {
          $("#log").val(response)
        }
      }
    });
  }

  waitPageLoad((currentTab) => {
    ping(currentTab)
  })
});

$("#copy").on("click", () => {
  $("#log").select()
  document.execCommand('copy')
});
