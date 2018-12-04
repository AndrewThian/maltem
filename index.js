const Helper = {
    uuid: function() {
        return parseInt((new Date().getTime() / 1000).toFixed(0))
    }
}

const StickyNotes = {
    rootNode: document.querySelector("#board"),
    notesData: localStorage.getItem("notes"),
    notes: [],
    init: function() {
        if (!this.notesData) {
            // insert first empty note
            this.insertFirstNote();
        }
        this.generateStickyNotes();
    },
    // insert first empty note into localstorage if there are none
    insertFirstNote: function() {
        this.notesData = [ { uid: Helper.uuid(), title: "", content: "" } ]
        this.saveNotes();
    },
    // store notes into localstorage
    saveNotes: function () {
        localStorage.setItem("notes", JSON.stringify(this.notesData))
    },
    generateStickyNotes: function () {
        this.notesData = localStorage.getItem("notes");
        this.notes = JSON.parse(this.notesData);
        this.notes.forEach(note => {
            console.log("running")
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
    }
}

StickyNotes.init();