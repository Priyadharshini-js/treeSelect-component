import React from "react"
import TreeSelectBase from "../TreeSelectBase"
import { treeData } from "../config/treeData"

const StatusSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder="Please select"
                label={'Status'}
                multiple={false}
                data={treeData.status_selection} />
        </>
    )
}
export default StatusSelect