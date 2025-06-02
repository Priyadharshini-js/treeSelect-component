import React from 'react'
import TreeSelectBase from '../components/TreeSelect/TreeSelectBase';
import { treeData } from '../components/config/treeData'

const TreeSelectReusableComponent = () => {

    const props = [
        {
            label: 'Basic',
            config: { treeDefaultExpandAll: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.basic_selection,
        },
        {
            label: 'Generate from tree data',
            config: { treeDefaultExpandAll: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.generate_selection,
        },
        {
            label: 'Asynchronous loading',
            config: { treeDefaultExpandAll: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.async_loading_selection,
        },
        {
            label: 'Placement',
            config: { treeDefaultExpandAll: true, variant: 'outlined', size: 'small', },
            data: treeData.placement_selection,
            showAllPlacement: true,
        },
        {
            label: 'Status',
            config: { placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.status_selection,
            showStatus: true,
        },
        {
            label: 'Prefix and Suffix',
            config: { treeDefaultExpandAll: true, prefix: 'prefix', placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.prefix_suffix_selection,
        },
        {
            label: 'Multiple Selection',
            config: { multiple: true, treeDefaultExpandAll: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.multiple_selection,
        },
        {
            label: 'Checkable',
            config: { multiple: true, treeCheckable: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.checkable_selection,
        },
        {
            label: 'Show Tree Line',
            config: { treeDefaultExpandAll: true, placeholder: "", treeLine: true, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.treeline_selection,
        },
        {
            label: 'Variants',
            config: { multiple: true, treeCheckable: true, placement: 'bottomLeft', size: 'large' },
            data: treeData.variants_selection,
            showAllVariant: true
        },
        {
            label: 'Max Count',
            config: { multiple: true, treeCheckable: true, maxCount: 1, placement: 'bottomLeft', size: 'large', variant: 'outlined' },
            data: treeData.max_count_selection,
        },

    ]
    return (
        <>
            <section>
                <div className='container mt-5'>
                    <div className='heading-wrapper'>
                        <h2 className='mb-4'>TreeSelect</h2>
                        <h4>Examples</h4>
                    </div>
                    <div className='tree-sections'>
                        {props.map((item, index) => (
                            <TreeSelectBase
                                key={item.label}
                                label={item.label}
                                data={item.data}
                                config={item.config}
                                showAllPlacement={item.showAllPlacement}
                                showAllVariant={item.showAllVariant}
                                showStatus={item.showStatus}
                            />
                        ))}
                    </div>
                </div>
            </section >
        </>
    )
}
export default TreeSelectReusableComponent