import React from "react"
import TreeSelectBase from "../TreeSelectBase"
import { treeData } from "../config/treeData"

const PrefixSuffixSelect = () => {
    return (
        <>
            <TreeSelectBase
                placeholder="Please select"
                label={'Prefix and Suffix'}
                multiple={false}
                data={treeData.prefix_suffix_selection} />
        </>
    )
}
export default PrefixSuffixSelect