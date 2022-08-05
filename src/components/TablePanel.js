import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import TablePanelCell from './TablePanelCell.js';

function TablePanel({
  labels,
  panelMatrix,
  panelRenderers,
  curDisplayInfo,
  displayInfo,
  cfg
}) {
  const {name} = curDisplayInfo.info;
  const panelInterface = displayInfo[name].info.panelInterface.type;
  const panelRenderer = panelRenderers[name].fn;
  const curIface = displayInfo[name].info.cogInterface;
  let filebase = `${cfg.cog_server.info.base}${curIface.group}`;
  filebase = `${filebase}/${curIface.name}`;

  const queryClient = new QueryClient();

  return (
    <table style={{borderCollapse: 'collapse', margin: '20px'}}>
      <thead style={{fontWeight: 'bold'}}>
        <tr>
          {labels.map((header) => (
            <td>
              {header}
            </td>
          ))}
          <td>Panel</td>
        </tr>
      </thead>
      <tbody>
        {panelMatrix.map((el) => (
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            {el.labels.map((cell) => (
              <td>
                {cell.value}
              </td>
            ))}
            <QueryClientProvider client={queryClient}>
              <TablePanelCell
                panelRenderer={panelRenderer}
                panelInterface={panelInterface}
                url={`${filebase}/jsonp/${el.key}.jsonp`}
                panelKey={el.key}
                name={name}
              />
            </QueryClientProvider>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

TablePanel.propTypes = {
  panelMatrix: PropTypes.array.isRequired,
  panelRenderers: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
  curDisplayInfo: PropTypes.object.isRequired,
  displayInfo: PropTypes.object.isRequired,
  cfg: PropTypes.object.isRequired,
};

export default TablePanel;