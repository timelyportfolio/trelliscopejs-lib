import React from 'react';

/**
 * Recursively transforms tag, a JSON representation of an instance of a
 * React component and its children, into a React element suitable for
 * passing to ReactDOM.render.
 * @param {Object} components
 * @param {Object} tag which has properties 'name', 'attribs', and 'children'
 */
 export default function hydrate(components, tag) {
  if (typeof tag === 'string') return tag;
  if (tag.name[0] === tag.name[0].toUpperCase()
      && !components.hasOwnProperty(tag.name)) {
      throw new Error("Unknown component: " + tag.name);
  }
  var elem = components.hasOwnProperty(tag.name) ? components[tag.name] : tag.name,
      args = [elem, tag.attribs];
  for (var i = 0; i < tag.children.length; i++) {
      args.push(hydrate(components, tag.children[i]));
  }
  return React.createElement.apply(React, args);
}
