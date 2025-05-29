import React from 'react'
import TreeSelectBase from '../components/TreeSelect/TreeSelectBase';
import { treeData } from '../components/config/treeData'
import { treeSelectPresets } from '../components/config/treeSelectProps'

const TreeSelectReusableComponent = () => {
    return (
        <>
            <section>
                <div className='container mt-5'>
                    <div className='heading-wrapper'>
                        <h2 className='mb-4'>TreeSelect</h2>
                        <h4>Examples</h4>
                    </div>
                    <div className='tree-sections row row-15'>
                        {/* basic tree select */}
                        <TreeSelectBase
                            config={treeSelectPresets.searchable}
                            label={"Basic"}
                            data={treeData.basic_selection} />
                        {/* multiple select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.searchable, multiple: true }}
                            label={"Multiple Selection"}
                            data={treeData.multiple_selection}
                        />
                        {/* generate select */}
                        <TreeSelectBase
                            config={treeSelectPresets.default}
                            label={'Generate from tree data'}
                            data={treeData.generate_selection}
                        />
                        {/* checkable */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.withCheckable, multiple: true }}
                            label={'Checkable'}
                            data={treeData.checkable_selection}
                        />
                        {/* asynchronous */}
                        <TreeSelectBase
                            placeholder='Please select'
                            label={'Asynchronous loading'}
                            multiple={false}
                            data={treeData.async_loading_selection} />
                        {/* show tree line */}
                        <TreeSelectBase
                            placeholder='Please select'
                            label={'Show Tree Line'}
                            data={treeData.treeline_selction}
                            multiple={false} />
                        {/* placement */}
                        <TreeSelectBase
                            placeholder="Please select"
                            label={'Placement'}
                            data={treeData.placement_selection}
                            multiple={false} />
                        {/* variants */}
                        <TreeSelectBase
                            config={treeSelectPresets.default}
                            label={'Variants'}
                            data={treeData.variants_selection}
                            showAllVariant={true}
                        />
                        {/* status */}
                        <TreeSelectBase
                            config={treeSelectPresets.default}
                            label={'Status'}
                            data={treeData.status_selection}
                            showStatus={true}
                        />
                        {/* max count */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, multiple: true }}
                            label={'Max Count'}
                            data={treeData.max_count_selection}
                        />
                        {/* prefix and suffix */}
                        <TreeSelectBase
                            placeholder="Please select"
                            label={'Prefix and Suffix'}
                            multiple={false}
                            data={treeData.prefix_suffix_selection} />
                    </div>
                </div>
            </section >
        </>
    )
}
export default TreeSelectReusableComponent