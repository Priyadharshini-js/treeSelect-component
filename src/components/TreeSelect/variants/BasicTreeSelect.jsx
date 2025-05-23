import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'

const BasicTreeSelect = () => {
    const handleChange = (value) => {
        console.log('Selected Value:', value);
    };

    return (
        <TreeSelectBase
            placeholder="Please select"
            multiple={false}
            onChange={handleChange}
            label={"Basic"}
            data={treeData.basic_selection}
        />
    );
};

export default BasicTreeSelect;
