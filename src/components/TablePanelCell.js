import React from 'react';
import {useQuery} from '@tanstack/react-query'

function TablePanelCell({
  panelRenderer,
  panelInterface,
  url,
  panelKey
}) {
  const { status, error, data, isFetching } = useQuery(['panelcell',panelKey], async() => {
    const response = await fetch(url);
    return await response.text();
  }, {refetchOnMount: false});

  const height = 200;

  if(status === "loading") {
    return <td>"Loading..."</td>
  }
 
  if(status === "error") {
    return <td>Error: {error.message}</td>
  }

  let panel = <></>
  if(panelInterface === 'image') {
    panel = panelRenderer(data.replace(/.*\("/,"").replace(/"\)/,""), null, height)
  } else if(panelInterface === 'react') {
    panel = panelRenderer(JSON.parse(data.replace(/.*\("/,"").replace(/"\)/,"")))
  }

  return (
    <td>
      {panel}
    </td>
  )
}

export default TablePanelCell;