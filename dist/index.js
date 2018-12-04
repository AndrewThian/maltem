(function () {
    var Helper = {
        uuid: function() {
            return parseInt((new Date().getTime() / 1000).toFixed(0))
        }
    }
    
    var StickyNotes = {
        searcBar: document.forms["search-notes"].querySelector("input"),
        addButon: document.querySelector("#add"),
        rootNode: document.querySelector("#board"),
        notes: [],
        init: function() {
            if (localStorage.getItem("notes")) {
                this.generateStickyNotes();
            }
            this.bindUIEvents();
        },
        // store notes into localstorage
        saveNotes: function () {
            localStorage.setItem("notes", JSON.stringify(this.notes))
        },
        // retrieves notes from localstorage
        getNotes: function () {
            return JSON.parse(localStorage.getItem("notes"));
        },
        // regenerate all dom nodes with sticknotes data
        generateStickyNotes: function () {
            this.notes = this.getNotes();
            this.rootNode.innerHTML = "";
            this.notes.forEach(note => {
                this.createStickyNote(note)
            })
        },
        // creating each individual dom node
        createStickyNote: function (data) {
            var HTMLString = `
                <div class="note" id="note-${data.uid}" data-id=${data.uid}>
                    <button class="note-button remove" id="remove">X</button>
                    <div class="note-content">
                        <textarea class="title" placeholder="Enter title">${data.title}</textarea>
                        <textarea class="content" placeholder="Enter content...">${data.content}</textarea>
                    </div>
                </div>
            `
            this.rootNode.innerHTML += HTMLString
        },
        addStickyNote: function () {
            var newNote = {
                uid: Helper.uuid(),
                title: "",
                content: ""
            }
            this.notes = this.notes.concat(newNote)
            this.saveNotes();
            this.generateStickyNotes();
        },
        deleteStickyNote: function (id) {
            this.notes = this.notes.filter(function(note) {
                return note.uid !== id
            })
            this.saveNotes();
            this.generateStickyNotes();
        },
        updateStickyData: function (id, data, type) {
            this.notes.forEach(function (note) {
                if (note.uid === id) {
                    note[type] = data
                }
            })
            this.saveNotes();
        },
        bindUIEvents: function () {
            // edit each sticky note
            StickyNotes.rootNode.addEventListener("keyup", function(e) {
                var stickynote = e.target.parentElement.parentElement
                var type = e.target.className
                var id = stickynote.dataset.id
                StickyNotes.updateStickyData(parseInt(id, 10), e.target.value, type)
            })
            // delete each sticky note
            StickyNotes.rootNode.addEventListener("click", function(e) {
                if (e.target.id === "remove") {
                    var stickynote = e.target.parentNode
                    var id = stickynote.dataset.id
                    StickyNotes.deleteStickyNote(parseInt(id, 10))
                }
            })
            // add each sticky note
            StickyNotes.addButon.addEventListener("click", function(e) {
                if (e.target.id === "add") {
                    StickyNotes.addStickyNote();
                }
            })
            // filter sticky note
            StickyNotes.searcBar.addEventListener("keyup", function(e) {
                var term = e.target.value.toLowerCase();
                var notes = StickyNotes.rootNode.getElementsByClassName("note")
                Array.from(notes).forEach(function (note) {
                    var title = note.childNodes[3].childNodes[1].value
                    if (title.toLowerCase().indexOf(term) != -1) {
                        note.style.display = "block"
                    } else {
                        note.style.display = "none";
                    }
                })
            })
        }
    }
    
    StickyNotes.init();
})()