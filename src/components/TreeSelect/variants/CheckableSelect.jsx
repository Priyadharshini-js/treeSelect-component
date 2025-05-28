import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'
import { treeSelectPresets } from '../config/treeSelectProps'

const CheckableSelect = () => {
    return (
        <>
            <TreeSelectBase
                config={{ ...treeSelectPresets.withCheckable, multiple: true }}
                label={'Checkable'}
                data={treeData.checkable_selection}
                multiple={true} />
        </>
    )
}
export default CheckableSelect