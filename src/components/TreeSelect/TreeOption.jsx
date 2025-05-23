import React from 'react'

const TreeOption = ({ item, selected, onSelect, multiple }) => {
    const isChecked = multiple
        ? selected.includes(item.value)
        : selected === item.value;

    const handleClick = () => {
        onSelect(item);
    };

    return (
        <li className={`tree-option ${isChecked ? 'selected' : ''}`}>
            <div className="tree-option-label" onClick={handleClick}>
                {multiple && <input type="checkbox" readOnly checked={isChecked} />}
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
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeOption;
