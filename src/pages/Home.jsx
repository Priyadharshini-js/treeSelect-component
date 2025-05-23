import React, { useState } from 'react'
import BasicTreeSelect from '../components/TreeSelect/variants/BasicTreeSelect';
import MultipleSelect from '../components/TreeSelect/variants/MultipleSelect';
import GenerateSelect from '../components/TreeSelect/variants/GenerateSelect';
import CheckableSelect from '../components/TreeSelect/variants/CheckableSelect';
import AsyncSelect from '../components/TreeSelect/variants/AsyncSelect';
import ShowTreeLineSelect from '../components/TreeSelect/variants/ShowTreeLineSelect';
import PlacementSelect from '../components/TreeSelect/variants/PlacementSelect';
import VariantsSelect from '../components/TreeSelect/variants/VariantsSelect';
import StatusSelect from '../components/TreeSelect/variants/StatusSelect';
import MaxCountSelect from '../components/TreeSelect/variants/maxCountSelect';
import PrefixSuffixSelect from '../components/TreeSelect/variants/PrefixSuffixSelect';

const TreeSelectReusableComponent = () => {

    // const [value, setValue] = useState("");

    return (
        <>
            <section>
                <div className='container mt-5'>
                    <div className='heading-wrapper'>
                        <h2 className='mb-4'>TreeSelect</h2>
                        <h4>Examples</h4>
                    </div>
                    <div className='tree-sections row row-15'>
                        <BasicTreeSelect />
                        <MultipleSelect />
                        <GenerateSelect />
                        <CheckableSelect />
                        <AsyncSelect />
                        <ShowTreeLineSelect />
                        <PlacementSelect />
                        <VariantsSelect />
                        <StatusSelect />
                        <MaxCountSelect />
                        <PrefixSuffixSelect />
                    </div>
                </div>
            </section>
        </>
    )
}
export default TreeSelectReusableComponent