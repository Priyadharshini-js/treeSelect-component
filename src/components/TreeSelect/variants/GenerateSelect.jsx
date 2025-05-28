import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'
import { treeSelectPresets } from '../config/treeSelectProps'

const GenerateSelect = () => {
    return (
        <TreeSelectBase
            config={treeSelectPresets.default}
            label={'Generate from tree data'}
            data={treeData.generate_selection}
        />
    )
}
export default GenerateSelect