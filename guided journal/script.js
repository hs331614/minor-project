// Array to store journal entries
let journalEntries = [];

// Function to submit a journal entry
function submitJournalEntry(event) {
  event.preventDefault();

  // Get the journal text from the textarea
  const journalText = document.getElementById('journalTextArea').value.trim();

  if (journalText !== '') {
    // Get the selected date from the date picker
    const selectedDate = document.getElementById('datePicker').value;

    // Add the journal entry to the array
    const entry = {
      date: selectedDate,
      text: journalText
    };
    journalEntries.push(entry);

    // Clear the form
    document.getElementById('journalTextArea').value = '';

    // Save the journal entries to local storage
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

    // Reload the entries list
    loadJournalEntries();
  }
}

// Function to load journal entries for a specific date
function loadJournalEntries() {
  // Clear the entries list
  const entriesList = document.getElementById('entriesList');
  entriesList.innerHTML = '';

  // Get the selected date from the date picker
  const selectedDate = document.getElementById('datePicker').value;

  // Load the entries from local storage
  const storedEntries = localStorage.getItem('journalEntries');
  if (storedEntries) {
    journalEntries = JSON.parse(storedEntries);

    // Filter the entries based on the selected date
    const filteredEntries = journalEntries.filter(entry => entry.date === selectedDate);

    // Check if there are any entries for the selected date
    if (filteredEntries.length === 0) {
      const noEntriesMessage = document.createElement('p');
      noEntriesMessage.id = 'noEntriesMessage';
      noEntriesMessage.textContent = 'No entries available for the selected date.';
      entriesList.appendChild(noEntriesMessage);
    } else {
      // Loop through the filtered entries and add them to the list
      for (let i = 0; i < filteredEntries.length; i++) {
        const entry = filteredEntries[i];

        // Create the entry element
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal-entry');

        // Create the entry date element
        const entryDateElement = document.createElement('p');
        entryDateElement.classList.add('journal-entry-date');
        entryDateElement.textContent = entry.date;
        entryElement.appendChild(entryDateElement);

        // Create the entry text element
        const entryTextElement = document.createElement('p');
        entryTextElement.classList.add('journal-entry-text');
        entryTextElement.textContent = entry.text;
        entryElement.appendChild(entryTextElement);

        // Create the entry actions element
        const entryActionsElement = document.createElement('div');
        entryActionsElement.classList.add('entry-actions');

        // Create the edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
          editJournalEntry(entry);
        });
        entryActionsElement.appendChild(editButton);

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
          deleteJournalEntry(entry);
        });
        entryActionsElement.appendChild(deleteButton);

        entryElement.appendChild(entryActionsElement);

        entriesList.appendChild(entryElement);
      }
    }
  }
}


// // Function to load journal entries for a specific date
// function loadJournalEntries() {
//   // Clear the entries list
//   const entriesList = document.getElementById('entriesList');
//   entriesList.innerHTML = '';

//   // Get the selected date from the date picker
//   const selectedDate = document.getElementById('datePicker').value;

//   // Load the entries from local storage
//   const storedEntries = localStorage.getItem('journalEntries');
//   if (storedEntries) {
//     journalEntries = JSON.parse(storedEntries);

//     // Filter the entries based on the selected date
//     const filteredEntries = journalEntries.filter(entry => entry.date === selectedDate);

//     // Check if there are any entries for the selected date
//     if (filteredEntries.length === 0) {
//       entriesList.innerHTML = '<p id="noEntriesMessage">No entries available for the selected date.</p>';
//     } else {
//       // Loop through the filtered entries and add them to the list
//       for (let i = 0; i < filteredEntries.length; i++) {
//         const entry = filteredEntries[i];

//         // Create the entry element
//         const entryElement = document.createElement('div');
//         entryElement.classList.add('journal-entry');

//         // Create the entry date element
//         entryElement.innerHTML += `<p class="journal-entry-date">${entry.date}</p>`;

//         // Create the entry text element
//         entryElement.innerHTML += `<p class="journal-entry-text">${entry.text}</p>`;

//         // Create the entry actions element
//         const entryActionsElement = document.createElement('div');
//         entryActionsElement.classList.add('entry-actions');

//         // Create the edit button
//         entryActionsElement.innerHTML += `<button class="edit-button" onclick="editJournalEntry(${JSON.stringify(
//           entry
//         )})">Edit</button>`;

//         // Create the delete button
//         entryActionsElement.innerHTML += `<button class="delete-button" onclick="deleteJournalEntry(${JSON.stringify(
//           entry
//         )})">Delete</button>`;

//         entryElement.appendChild(entryActionsElement);

//         entriesList.appendChild(entryElement);
//       }
//     }
//   }
// }

