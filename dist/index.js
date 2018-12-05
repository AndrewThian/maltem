;(function() {
  const Helper = {
    uuid: () => parseInt(new Date().getTime())
  }

  class StickyNotes {
    constructor() {
      this.notes = []
      this.rootNode = document.querySelector('#board')
      this.addButton = document.querySelector('#add')
      this.searchBar = document.forms['search-notes'].querySelector('input')

      if (localStorage.getItem('notes')) this.generateStickyNotes()
      this.bindUIEvents()
    }
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
    getNotes() {
      return JSON.parse(localStorage.getItem('notes'))
    }
    generateStickyNotes() {
      this.notes = this.getNotes()
      this.rootNode.innerHTML = ''
      this.notes.forEach(note => this.createStickyNote(note))
    }
    createStickyNote(data) {
      const HTMLString = `
                <div class="note" id="note-${data.uid}" data-id=${data.uid}>
                    <button class="note-button remove" id="remove">X</button>
                    <div class="note-content">
                        <textarea class="title" placeholder="Enter title">${
                          data.title
                        }</textarea>
                        <textarea class="content" placeholder="Enter content...">${
                          data.content
                        }</textarea>
                    </div>
                </div>
            `
      this.rootNode.innerHTML += HTMLString
    }
    addStickyNote() {
      const newNote = {
        uid: Helper.uuid(),
        title: '',
        content: ''
      }
      this.notes = this.notes.concat(newNote)
      this.saveNotes()
      this.generateStickyNotes()
    }
    deleteStickyNote(id) {
      this.notes = this.notes.filter(note => note.uid !== id)
      this.saveNotes()
      this.generateStickyNotes()
    }
    updateStickyData(id, data, type) {
      this.notes.forEach(note => {
        if (note.uid === id) note[type] = data
      })
      this.saveNotes()
    }
    bindUIEvents() {
      this.rootNode.addEventListener('keyup', e => {
        const stickynote = e.target.parentElement.parentElement
        const type = e.target.className
        const id = stickynote.dataset.id
        this.updateStickyData(parseInt(id, 10), e.target.value, type)
      })
      this.rootNode.addEventListener('click', e => {
        if (e.target.id === 'remove') {
          const stickynote = e.target.parentNode
          const id = stickynote.dataset.id
          this.deleteStickyNote(parseInt(id, 10))
        }
      })
      this.addButton.addEventListener('click', e => {
        if (e.target.id === 'add') this.addStickyNote()
      })
      this.searchBar.addEventListener('keyup', e => {
        const term = e.target.value.toLowerCase()
        const notes = this.rootNode.getElementsByClassName('note')
        Array.from(notes).forEach(note => {
          const title = note.childNodes[3].childNodes[1].value.toLowerCase()
          note.style.display = title.indexOf(term) != -1 ? 'block' : 'none'
        })
      })
    }
  }

  new StickyNotes()
})()
