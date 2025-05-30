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
                    <div className='tree-sections'>
                        {/* basic tree select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.searchable, treeDefaultExpandAll: true }}
                            label={"Basic"}
                            data={treeData.basic_selection}
                        />
                        {/* generate select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: true }}
                            label={'Generate from tree data'}
                            data={treeData.generate_selection}
                        />
                        {/* asynchronous */}
                        <TreeSelectBase
                            placeholder='Please select'
                            label={'Asynchronous loading'}
                            multiple={false}
                            data={treeData.async_loading_selection}
                        />
                        {/* placement */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: true }}
                            label={'Placement'}
                            data={treeData.placement_selection}
                            showAllPlacement={true}
                        />
                        {/* status */}
                        <TreeSelectBase
                            config={treeSelectPresets.default}
                            label={'Status'}
                            data={treeData.status_selection}
                            showStatus={true}
                        />
                        {/* prefix and suffix */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: true, prefix: 'prefix' }}
                            label={'Prefix and Suffix'}
                            data={treeData.prefix_suffix_selection}
                        />
                        {/* multiple select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.searchable, multiple: true, treeDefaultExpandAll: true }}
                            label={"Multiple Selection"}
                            data={treeData.multiple_selection}
                        />
                        {/* checkable */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.withCheckable, multiple: true, treeDefaultExpandAll: false }}
                            label={'Checkable'}
                            data={treeData.checkable_selection}
                        />
                        {/* show tree line */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: false }}
                            label={'Show Tree Line'}
                            data={treeData.treeline_selction}
                        />
                        {/* variants */}
                        <TreeSelectBase
                            config={treeSelectPresets.default}
                            label={'Variants'}
                            data={treeData.variants_selection}
                            showAllVariant={true}
                        />
                        {/* max count */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: false }}
                            label={'Max Count'}
                            data={treeData.max_count_selection}
                        />
                    </div>
                </div>
            </section >
        </>
    )
}
export default TreeSelectReusableComponent