import React from "react"
import TreeSelectBase from "../TreeSelectBase"
import { treeData } from "../config/treeData"

const VariantsSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder="Please select"
                label={'Variants'}
                multiple={false}
                data={treeData.variants_selection} />
        </>
    )
}
export default VariantsSelect