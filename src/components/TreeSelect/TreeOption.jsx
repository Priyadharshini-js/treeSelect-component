import React from 'react'

const TreeOption = ({ item, selected, onSelect, multiple, treeIcon, renderIcon, treeCheckable }) => {
    const isChecked = multiple
        ? selected.includes(item.value)
        : selected === item.value;
        // console.log("selected:", selected, "item.value:", item.value, "isChecked:", isChecked);


    const handleClick = () => {
        if (item.value === 'no data') return;
        onSelect(item);
        console.log(item)
    };

    return (
        <li className={`tree-option ${isChecked ? 'selected' : ''} ${item.value === 'no data' ? 'disabled' : ''}`}>
            <div className="tree-option-label dropdown-icons d-flex align-items-center" onClick={handleClick}>
                {treeIcon && item.iconType && (
                    <span className="me-2">{renderIcon(item.iconType)}</span>
                )}
                {treeCheckable && <input type="checkbox"  readOnly checked={isChecked} />}
                {item.title}
            </div>
            {item.children && item.children.length > 0 && (
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
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeOption;
