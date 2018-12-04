const Helper = {
    uuid: function() {
        return parseInt((new Date().getTime() / 1000).toFixed(0))
    }
}

const StickyNotes = {
    notesData: localStorage.getItem("notes"),
    notes: [],
    init: function() {
        if (this.notesData) {
            // set notes data
            // generate sticky notes
            this.generateStickyNotes();
        } else {
            // create first empty note
            this.insertFirstNote();
        }
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
        
        const rootNode = document.querySelector("#board")
        rootNode.innerHTML = "";
        this.notes.forEach(note => {
            // create note item
        })
    }
}

StickyNotes.init();