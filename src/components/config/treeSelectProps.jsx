export const baseConfig = {
    treeData: [],
    placeholder: "Please select", //string
    allowClear: false, //boolean
    treeDefaultExpandAll: false, //boolean
    disabled: false, //boolean
    labelInValue: false, //boolean
    multiple: false, //boolean
    size: ["middle", "large", "middle", "small"], //string
    treeCheckable: false, //boolean
    showSearch: false, //boolean
    virtual: true, //boolean
    treeNodeFilterProp: "value", //string
    treeNodeLabelProp: "title", //string


    // -------------------------

    value: undefined, //string
    defaultValue: undefined, //string
    open: undefined, //boolean
    defaultOpen: false, //boolean
    onChange: undefined, //function
    autoClearSearchValue: false, //boolean
    popupMatchSelectWidth: undefined, //boolean or number
    popupRender: undefined, //function
    fieldNames: undefined, //object
    filterTreeNode: undefined, //function
    getPopupContainer: undefined, //function
    listHeight: undefined, //number
    loadData: undefined, //function
    maxTagCount: undefined, //number
    maxCount: undefined, //number
    maxTagPlaceholder: undefined, //function
    maxTagTextLength: undefined, //number
    notFoundContent: undefined, //react node
    placement: ["bottomLeft", 'bottomRight', 'topLeft', 'topRight'], //string
    prefix: undefined, //string or react node
    searchValue: undefined, //string
    showCheckedStrategy: "TreeSelect.SHOW_ALL", // TreeSelect.SHOW_PARENT | TreeSelect.SHOW_CHILD, //string
    status: ['error', 'warning'], //string'  //undefined  
    suffixIcon: undefined, //string or react node
    switcherIcon: undefined, //string or react node
    tagRender: undefined, //function
    treeCheckStrictly: false, //boolean
    treeDataSimpleMode: false, //boolean
    treeTitleRender: undefined, //function
    treeDefaultExpandedKeys: [], //string[]
    treeExpandAction: false, //string or boolean
    treeExpandedKeys: [], //string[]
    treeIcon: false, //boolean
    treeLoadedKeys: [], //string[]
    treeLine: false, //boolean or object
    variant: ["underlined", 'borderless', 'filled', 'outlined'],
    onSearch: undefined, //function
    onSelect: undefined, //function
    onTreeExpand: undefined, //function
    onPopupScroll: undefined, //function
};
