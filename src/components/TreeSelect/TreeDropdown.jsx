import React from 'react'
import TreeOption from './TreeOption'

const TreeDropdown = ({ data, selected, onSelect, multiple }) => {
    return (
        <ul className="tree-dropdown">
            {data.map((item) => (
                <TreeOption
                    key={item.value}
                    item={item}
                    selected={selected}
                    onSelect={onSelect}
                    multiple={multiple}
                />
            ))}
        </ul>
    );
};

export default TreeDropdown;
