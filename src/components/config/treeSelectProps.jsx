import PropTypes from 'prop-types';


export const baseConfig = {
    placeholder: "Please select", //string
    treeDefaultExpandAll: false, //boolean
    multiple: false, //boolean
    size: ["middle", "large", "middle", "small"], //string
    treeCheckable: false, //boolean
    placement: ["bottomLeft", 'bottomRight', 'topLeft', 'topRight'], //string
    status: ['error', 'warning'], //string'  //undefined  
    variant: ["underlined", 'borderless', 'filled', 'outlined'],
    prefix: undefined, //string or react node
    maxCount: undefined, //number
    treeLine: false, //boolean or object
    onChange: undefined, //function
    disabled: false, //boolean
};

const treeNodeShape = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.array,
});


export const treeSelectBasePropTypes = {
    config: PropTypes.shape({
        placeholder: PropTypes.string,
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        treeCheckable: PropTypes.bool,
        treeDefaultExpandAll: PropTypes.bool,
        prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        placement: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        variant: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        status: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        maxCount: PropTypes.number,
        treeLine: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        size: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
    }),
    label: PropTypes.string,
    data: PropTypes.arrayOf(treeNodeShape).isRequired,
    showAllVariant: PropTypes.bool,
    showStatus: PropTypes.bool,
    showAllPlacement: PropTypes.bool,
};