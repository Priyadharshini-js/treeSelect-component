import React from 'react'
import TreeOption from './TreeOption'

const TreeDropdown = ({ data, selected, onSelect, treeIcon, renderIcon, treeCheckable, multiple, expandedNodes, handleExpandCollapse, isAllSelected, isPartiallySelected }) => {
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
                    expandedNodes={expandedNodes}
                    handleExpandCollapse={handleExpandCollapse}
                    isAllSelected={isAllSelected}
                    isPartiallySelected={isPartiallySelected}

                />
            ))}
        </ul>
    );
};

export default TreeDropdown;
