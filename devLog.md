# given and rectified bugs

1. No PropTypes or TypeScript Validation. - now implemented
2. Inconsistent State Management for
// Problem: isOpen stores different string values instead of boolean - if multiple dropdowns opens at a time we can use set but now only one dropdown opens at a time.
3. Massive Function with Multiple Responsibilities
// Problem: handleSelect does too many things (70+ lines) - splited into separate funtions.
4. Inefficient Recursive Operations in Render
// Problem: Heavy computation in render cycle - now used useMemo for resolution
5. Hard-coded strings everywhere
// Problem: Hard-coded strings everywhere
const isOpenForThis = isOpen === 'treeLine'; - have used CONSTANTS now.
6. Deeply Nested Conditional Rendering
// Problem: Unreadable nested ternary operators
{(showStatus) ? (
    status.map((s) => renderShowStatus(s, size, placement, variant))
) : (showAllVariant) ? (
    variant.map((v) => renderVariant(v, size, placement))
) : (prefix) ? (
    renderAffixes(placement, size, variant)
) : // continues for 6 more conditions - have implemented render funtion in more readableway.
7. Duplicate Code in Render Functions
// Problem: Same JSX structure repeated 5+ times
const renderVariant = (variantType, size, placement) => {
    return (
        <div className={`tree-select-container ${variantType}`}>
            <div className={`tree-select-input ${size}`}> // Duplicated
                {/* Same structure in renderShowStatus, renderTreeLine, etc. */} - removed duplications.
8. Missing Key Props in Dynamic Lists - have used now.
9. Hard-coded Class Names - removed.
10. No Memoization for Expensive Computations
// Problem: Heavy functions run on every render
const getTopLevelSelected = (selectedValues, nodes) => { // Not memoized
    // Complex recursive logic
}; - used now usecallbacks.
11. ErrorBoundary - handled in homePage.







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


# flatmap() - flattens the resulting array by one level.The flatMap() method in JavaScript is an Array method that combines the functionality of map() and flat() into a single operation.
# When working with arrays containing nested arrays, flatMap() can simplify the process of accessing and transforming elements within those nested structures and then flattening them.
# a Set() is a built-in object that allows you to store unique values of any type



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





  