import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'

const CheckableSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder='Please select'
                label={'Checkable'}
                data={treeData.checkable_selection}
                multiple={true} />
        </>
    )
}
export default CheckableSelect