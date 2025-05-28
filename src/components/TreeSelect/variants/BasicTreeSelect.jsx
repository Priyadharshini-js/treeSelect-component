import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'
import { treeSelectPresets } from '../config/treeSelectProps'

const BasicTreeSelect = () => {
    const handleChange = (value) => {
        console.log('Selected Value:', value);
    };

    return (
        <TreeSelectBase
            config={treeSelectPresets.searchable}
            onChange={handleChange}
            label={"Basic"}
            data={treeData.basic_selection}
        />
    );
};

export default BasicTreeSelect;
