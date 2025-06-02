import React from 'react'
import TreeSelectBase from '../components/TreeSelect/TreeSelectBase';
import { treeData } from '../components/config/treeData'
// import { treeSelectPresets } from '../components/config/treeSelectProps'

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
                            config={{ treeDefaultExpandAll: true }}
                            label={"Basic"}
                            data={treeData.basic_selection}
                        />
                        {/* generate select */}
                        <TreeSelectBase
                            config={{ treeDefaultExpandAll: true }}
                            label={'Generate from tree data'}
                            data={treeData.generate_selection}
                        />
                        {/* asynchronous */}
                        <TreeSelectBase
                            config={{ treeDefaultExpandAll: true }}
                            label={'Asynchronous loading'}
                            data={treeData.async_loading_selection}
                        />
                        {/* placement */}
                        <TreeSelectBase
                            config={{ treeDefaultExpandAll: true }}
                            label={'Placement'}
                            data={treeData.placement_selection}
                            showAllPlacement={true}
                        />
                        {/* status */}
                        <TreeSelectBase
                            label={'Status'}
                            data={treeData.status_selection}
                            showStatus={true}
                        />
                        {/* prefix and suffix */}
                        <TreeSelectBase
                            config={{ treeDefaultExpandAll: true, prefix: 'prefix' }}
                            label={'Prefix and Suffix'}
                            data={treeData.prefix_suffix_selection}
                        />
                        {/* multiple select */}
                        <TreeSelectBase
                            config={{ multiple: true, treeDefaultExpandAll: true }}
                            label={"Multiple Selection"}
                            data={treeData.multiple_selection}
                        />
                        {/* checkable */}
                        <TreeSelectBase
                            config={{ multiple: true, treeDefaultExpandAll: false, treeCheckable: true }}
                            label={'Checkable'}
                            data={treeData.checkable_selection}
                        />
                        {/* show tree line */}
                        <TreeSelectBase
                            config={{ treeDefaultExpandAll: true, placeholder: "", treeLine: true }}
                            label={'Show Tree Line'}
                            data={treeData.treeline_selection}
                        />
                        {/* variants */}
                        <TreeSelectBase
                            label={'Variants'}
                            data={treeData.variants_selection}
                            showAllVariant={true}
                        />
                        {/* max count */}
                        <TreeSelectBase
                            config={{ multiple: true, treeDefaultExpandAll: false, treeCheckable: true, maxCount: 1 }}
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