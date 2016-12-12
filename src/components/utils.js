import striptags from 'striptags';

export function removeStyle(html) {
  return html.replace(/ style="[a-zA-Z0-9:;.\s()\-,&!]*"/g, '');
}

export function plainText(value) {
  return striptags(value).replace(/&nbsp;/g, ' ');
}

export function getInputValueLength(value) {
  return plainText(value).length;
}

// Ref: http://stackoverflow.com/questions/3597116/insert-html-after-a-selection<Paste>
export function replaceSelectedNode(html) {
  let sel;
  let range;
  let expandedSelRange;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      expandedSelRange = range.cloneRange();
      range.collapse(false);

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      const el = document.createElement('div');
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      // eslint-disable-next-line
      let lastNode;
      // eslint-disable-next-line
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        expandedSelRange.setStartAfter(lastNode);
        sel.removeAllRanges();
        sel.addRange(expandedSelRange);
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    expandedSelRange = range.duplicate();
    range.collapse(false);
    range.pasteHTML(html);
    expandedSelRange.setEndPoint('EndToEnd', range);
    // expandedSelRange.select();
  }
}

function getTextNodesIn(node) {
  const textNodes = [];
  if (node.nodeType === 3) {
    textNodes.push(node);
  } else {
    const children = node.childNodes;
    // eslint-disable-next-line
    for (let i = 0, len = children.length; i < len; ++i) {
      textNodes.push(...getTextNodesIn(children[i]));
    }
  }
  return textNodes;
}

// Ref: http://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538#6242538
export function setSelectionRange(el, start, end) {
  if (document.createRange && window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const textNodes = getTextNodesIn(el);
    let foundStart = false;
    let charCount = 0;
    let endCharCount;

    // eslint-disable-next-line
    for (let i = 0, textNode; textNode = textNodes[i++]; ) {
      endCharCount = charCount + textNode.length;
      if (!foundStart && start >= charCount
        && (start < endCharCount ||
        (start === endCharCount && i <= textNodes.length))) {
        range.setStart(textNode, start - charCount);
        foundStart = true;
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount);
        break;
      }
      charCount = endCharCount;
    }

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.body.createTextRange) {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(true);
    textRange.moveEnd('character', end);
    textRange.moveStart('character', start);
    textRange.select();
  }
}

// ref: http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
export function getSelectionCharacterOffsetWithin(element) {
  let start = 0;
  let end = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      start = preCaretRange.toString().length;
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      end = preCaretRange.toString().length;
    }
  } else {
    sel = doc.selection;
    if (sel.type !== 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToStart', textRange);
      end = preCaretTextRange.text.length;
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      end = preCaretTextRange.text.length;
    }
  }
  return { start, end };
}

export function getCaretPosition(element) {
  return getSelectionCharacterOffsetWithin(element).end;
}

// http://stackoverflow.com/questions/23526667/javascript-how-to-get-caret-offset-from-start-of-content-editable-div-with-mult
export function getCaretPixelPos($node, offsetx = 0, offsety = 0) {
  let nodeLeft = 0;
  let nodeTop = 0;
  if ($node) {
    const rect = $node.getBoundingClientRect();
    nodeLeft = rect.left + window.document.body.scrollLeft;
    nodeTop = rect.top + window.document.body.scrollTop;
  }

  const pos = { left: 0, top: 0 };

  if (document.selection) {
    const range = document.selection.createRange();
    pos.left = range.offsetLeft + offsetx - nodeLeft;
    pos.top = range.offsetTop + offsety - nodeTop;
  } else if (window.getSelection) {
    const sel = window.getSelection();
    const range = sel.getRangeAt(0).cloneRange();
    try {
      range.setStart(range.startContainer, range.startOffset - 1);
    } catch (e) {
      //
    }
    const rect = range.getBoundingClientRect();
    if (range.endOffset === 0 || range.toString() === '') {
      // first char of line
      if (range.startContainer === $node) {
        // empty div
        if (range.endOffset === 0) {
          pos.top = 0;
          pos.left = 0;
        } else {
          // firefox need this
          const range2 = range.cloneRange();
          range2.setStart(range2.startContainer, 0);
          const rect2 = range2.getBoundingClientRect();
          pos.left = rect2.left + offsetx - nodeLeft;
          pos.top = rect2.top + rect2.height + offsety - nodeTop;
        }
      } else {
        pos.top = range.startContainer.offsetTop;
        pos.left = range.startContainer.offsetLeft;
      }
    } else {
      pos.left = rect.left + rect.width + offsetx - nodeLeft;
      pos.top = rect.top + offsety - nodeTop;
    }
  }
  return pos;
}