// Function to edit a journal entry
function editJournalEntry(entry) {
  // Set the journal text and date in the form
  document.getElementById('journalTextArea').value = entry.text;
  document.getElementById('datePicker').value = entry.date;
  
  // Remove the entry from the array
  journalEntries = journalEntries.filter(item => item !== entry);
  
  // Save the updated entries to local storage
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  
  // Reload the entries list
  loadJournalEntries();
  }
  
  // Function to delete a journal entry
  function deleteJournalEntry(entry) {
  // Remove the entry from the array
  journalEntries = journalEntries.filter(item => item !== entry);
  
  // Save the updated entries to local storage
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  
  // Reload the entries list
  loadJournalEntries();
  }
  
  // Add event listener to the form
  const journalForm = document.getElementById('journalForm');
  journalForm.addEventListener('submit', submitJournalEntry);
  
  // Add event listener to the "Load Entries" button
  const loadEntriesButton = document.getElementById('loadEntriesButton');
  loadEntriesButton.addEventListener('click', loadJournalEntries);
  
  // Load journal entries on page load
  loadJournalEntries();







































































// // Array to store journal entries
// let journalEntries = [];

// // Function to submit a journal entry
// function submitJournalEntry(event) {
//   event.preventDefault();

//   // Get the journal text from the textarea
//   const journalText = document.getElementById('journalTextArea').value.trim();

//   if (journalText !== '') {
//     // Get the selected date from the date picker
//     const selectedDate = document.getElementById('datePicker').value;

//     // Add the journal entry to the array
//     const entry = {
//       date: selectedDate,
//       text: journalText
//     };
//     journalEntries.push(entry);

//     // Clear the form
//     document.getElementById('journalTextArea').value = '';

//     // Save the journal entries to local storage
//     localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
//   }
// }

// // Function to load journal entries for a specific date
// function loadJournalEntries() {
//   // Clear the entries list
//   const entriesList = document.getElementById('entriesList');
//   entriesList.innerHTML = '';

//   // Get the selected date from the date picker
//   const selectedDate = document.getElementById('datePicker').value;

//   // Load the entries from local storage
//   const storedEntries = localStorage.getItem('journalEntries');
//   if (storedEntries) {
//     journalEntries = JSON.parse(storedEntries);

//     // Filter the entries based on the selected date
//     const filteredEntries = journalEntries.filter(entry => entry.date === selectedDate);

//     // Loop through the filtered entries and add them to the list
//     for (let i = 0; i < filteredEntries.length; i++) {
//       const entry = filteredEntries[i];

//       // Create the entry element
//       const entryElement = document.createElement('li');

//       // Create the entry date element
//       const entryDateElement = document.createElement('p');
//       entryDateElement.classList.add('entry-date');
//       entryDateElement.textContent = entry.date;
//       entryElement.appendChild(entryDateElement);

//       // Create the entry text element
//       const entryTextElement = document.createElement('p');
//       entryTextElement.innerHTML = entry.text.replace(/\n/g, '<br>');
//       entryElement.appendChild(entryTextElement);

//       // Create the entry actions element
//       const entryActionsElement = document.createElement('div');
//       entryActionsElement.classList.add('entry-actions');

//       // Create the edit button
//       const editBtnElement = document.createElement('button');
//       editBtnElement.textContent = 'Edit';
//       editBtnElement.addEventListener('click', function() {
//         editJournalEntry(entry);
//       });
//       entryActionsElement.appendChild(editBtnElement);

//       // Create the delete button
//       const deleteBtnElement = document.createElement('button');
//       deleteBtnElement.textContent = 'Delete';
//       deleteBtnElement.addEventListener('click', function() {
//         deleteJournalEntry(entry);
//       });
//       entryActionsElement.appendChild(deleteBtnElement);

//       entryElement.appendChild(entryActionsElement);

//       entriesList.appendChild(entryElement);
//     }
//   }
// }

// // Function to edit a journal entry
// function editJournalEntry(entry) {
//   const journalTextArea = document.getElementById('journalTextArea');
//   const datePicker = document.getElementById('datePicker');

//   journalTextArea.value = entry.text;
//   datePicker.value = entry.date;
// }

// // Function to delete a journal entry
// function deleteJournalEntry(entry) {
//   // Remove the entry from the array
//   journalEntries = journalEntries.filter(item => item !== entry);

//   // Save the updated array to local storage
//   localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

//   // Reload the entries list
//   loadJournalEntries();
// }

// // Add event listener to theform
// const journalForm = document.getElementById('journalForm');
// journalForm.addEventListener('submit', submitJournalEntry);

// // Add event listener to the "Load Entries" button
// const loadEntriesButton = document.getElementById('loadEntriesButton');
// loadEntriesButton.addEventListener('click', loadJournalEntries);

// // Load journal entries on page load
// loadJournalEntries();




