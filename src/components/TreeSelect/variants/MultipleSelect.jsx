import React from 'react'
import TreeSelect from '../TreeSelectBase'
import { treeData } from '../config/treeData'

const MultipleSelect = () => {

    return (
        <>
            <TreeSelect
                placeholder="Please select"
                multiple={true}
                label={"Multiple Selection"}
                data={treeData.multiple_selection}
            />
        </>
    )
}
export default MultipleSelect