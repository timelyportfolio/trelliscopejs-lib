import React, {useEffect, useState} from 'react';

function TablePanelCell({
  panelRenderer,
  url
}) {

  const [content, setContent] = useState('');
  const height = 100;

  useEffect(() => {
    (async () => {
      const response = await fetch(url);
      let textContent = await response.text();
      if(/data:image\/png/.test(textContent)) {
        textContent = textContent.replace(/.*\("/,"").replace(/"\)/,"")
        setContent(textContent)
      }
    })();
  
    return () => {
      // this now gets called when the component unmounts
    };
  });

  if(content) {
    return (
      <td>
        <img
          src={content}
          alt="panel"
          style={{ height }}
        />
      </td>
    )
  }

  return (
    <td>
      {`loading...`}
    </td>
  )
}

export default TablePanelCell;