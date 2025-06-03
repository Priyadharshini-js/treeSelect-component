# Expand dropdown for components

basic - expand all default
multi - expand all default
generate - expand all default
checkabl - not expand initially
aync - not expand initially
show tree line - not expand initially
placement - expand all default
variants - no data
status - no data
max -count - not expand initially
prefix - expand all default

# Folder structure:
src/
│
├── components/
│   ├── config
|   |    └── treeData.jsx
|   |    └── treeSelectProps.jsx
│   ├── TreeSelect
│   |    └── TreeDropdown.jsx
|   |    └── TreeOption.jsx
|   |    └── TreeSelectBase.jsx
│
├── pages/
│   └── Home.jsx
│
├── routes/
│   └── routes.jsx
│
├── app.jsx/
|
├── app.css/



## unused props
 treeData: [],
    allowClear: false, //boolean
    labelInValue: false, //boolean
    showSearch: false, //boolean
    virtual: true, //boolean
    treeNodeFilterProp: "value", //string
    treeNodeLabelProp: "title", //string
    value: undefined, //string
    defaultValue: undefined, //string
    open: undefined, //boolean
    defaultOpen: false, //boolean
    autoClearSearchValue: false, //boolean
    popupMatchSelectWidth: undefined, //boolean or number
    popupRender: undefined, //function
    fieldNames: undefined, //object
    filterTreeNode: undefined, //function
    getPopupContainer: undefined, //function
    listHeight: undefined, //number
    loadData: undefined, //function
    maxTagCount: undefined, //number
    maxTagPlaceholder: undefined, //function
    maxTagTextLength: undefined, //number
    notFoundContent: undefined, //react node
    searchValue: undefined, //string
    showCheckedStrategy: "TreeSelect.SHOW_ALL", // TreeSelect.SHOW_PARENT | TreeSelect.SHOW_CHILD, //string
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
    onSearch: undefined, //function
    onSelect: undefined, //function
    onTreeExpand: undefined, //function
    onPopupScroll: undefined, //function





  