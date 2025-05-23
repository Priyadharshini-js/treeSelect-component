import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'

const GenerateSelect = () => {
    return (
        <TreeSelectBase
            placeholder='Please select'
            label={'Generate from tree data'}
            multiple={false}
            data={treeData.generate_selection}
        />
    )
}
export default GenerateSelect