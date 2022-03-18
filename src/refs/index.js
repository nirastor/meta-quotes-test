export const TEMPERATURE = 'temperature';
export const PRECIPITATION = 'precipitation';

export const GRAPH_SETTINGS = {
  [TEMPERATURE]: {
    getZeroLevel: (v) => v / 2,
    getPlotHeight: (v) => v / 2,
  },
  [PRECIPITATION]: {
    getZeroLevel: (v) => v,
    getPlotHeight: (v) => v,
  },
};
