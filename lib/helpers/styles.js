module.exports = {
  '.react-tabs [role=tablist]': {
    'border-bottom': '0px solid #aaa',
    'margin': '0 0 30px',
    'padding': '0'
  },

  '.react-tabs' : {
    margin:'5'
  },

  '.react-tabs [role=tab]': {
    'display': 'inline-block',
    'border': '0px solid #aaa',
    'border-bottom': 'none',
    'bottom': '-1px',
    'position': 'relative',
    'list-style': 'none',
    'padding': '6px 6px',
    'margin': '5px',
    'font-size': '18px',
    'font-weight': 'bold',
    'cursor': 'pointer',
  },

  '.react-tabs [role=tab][aria-selected=true]': {
    'background': '#fff',
    'border-bottom': '2px solid #666666 ',
    'color': 'black',
    'border-radius': '5px 5px 0 0',
    '-moz-border-radius': '5px 5px 0 0',
    '-webkit-border-radius': '5px 5px 0 0',
    'opacity':'1'
  },

  '.react-tabs [role=tab][aria-disabled=true]': {
    'color': 'GrayText',
    'cursor': 'default',
    'margin': '20',
    'opacity':'0.8'
  },

  '.react-tabs [role=tab]:focus': {
    'box-shadow': '0 0 5px hsl(208, 99%, 50%)',
    'border-color': 'hsl(208, 99%, 50%)',
    'outline': 'none'
  },

  '.react-tabs [role=tab]:hover': {
    'border-bottom': '2px solid #0E8000 '
  },

  '.react-tabs [role=tab]:focus:after': {
    'content': '""',
    'position': 'absolute',
    'height': '5px',
    'left': '-4px',
    'right': '-4px',
    'bottom': '-5px',
    'background': '#fff'
  }
};
