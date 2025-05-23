import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'

const ShowTreeLineSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder='Please select'
                label={'Show Tree Line'}
                data={treeData.treeline_selction}
                multiple={false} />
        </>
    )
}
export default ShowTreeLineSelect