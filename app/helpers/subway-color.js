import Ember from 'ember';

/**
* @name Subway color helper
* @desc Sets class base on subway line name
* @param { String } params - subway line name
* @requires css classes styles to be set
* @return string
*/
export function subwayColor(params/*, hash*/) {
  let [subwayName] = params;
  let subwayColor = '';

  switch (subwayName) {
    case 'Hammersmith & City':
      subwayColor = 'hammersmith-line';
      break;

    case 'Bakerloo':
      subwayColor = 'bakerloo-line';
      break;

    case 'Central':
      subwayColor = 'central-line';
      break;

    case 'Circle':
      subwayColor = 'circle-line';
      break;

    case 'District':
      subwayColor = 'district-line';
      break;
    case 'Jubilee':
      subwayColor = 'jubilee-line';
      break;

    case 'Metropolitan':
      subwayColor = 'metropolitan-line';
      break;

    case 'Northern':
      subwayColor = 'northern-line';
      break;

    case 'Piccadilly':
      subwayColor = 'piccadilly-line';
      break;

    case 'Victoria':
      subwayColor = 'victoria-line';
      break;

    case 'Waterloo & City':
      subwayColor = 'waterloo-line';
      break;
    case 'DLR':
      subwayColor = 'dlr-line';
      break;
  }
  return subwayColor;
}

export default Ember.Helper.helper(subwayColor);
