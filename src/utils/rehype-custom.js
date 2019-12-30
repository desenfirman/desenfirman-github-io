import refractor from "refractor/core";

import jsx from "refractor/lang/jsx";
import javascript from "refractor/lang/javascript";
import css from "refractor/lang/css";
import cssExtras from "refractor/lang/css-extras";
import jsExtras from "refractor/lang/js-extras";
import sql from "refractor/lang/sql";
import swift from "refractor/lang/swift";
import objectivec from "refractor/lang/objectivec";
import markdown from "refractor/lang/markdown";
import json from "refractor/lang/json";
import python from "refractor/lang/python"
import bash from "refractor/lang/bash";
// import { replace } from 'gatsby-remark-figure-caption'

const visit = require('unist-util-visit');
const nodeToString = require('hast-util-to-string');

refractor.register(jsx);
refractor.register(json);
refractor.register(javascript);
refractor.register(css);
refractor.register(cssExtras);
refractor.register(jsExtras);
refractor.register(sql);
refractor.register(swift);
refractor.register(objectivec);
refractor.register(markdown);
refractor.register(python);
refractor.register(bash);
refractor.alias({
  jsx: ["js"],
  python: ["py"],
  bash: ["shell"],
});


const getLanguage = (node) => {
  const className = node.properties.className || [];
  for (const classListItem of className) {
    if (classListItem.slice(0, 9) === "language-") {
      return classListItem.slice(9).toLowerCase();
    }
  }
  return null;
}

const rehypeCustom = options => {
  options = options || {
    ignoreMissing: true,
  };
  return tree => {
    visit(tree, "element", visitor);
  };
  function visitor(node, index, parent) {
    if (parent && parent.tagName === "pre" && node.tagName === "code") {
      const lang = getLanguage(node);
      if (lang === null) {
        return;
      }
      let result;
      try {
        parent.properties.className = (parent.properties.className || []).concat("language-" + lang);
        result = refractor.highlight(nodeToString(node), lang);
      } catch (err) {
        if (options.ignoreMissing && /Unknown language/.test(err.message)) {
          return;
        }
        throw err;
      }
      console.log(result)
      node.children = result;
    }
    else if (parent && parent.tagName === 'p' && node.tagName === "img") {
      const image =  {
        type: 'element',
        tagName: 'img',
        properties: {
          src: '' || node.properties.src,
          alt: null,
          className: [
            'figure-img',
            'img-fluid',
            'rounded',
          ]
        }
      }
      const figcaption = {
        type: 'element',
        tagName: 'figcaption',
        properties: {
          className: ['figure-caption']
        },
        children: [{type: 'text', value: '' || node.properties.alt}]
      }
      node.tagName = 'figure'
      node.properties = {
        className: [
          'figure'
        ]
      }
      node.children = [image, figcaption]
    }
    else{
      return;
    }
  }
};



export default rehypeCustom;