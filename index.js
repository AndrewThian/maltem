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
        } else {
            // create first empty note
            this.insertFirstNote();
        }
    },
    insertFirstNote: function() {
        this.notesData = [ { uid: Helper.uuid(), title: "", content: "" } ]
        this.saveNotes();
    },
    saveNotes: function () {
        localStorage.setItem("notes", JSON.stringify(this.notesData))
    }
}

StickyNotes.init();