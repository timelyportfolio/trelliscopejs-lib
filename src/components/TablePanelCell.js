import React from 'react';
import {useQuery} from '@tanstack/react-query'

function TablePanelCell({
  panelRenderer,
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

  const panel = panelRenderer(/data:image\/png/.test(data) ? data.replace(/.*\("/,"").replace(/"\)/,"") : data, null, height)
  return (
    <td>
      {panel}
    </td>
  )
}

export default TablePanelCell;