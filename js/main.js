// Grabbing the form and listening for submit
document.getElementById('form').addEventListener('submit', saveNote);

// Saves the notes, validates the input and pushing the info into local storage
function saveNote(e) {
   var title = document.getElementById('noteTitle').value;
   var message = document.getElementById('noteMessage').value;

   if (!validateForm(title, message)) {
      return false;
   }

   var note = {
      title: title,
      message: message
   }

   if (localStorage.getItem('notes') === null) {
      var notes = [];

      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
   } else {
      var notes = JSON.parse(localStorage.getItem('notes'));

      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
   }

   document.getElementById('form').reset();

   fetchNotes();

   e.preventDefault();
}

// Deletes the notes by comparing the message
function deleteNote(message) {
   var notes = JSON.parse(localStorage.getItem('notes'));

   for (var i = 0; i < notes.length; i++) {
      if (notes[i].message == message) {
         notes.splice(i, 1);
      }
   }

   localStorage.setItem('notes', JSON.stringify(notes));

   fetchNotes();
}

// Grabs the notes from local storage and renders them
function fetchNotes() {
   var notes = JSON.parse(localStorage.getItem('notes'));

   var notesOutput = document.getElementById('notesOutput');

   notesOutput.innerHTML = '';
   for (var i = 0; i < notes.length; i++) {
      var title = notes[i].title;
      var message = notes[i].message;

      notesOutput.innerHTML += '<div class="animated fadeIn note">'+
                               '<a onclick="deleteNote(\''+message+'\')" href="#">&#10006;</a>'+
                               '<h1>' +title+
                               '</h1>'+
                               '<p>'+message+
                               '</p>'+
                               '</div>';
   }
}

// Validates the form
function validateForm(title, message) {
   if (!title || !message) {
      alert('Please fill in the form...');
      return false;
   }

   return true;
}

// Initializing the smooth scroll function
var scroll = new SmoothScroll('a[href*="#"]',{
		header: '.navWrapper'
	});
