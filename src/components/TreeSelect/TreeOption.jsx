import React, { useRef, useEffect } from 'react'

const TreeOption = ({ item, selected, onSelect, multiple, treeIcon, renderIcon, treeCheckable, expandedNodes, handleExpandCollapse, disabledValues, treeLine }) => {
    const checkboxRef = useRef(); // used for indeterminate
    const isDisabled = disabledValues?.has(item.value) || item.value === 'no data';


    const collectAllChildValues = (node) => {
        let values = [];
        if (node.children) {
            node.children.forEach(child => {
                values.push(child.value);
                values.push(...collectAllChildValues(child));
            });
        }
        return values;
    };

    const selectedArr = Array.isArray(selected) ? selected : [];
    const allChildren = collectAllChildValues(item);

    // Determine selection states
    const allSelected = allChildren.length > 0 && allChildren.every((val) => selectedArr.includes(val)); // Check if all children are selected
    const anySelected = allChildren.some((val) => selectedArr.includes(val)); // Check if any children are selected
    const isChecked = selectedArr.includes(item.value) || allSelected; // Check if node itself is selected or all children are selected
    const isIndeterminate = anySelected && !allSelected; // Check if some children are selected not all to indicate indeterminate

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);


    const handleClick = (e) => {
        e.stopPropagation();
        onSelect(item);
    };

    return (
        <li className={`tree-option ${isChecked ? 'selected' : ''} ${item.value === 'no data' ? 'no-data' : ''} ${isDisabled ? 'disabled' : ''}`}>
            <div className="tree-option-label dropdown-icons d-flex align-items-center" onClick={!isDisabled ? handleClick : undefined}>
                {treeIcon && item.iconType && (
                    <span className="me-2"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent handleClick
                            handleExpandCollapse(item.value);
                        }}>
                        {item.value === 'no data' ? (
                            renderIcon('faFileImage')
                        ) : treeLine ? (
                            renderIcon(expandedNodes.has(item.value) ? 'faMinusSquare' : 'faPlusSquare')
                        ) : (
                            renderIcon(expandedNodes.has(item.value) ? 'faCaretDown' : 'faCaretRight')
                        )}

                    </span>
                )}
                {treeCheckable && <input type="checkbox" readOnly checked={isChecked} disabled={isDisabled}
                    ref={checkboxRef} />}
                {item.title}
            </div>
            {item.children && item.children.length > 0 && expandedNodes.has(item.value) && (
                <ul className="tree-submenu">
                    {item.children.map((child) => (
                        <TreeOption
                            key={child.value}
                            item={child}
                            selected={selected}
                            onSelect={onSelect}
                            multiple={multiple}
                            treeIcon={treeIcon}
                            renderIcon={renderIcon}
                            treeCheckable={treeCheckable}
                            expandedNodes={expandedNodes}
                            handleExpandCollapse={handleExpandCollapse}
                            disabledValues={disabledValues}
                            treeLine={treeLine}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeOption;
