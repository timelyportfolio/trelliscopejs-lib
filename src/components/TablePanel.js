import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import TablePanelCell from './TablePanelCell.js';
//import { json as d3json } from 'd3-request';
//import { default as getJSONP } from 'browser-jsonp'; // eslint-disable-line import/no-named-default
//import { findWidget } from '../loadAssets';

//const getJSON = (obj) => d3json(obj.url, (json) => obj.callback(json));

function TablePanel({
  labels,
  panelMatrix,
  panelRenderers,
  curDisplayInfo,
  displayInfo,
  cfg
}) {
  const {name} = curDisplayInfo.info;
  const panelRenderer = panelRenderers[name].fn;
  const curIface = displayInfo[name].info.cogInterface;
  let filebase = `${cfg.cog_server.info.base}${curIface.group}`;
  filebase = `${filebase}/${curIface.name}`;

  const queryClient = new QueryClient();

  return (
    <table>
      <thead>
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
          <tr>
            {el.labels.map((cell) => (
              <td>
                {cell.value}
              </td>
            ))}
            <QueryClientProvider client={queryClient}>
              <TablePanelCell
                panelRenderer={panelRenderer}
                url={`${filebase}/jsonp/${el.key}.jsonp`}
                panelKey={el.key}
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