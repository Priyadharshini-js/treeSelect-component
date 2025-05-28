import React from 'react'
import TreeOption from './TreeOption'

const TreeDropdown = ({ data, selected, onSelect, treeIcon, renderIcon, treeCheckable, multiple }) => {
    return (
        <ul className="tree-dropdown">
            {data.map((item) => (
                <TreeOption
                    key={item.value}
                    item={item}
                    selected={selected}
                    onSelect={onSelect}
                    multiple={multiple}
                    treeIcon={treeIcon}
                    renderIcon={renderIcon}
                    treeCheckable={treeCheckable}
                />
            ))}
        </ul>
    );
};

export default TreeDropdown;
