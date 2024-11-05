// Editor JS

var editorIndex = 0;
var editors = [];

window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content loaded");
    
    // editorInit({ selector: '.editor' });
});

function editorInit({ selector = '.editor' } = {}) {
    document.querySelectorAll(selector).forEach(createEditor);
}

function createEditor(container) {
    let html = container.innerHTML.trim();
    let data = JSON.parse(html.slice(html.indexOf('{'), html.lastIndexOf('}') + 1));
    let editor = {
        data,
        index: editorIndex,
        add: () => {},
        remove: () => {}
    };
    
    container.dataset.index = editorIndex;
    container.id = "editor-" + editorIndex;
    container.classList.add('my-editor');
    editors.push(editor);
    editorIndex++;

    container.innerHTML = "";

    const section = createElement({ name: "section", id: 'editor-' + container.dataset.index, className: "the-editor"});
    const header = createElement({ name: "header", className: "the-header"});
    const main = createElement({ name: "main", className: "the-editable"});
    const footer = createElement({ name: "footer" });

    section.appendChild(header);
    section.appendChild(main);
    section.appendChild(footer);

    editor.data.forEach(element => {
        createBlock({
            element,
            parent: main
        });
    });

    return editor;
}

function getEditor(selector) {
    let index = NaN;
    if (selector instanceof HTMLElement) {
        index = parseInt(selector.dataset.index);
    } else if (typeof selector === 'string') {
        selector = document.querySelector(selector);
        index = selector ? parseInt(selector.dataset.index) : NaN;
    } else {
        console.warn('Unkown selector!!!');
    }

    if (isNaN(index)) return undefined;

    return editors[index];
}

function createBlock({ element, parent = undefined } = {}) {
    const type = element.type.trim().toLowerCase();
    const block = (type == 'container') 
        ? createContainer({element, parent})
        : createWidget({element, parent});
    if (parent) parent.appendChild(block);

    return block;
}

function createContainer({element, parent = undefined} = {}) {
    const elt = document.createElement()
}

function createElement({name = "div", id, className} = {}) {
    const element = document.createElement(name);
    if (id) element.id = id;
    if (className) {
        className = className.split(" ");
        className.map(item => element.classList.add(item));
    }

    return element;
}

// function editorInit({ selector = '.editor'} = {}) {
//     const editors = document.querySelectorAll(selector);
//     if (editors.length == 0) {

//         console.warn(`No editor found with selector "${selector}"`);
//         return;
//     }

//     console.log(`${editors.length} editor(s) found!`);

//     editors.forEach(editor => {
//         let editorContent = editor.innerHTML.trim();
//         editor = editor.slice(editorContent.indexOf('{'), editorContent.lastIndexOf('}') + 1);
//         try {
//             editorRender({
//                 editor,
//                 data: JSON.parse(editor.innerHTML)
//             });
//         } catch (error) {
//             console.error("Erreur de parsing JS: ", error);
//         }
//     });
// }

// function editorRender({editor, data}){
//     // vider le contenu de l'editor
//     editor.innerHTML = "";

//     editor.appendChild(createEditor());
//     // Construire les blocs
//     data.main.forEach()
// }

// function createEditor()
// {
//     const editor = document.createElement("section");
//     editor.classList.add('the-editor');

//     const header = createHeader();

//     return editor;
// }

// function createHeader()
// {
//     const header = document.createElement("header");

    
//     return header;
// }