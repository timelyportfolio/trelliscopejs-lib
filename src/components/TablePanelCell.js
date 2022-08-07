import React, {useRef, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import { findWidget } from '../loadAssets';

const evalEvals = (x) => {
  if (!(x.evals instanceof Array)) {
    x.evals = [x.evals]; // eslint-disable-line no-param-reassign
  }
  for (let i = 0; x.evals && i < x.evals.length; i += 1) {
    window.HTMLWidgets.evaluateStringMember(x.x, x.evals[i]);
  }
}

// try to do htmlwidgets with useRef
//   should move this to its own component if it works
const Widget = function({
  data,
  width,
  height,
  panelKey,
  panelInterface,
  status
}) {
  const containerRef = useRef();
  // this initResult only helps if we expect refresh/invalidation on panel
  const initResult = useRef();

  useEffect(() => {
    if(status !== 'loading' && status !== 'error') {
      const binding = findWidget(panelInterface.deps.name);
      const x = JSON.parse(data.replace(/(__panel__.*\(){/,"{").replace(/\)$/,""));
      if (!initResult.current) {
        if (binding.initialize) {
          initResult.current = binding.initialize(containerRef.current, width, height);
        }
      }
      evalEvals(x);
      binding.renderValue(containerRef.current, x.x, initResult);
    }
  });

  return (
    <div id={`table_widget_outer_${panelKey}`}>
      <div
        ref={containerRef}
        id={`table_widget_${panelKey}`}
        style={{width:`${width}px`, height:`${height}px`}}
      />
    </div>
  )
}

function TablePanelCell({
  panelRenderer,
  panelInterface,
  url,
  panelKey,
  name
}) {

  const { status, error, data } = useQuery(['panelcell',panelKey], async() => {
    const response = await fetch(url);
    return await response.text();
  }, {refetchOnMount: false});

  const panelType = panelInterface.type;

  const height = 250;
  const width = 300;

  let panel = <></>

  /*if(status === "loading") {
    panel = <td>"Loading..."</td>
  }
 
  if(status === "error") {
    panel = <td>Error: {error.message}</td>
  }
  */

  if(panelType === 'image') {
    panel = data ? panelRenderer(data.replace(/.*\("/,"").replace(/"\)/,""), null, height) : <div>Loading...</div>;
  } else if (panelType === 'react') {
    panel = data ? panelRenderer(JSON.parse(data.replace(/(__panel__.*\(){/,"{").replace(/\)$/,""))) : <div>Loading...</div>;
  } else if (panelType === 'htmlwidget') {
    panel = Widget({
      data,
      width,
      height,
      panelKey,
      panelInterface,
      status
    });
  }

  return (
    <td>
      {panel}
    </td>
  )
}

export default TablePanelCell;