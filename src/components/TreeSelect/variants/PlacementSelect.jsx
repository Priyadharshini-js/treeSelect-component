import React from "react"
import TreeSelectBase from "../TreeSelectBase"
import { treeData } from "../config/treeData"


const PlacementSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder="Please select"
                label={'Placement'}
                data={treeData.placement_selection}
                multiple={false} />
        </>
    )
}
export default PlacementSelect