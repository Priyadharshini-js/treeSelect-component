import React from 'react'
import TreeSelectBase from '../TreeSelectBase'
import { treeData } from '../config/treeData'


const AsyncSelect = () => {
    return (
        <TreeSelectBase
            placeholder='Please select'
            label={'Asynchronous loading'}
            multiple={false}
            data={treeData.async_loading_selection} />
    )
}
export default AsyncSelect