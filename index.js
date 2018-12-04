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
        this.rootNode.innerHTML = "";
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
    addStickyNote: function () {
        const newNote = {
            uid: Helper.uuid(),
            title: "",
            content: ""
        }
        this.notes = this.notes.concat(newNote)
        console.log(this.notes)
        this.saveNotes();
        this.generateStickyNotes();
    },
    deleteStickyNote: function (id) {
        this.notes = this.notes.filter(note => note.uid !== id )
        this.saveNotes();
        this.generateStickyNotes();
    },
    updateStickyData: function (id, data, type) {
        this.notes.forEach(note => {
            if (note.uid === id) {
                note[type] = data
            }
        })
        this.saveNotes();
    }
}

StickyNotes.init();

// edit each sticky note
StickyNotes.rootNode.addEventListener("keyup", e => {
    const stickynote = e.target.parentElement.parentElement
    const type = e.target.className
    const id = stickynote.dataset.id
    StickyNotes.updateStickyData(parseInt(id, 10), e.target.value, type)
})

// delete each sticky note
StickyNotes.rootNode.addEventListener("click", e => {
    if (e.target.id === "remove") {
        const stickynote = e.target.parentNode
        const id = stickynote.dataset.id
        StickyNotes.deleteStickyNote(parseInt(id, 10))
    }
})

// add each sticky note