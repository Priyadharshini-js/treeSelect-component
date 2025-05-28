import React from 'react'
import TreeSelect from '../TreeSelectBase'
import { treeData } from '../config/treeData'
import { treeSelectPresets } from '../config/treeSelectProps'

const MultipleSelect = () => {

    return (
        <>
            <TreeSelect
                config={{ ...treeSelectPresets.searchable, multiple: true }}
                label={"Multiple Selection"}
                data={treeData.multiple_selection}
            />
        </>
    )
}
export default MultipleSelect