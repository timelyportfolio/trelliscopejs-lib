import React from 'react';
import {useQuery} from '@tanstack/react-query'

function TablePanelCell({
  panelRenderer,
  url,
  panelKey
}) {

  const { status, error, data, isFetching } = useQuery(['panelcell',panelKey], async() => {
    window.console.log(panelKey, url)
    const response = await fetch(url);
    return await response.text();
  }, {refetchOnMount: false});

  const height = 100;

  if(status === "loading") {
    return <td>"Loading..."</td>
  }
 
  if(status === "error") {
    return <td>Error: {error.message}</td>
  }

  return (
    <td>
      <img
        src={/data:image\/png/.test(data) ? data.replace(/.*\("/,"").replace(/"\)/,"") : data }
        alt="panel"
        style={{ height }}
      />
    </td>
  )
}

export default TablePanelCell;