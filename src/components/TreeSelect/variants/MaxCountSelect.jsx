import React from "react"
import TreeSelectBase from "../TreeSelectBase"
import { treeData } from "../config/treeData"

const MaxCountSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder="Please select"
                label={'Max Count'}
                multiple={false}
                data={treeData.max_count_selection} />
        </>
    )
}
export default MaxCountSelect