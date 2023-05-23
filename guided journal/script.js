function addEntry() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/add-entry");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("title=" + title + "&content=" + content);
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        var entry = document.createElement("li");
        entry.textContent = title;
        document.getElementById("entries").appendChild(entry);
  
        // Save the entry in local storage
        localStorage.setItem("entries", JSON.stringify(entries));
      }
    };
  }
  
  function checkPreviousDateEntries() {
    var dateRange = document.getElementById("date-range").value;
  
    var entries = JSON.parse(localStorage.getItem("entries"));
  
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
  
      var li = document.createElement("li");
      li.textContent = entry.title;
      document.getElementById("entries").appendChild(li);
    }
  }
  