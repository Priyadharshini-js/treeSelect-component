multiple={multiple} need to check.


basic - expand all default
multi - expand all default
generate - expand all default
checkabl - not expand initially
aync - not expand initially
show tree line - not expand initially
placement - expand all default
variants - no data
status - no data
max -count - not expand initially
prefix - expand all default




  <div className='tree-sections'>
                        {/* basic tree select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.searchable, treeDefaultExpandAll: true }}
                            label={"Basic"}
                            data={treeData.basic_selection}
                        />
                        {/* multiple select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.searchable, multiple: true, treeDefaultExpandAll: true }}
                            label={"Multiple Selection"}
                            data={treeData.multiple_selection}
                        />
                        {/* generate select */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: true }}
                            label={'Generate from tree data'}
                            data={treeData.generate_selection}
                        />
                        {/* checkable */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.withCheckable, multiple: true, treeDefaultExpandAll: false }}
                            label={'Checkable'}
                            data={treeData.checkable_selection}
                        />
                        {/* asynchronous */}
                        <TreeSelectBase
                            placeholder='Please select'
                            label={'Asynchronous loading'}
                            multiple={false}
                            data={treeData.async_loading_selection}
                        />
                        {/* show tree line */}
                        <TreeSelectBase
                            config={{ ...treeSelectPresets.default, treeDefaultExpandAll: false }}
                            label={'Show Tree Line'}
                            data={treeData.treeline_selction}
                        />
                        {/* placement */}
                        <TreeSelectBase
                            placeholder="Please select"
                            label={'Placement'}
                            data={treeData.placement_selection}
                            multiple={false}
                        />
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
                            config={{ ...treeSelectPresets.default, multiple: true, treeDefaultExpandAll: false }}
                            label={'Max Count'}
                            data={treeData.max_count_selection}
                        />
                        {/* prefix and suffix */}
                        <TreeSelectBase
                            placeholder="Please select"
                            label={'Prefix and Suffix'}
                            multiple={false}
                            data={treeData.prefix_suffix_selection}
                        />

                    </div>

