import React, { useRef, useEffect } from 'react'

const TreeOption = ({ item, selected, onSelect, multiple, treeIcon, renderIcon, treeCheckable, expandedNodes, handleExpandCollapse, isAllSelected, isPartiallySelected }) => {
    // const isChecked = multiple
    //     ? selected.includes(item.value)
    //     : selected === item.value;
    // console.log("selected:", selected, "item.value:", item.value, "isChecked:", isChecked);
    const checkboxRef = useRef(null);

    // Determine if node is fully checked
    const checked = multiple ? isAllSelected(item, selected) : selected === item.value;

    // Determine if node is partially checked (for multiple mode)
    const indeterminate = multiple ? isPartiallySelected(item, selected) : false;

    // Set indeterminate property on checkbox DOM element
    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);

    const onCheckboxClick = (e) => {
        e.stopPropagation();
        onSelect(item);
    };

    const handleClick = () => {
        onSelect(item);
    };

    return (
        <li className={`tree-option ${checked ? 'selected' : ''} ${item.value === 'no data' ? 'disabled' : ''}`}>
            <div className="tree-option-label dropdown-icons d-flex align-items-center" onClick={handleClick}>
                {treeIcon && item.iconType && (
                    <span className="me-2"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent handleClick
                            handleExpandCollapse(item.value);
                        }}>
                        {item.value === 'no data'
                            ? renderIcon('faFileImage')
                            : renderIcon(expandedNodes.has(item.value) ? 'faCaretDown' : 'faCaretRight')}
                    </span>
                )}
                {treeCheckable && <input type="checkbox" ref={checkboxRef} readOnly checked={checked} onClick={onCheckboxClick} />}
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
                            isAllSelected={isAllSelected}
                            isPartiallySelected={isPartiallySelected}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeOption;
