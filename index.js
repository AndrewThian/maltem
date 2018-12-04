const Helper = {
    uuid: function() {
        return parseInt((new Date().getTime() / 1000).toFixed(0))
    }
}

const StickyNotes = {
    rootNode: document.querySelector("#board"),
    notes: [],
    init: function() {
        if (localStorage.getItem("notes")) {
            this.generateStickyNotes();
        }
    },
    // store notes into localstorage
    saveNotes: function () {
        localStorage.setItem("notes", JSON.stringify(this.notes))
    },
    getNotes: function () {
        return JSON.parse(localStorage.getItem("notes"));
    },
    generateStickyNotes: function () {
        this.notes = this.getNotes();
        this.notes.forEach(note => {
            this.createStickyNote(note)
        })
    },
    createStickyNote: function (data) {
        const HTMLString = `
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
    deleteStickyNote: function (data) {
        this.notes = this.notes.filter(note => note.uid !== data.uid )
        this.saveNotes();
        this.generateStickyNotes();
    }
}

StickyNotes.init();