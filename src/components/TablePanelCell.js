import React from 'react';
import {useQuery} from '@tanstack/react-query'

function TablePanelCell({
  panelRenderer,
  panelInterface,
  url,
  panelKey,
  name
}) {
  const { status, error, data, isFetching } = useQuery(['panelcell',panelKey], async() => {
    const response = await fetch(url);
    return await response.text();
  }, {refetchOnMount: false});

  const height = 250;
  const width = '100%';

  if(status === "loading") {
    return <td>"Loading..."</td>
  }
 
  if(status === "error") {
    return <td>Error: {error.message}</td>
  }

  let panel = <></>
  if(panelInterface === 'image') {
    panel = panelRenderer(data.replace(/.*\("/,"").replace(/"\)/,""), null, height);
  } else if(panelInterface === 'react') {
    panel = panelRenderer(JSON.parse(data.replace(/(__panel__.*\(){/,"{").replace(/\)$/,"")));
  } else if(panelInterface === 'htmlwidget') {
    // set post = true for now every time even though not correct
    panel = panelRenderer(JSON.parse(data.replace(/(__panel__.*\(){/,"{").replace(/\)$/,"")), width, height, true, `${panelKey}_${name}`);
  }

  return (
    <td>
      {panel}
    </td>
  )
}

export default TablePanelCell;