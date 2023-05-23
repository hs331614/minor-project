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

    // Display message if no entries found for the selected date
    if (filteredEntries.length === 0) {
      const noEntriesMessage = document.createElement('p');
      noEntriesMessage.textContent = 'No entries found for the selected date';
      entriesList.appendChild(noEntriesMessage);
    } else {
      // Loop through the filtered entries and add them to the list
      filteredEntries.forEach(entry => {
        const entryElement = createEntryElement(entry);
        entriesList.appendChild(entryElement);
      });
    }
  } else {
    const noEntriesMessage = document.createElement('p');
    noEntriesMessage.textContent = 'No entries found';
    entriesList.appendChild(noEntriesMessage);
  }
}

// Function to create an entry element
function createEntryElement(entry) {
  const entryElement = document.createElement('li');
  entryElement.classList.add('entry');

  const entryDateElement = document.createElement('p');
  entryDateElement.classList.add('entry-date');
  entryDateElement.textContent = formatDate(entry.date);
  entryElement.appendChild(entryDateElement);

  const entryTextElement = document.createElement('p');
  entryTextElement.classList.add('entry-text');
  entryTextElement.innerHTML = entry.text.replace(/\n/g, '<br>');
  entryElement.appendChild(entryTextElement);

  const entryActionsElement = document.createElement('div');
  entryActionsElement.classList.add('entry-actions');

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    editJournalEntry(entry);
  });
  entryActionsElement.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteJournalEntry(entry);
  });
  entryActionsElement.appendChild(deleteButton);

  entryElement.appendChild(entryActionsElement);

  return entryElement;
}

// Function to edit a journal entry
function editJournalEntry(entry) {
  const journalTextArea = document.getElementById('journalTextArea');
  const datePicker = document.getElementById('datePicker');

  journalTextArea.value = entry.text;
  datePicker.value = entry.date;
}

// Function to delete a journal entry
function deleteJournalEntry(entry) {
  // Remove the entry from the array
  journalEntries = journalEntries.filter(item => item !== entry);

  // Save the updated array to local storage
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  
  // Reload the entries list
  loadJournalEntries();
  }
  
  // Format the date in a more styled format
  function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
  }
  
  // Add event listener to the form
  const journalForm = document.getElementById('journalForm');
  journalForm.addEventListener('submit', submitJournalEntry);
  
  // Add event listener to the "Load Entries" button
  const loadEntriesButton = document.getElementById('loadEntriesButton');
  loadEntriesButton.addEventListener('click', loadJournalEntries);
  
  // Load journal entries on page load
  loadJournalEntries();