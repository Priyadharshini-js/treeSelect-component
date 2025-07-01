import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import TreeDropdown from './TreeDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleDown,
    faSearch,
    faCaretDown,
    faCaretRight,
    faFileImage,
    faPlusSquare,
    faMinusSquare
} from '@fortawesome/free-solid-svg-icons'
import { baseConfig, treeSelectBasePropTypes } from '../config/treeSelectProps'

const CONSTANTS = {
    TREE_LINE: 'treeLine'
}

const TreeSelectBase = ({ config = {},
    label,
    data,
    showAllVariant = false,
    showStatus = false,
    showAllPlacement = false
}) => {
    const containerRef = useRef(null);
    const mergedConfig = { ...baseConfig, ...config };
    const {
        placeholder,
        multiple,
        onChange,
        disabled,
        treeCheckable,
        treeDefaultExpandAll,
        prefix,
        placement,
        variant,
        status,
        maxCount,
        treeLine,
        size,
    } = mergedConfig;

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(multiple ? [] : null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const [currentPlacement, setCurrentPlacement] = useState(placement[0]);
    const [disabledValues, setDisabledValues] = useState(new Set());
    const treeDataSet = data;

    const treeIcon = {
        'faAngleDown': faAngleDown,
        'faSearch': faSearch,
        'faCaretDown': faCaretDown,
        'faCaretRight': faCaretRight,
        'faFileImage': faFileImage,
        'faPlusSquare': faPlusSquare,
        'faMinusSquare': faMinusSquare
    }


    //function to render icon
    const renderIcon = useCallback((type) => {
        const icon = treeIcon[type];
        return icon ? <FontAwesomeIcon icon={icon} /> : null;
    }, [treeIcon]);

    //function to toggle dropdown
    const toggleDropdown = useCallback((id) => {
        if (disabled) return;

        if (isOpen === id) {
            setIsOpen(false);
        } else {
            if (treeDefaultExpandAll) {
                const allParentValues = new Set();
                const findParents = (nodes) => {
                    nodes.forEach(node => {
                        if (node.children && node.children.length > 0) {
                            allParentValues.add(node.value);
                            findParents(node.children);
                        }
                    });
                };
                findParents(treeDataSet);
                setExpandedNodes(allParentValues);
            } else {
                setExpandedNodes(new Set());
            }
            setIsOpen(id);
        }
    }, [disabled, isOpen, treeDefaultExpandAll, treeDataSet])


    const togglePlacement = useCallback((position) => {
        setCurrentPlacement(position);
    }, [])

    const parentMap = useMemo(() => {
        const map = new Map();
        const buildMap = (nodes, parent = null) => {
            nodes.forEach(node => {
                if (parent) map.set(node.value, parent); //full parent obj
                if (node.children) buildMap(node.children, node);
            });
        };
        buildMap(treeDataSet);
        return map;
    }, [treeDataSet]);


    //collapses a tree structure by selecting only the parent nodes when all their children are selected
    const collapseSelectedWithParents = (selectedValues, nodes) => {
        const selectedSet = new Set(selectedValues);

        const helper = (node) => {
            if (!node.children || node.children.length === 0) {
                return selectedSet.has(node.value) ? [node.value] : [];
            }

            // For parents: check all children recursively
            const childrenSelections = node.children.flatMap(child => helper(child));

            // Check if all children are selected (collapsed)
            const allChildrenSelected = node.children.every(child => {
                return selectedSet.has(child.value) || childrenSelections.includes(child.value);
            });

            if (allChildrenSelected) {
                // If all children selected, return only parent value
                return [node.value];
            }

            // Otherwise, return collected children selections
            return childrenSelections;
        };

        // Run for all root nodes and flatten
        const collapsed = nodes.flatMap(node => helper(node));


        return Array.from(new Set(collapsed));
    };

    // function to get top level selected(like parent)
    const getTopLevelSelected = (selectedValues, nodes) => {
        const selectedSet = new Set(selectedValues);
        const result = [];

        const isFullySelected = (node) => {
            if (!node.children || node.children.length === 0) return selectedSet.has(node.value);

            return node.children.every(child => isFullySelected(child));
        };
        nodes.forEach(node => {
            if (isFullySelected(node)) {
                result.push(node.value);
            }
        });

        return result;
    };

    // Helper: Collect all child values recursively
    const collectAllChildValues = (node) => {
        const values = [node.value];
        if (node.children) {
            node.children.forEach(child => {
                values.push(...collectAllChildValues(child));
            });
        }
        return values;
    };

    // Helper: Mark disabled nodes if maxCount is reached
    const markDisabledNodes = (treeDataSet, topLevel, setDisabledValues) => {
        const disabled = new Set();
        const markDisabled = (nodes) => {
            nodes.forEach(n => {
                if (!topLevel.includes(n.value)) {
                    disabled.add(n.value);
                    if (n.children) markDisabled(n.children);
                }
            });
        };
        markDisabled(treeDataSet);
        setDisabledValues(disabled);
    };

    // Multiple & checkable selection logic
    const handleMultipleCheckable = (item, {
        setSelected,
        parentMap,
        getTopLevelSelected,
        treeDataSet,
        maxCount,
        setDisabledValues,
        onChange
    }) => {
        setSelected(prev => {
            const selectedSet = new Set(prev);
            const value = item.value;

            if (selectedSet.has(value)) {
                // Deselect node and children
                collectAllChildValues(item).forEach(val => selectedSet.delete(val));
            } else {
                // Add node and children
                collectAllChildValues(item).forEach(val => selectedSet.add(val));
            }

            let current = item;
            while (parentMap.has(current.value)) {
                const parent = parentMap.get(current.value);
                const allChildrenSelected = parent.children.every(child => selectedSet.has(child.value));
                if (allChildrenSelected) {
                    selectedSet.add(parent.value);
                } else {
                    selectedSet.delete(parent.value);
                }
                current = parent;
            }

            const finalSelected = Array.from(selectedSet);
            const topLevel = getTopLevelSelected(finalSelected, treeDataSet);

            // Disable remaining options if maxCount reached
            if (maxCount && topLevel.length >= maxCount) {
                markDisabledNodes(treeDataSet, topLevel, setDisabledValues);
            } else {
                setDisabledValues(new Set());
            }
            onChange?.(finalSelected);
            return finalSelected;
        });
    };

    // Multiple but not checkable
    const handleMultiple = (item, setSelected, onChange) => {
        setSelected(prev => {
            const updated = prev.includes(item.value)
                ? prev.filter(val => val !== item.value)
                : [...prev, item.value];
            onChange?.(updated);
            return updated;
        });
    };

    // Single selection
    const handleSingle = (item, setSelected, setIsOpen, onChange) => {
        setSelected(item.value);
        setIsOpen(false);
        onChange?.(item.value);
    };

    // funtion for handleselect handler
    const handleSelect = useCallback((item) => {
        if (!multiple) {
            handleSingle(item, setSelected, setIsOpen, onChange);
        } else if (treeCheckable) {
            handleMultipleCheckable(item, {
                setSelected,
                parentMap,
                getTopLevelSelected,
                treeDataSet,
                maxCount,
                setDisabledValues,
                onChange
            });
        } else {
            handleMultiple(item, setSelected, onChange);
        }
    }, [
        multiple,
        treeCheckable,
        onChange,
        parentMap,
        getTopLevelSelected,
        treeDataSet,
        maxCount,
    ]);


    // handle expand collapse
    const handleExpandCollapse = useCallback((value) => {
        setExpandedNodes(prev => { // copy the previous expanded nodes
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    }, [])

    //useEffect
    useEffect(() => {
        //handle outside click
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [containerRef]);

    // Flatten all levels to match selected values with their titles.
    const flattenData = (nodes) => {
        return nodes.flatMap(node => {
            const children = node.children ? flattenData(node.children) : [];
            return [node, ...children];
        });
    };

    // if treeDataSet changes then flatten again 
    const flatData = useMemo(() => flattenData(treeDataSet), [treeDataSet]);


    // selected mmulitple or single
    const collapsedSelected = useMemo(() => (
        multiple && treeCheckable
            ? collapseSelectedWithParents(selected, treeDataSet)
            : selected
    ), [multiple, treeCheckable, selected, treeDataSet]);

    const selectedLabel = useMemo(() => {
        if (multiple) {
            return collapsedSelected.map(value => {
                const item = flatData.find(i => i.value === value);
                return (
                    <span key={value} className="selected-pill">
                        {item?.title}
                        <span
                            className="remove-pill ms-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (item) {
                                    handleSelect(item);
                                }
                            }}
                        >
                            ×
                        </span>
                    </span>
                );
            });
        }
        return flatData.find(item => item.value === selected)?.title || placeholder;
    }, [multiple, collapsedSelected, flatData, selected, placeholder, handleSelect]);


    const isPlaceholderVisible =
        (!multiple && !selected) || (multiple && selected.length === 0);


    //common dropdown render
    const renderDropdown = ({
        isOpenForThis,
        containerClass,
        inputClass,
        onInputClick,
        selectedContent,
        arrowIcon,
        dropdownClass,
        showDropdown = true,
        disabledValues = undefined
    }) => (
        <div
            ref={containerRef}
            className={containerClass}
        >
            <div
                className={inputClass}
                onClick={onInputClick}
            >
                <div className="selected-content">
                    {selectedContent}
                </div>
                <span className="arrow font-icons">
                    {arrowIcon}
                </span>
            </div>
            {isOpenForThis && showDropdown && (
                <div className={dropdownClass}>
                    <TreeDropdown
                        data={treeDataSet}
                        selected={selected}
                        onSelect={handleSelect}
                        multiple={multiple}
                        treeIcon={treeIcon}
                        renderIcon={renderIcon}
                        treeCheckable={treeCheckable}
                        expandedNodes={expandedNodes}
                        handleExpandCollapse={handleExpandCollapse}
                        disabledValues={disabledValues}
                        treeLine={treeLine}
                    />
                </div>
            )}
        </div >

    );


    //variant dropdown
    const renderVariant = (variantType, size, placement, status) => {
        const isOpenForThis = isOpen === variantType;
        return renderDropdown(
            {
                isOpenForThis,
                containerClass: `tree-select-container ${variantType} ${status} ${disabled ? 'disabled' : ''}`,
                inputClass: `tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`,
                onInputClick: () => toggleDropdown(variantType),
                selectedContent: isPlaceholderVisible ? placeholder : selectedLabel,
                arrowIcon: isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown'),
                dropdownClass: `dropdown-placement ${placement}`,
                disabledValues
            }
        )
    };

    // Status dropdown
    const renderShowStatus = (statusType, size, placement, variant) => {
        const isOpenForThis = isOpen === statusType;
        return renderDropdown({
            isOpenForThis,
            containerClass: `tree-select-container ${statusType} ${variant} ${disabled ? 'disabled' : ''}`,
            inputClass: `tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`,
            onInputClick: () => toggleDropdown(statusType),
            selectedContent: isPlaceholderVisible ? placeholder : selectedLabel,
            arrowIcon: isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown'),
            dropdownClass: `dropdown-placement ${placement}`,
            disabledValues
        });
    };

    // Prefix/affix dropdown
    const renderAffixes = (placement, size, variant, status) => {
        const isOpenForThis = isOpen;
        return (
            <div
                ref={containerRef}
                className={`tree-select-container ${variant} ${status} ${disabled ? 'disabled' : ''}`}
            >
                {renderDropdown({
                    isOpenForThis,
                    containerClass: '', // Already set above
                    inputClass: `tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`,
                    onInputClick: toggleDropdown,
                    selectedContent: isPlaceholderVisible ? placeholder : selectedLabel,
                    arrowIcon: isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown'),
                    dropdownClass: `dropdown-placement ${placement}`,
                    disabledValues
                })}
                <input
                    type="text"
                    className={`mt-2 tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''} `}
                    onClick={toggleDropdown}
                    readOnly
                    value={`Prefix: ${isPlaceholderVisible
                        ? ''
                        : multiple
                            ? selected
                                .map(value => flatData.find(i => i.value === value)?.title)
                                .filter(Boolean)
                                .join(', ')
                            : flatData.find(i => i.value === selected)?.title || ''
                        }`}
                />
            </div>
        );
    };

    // Placement dropdown
    const renderPlacement = (placementType, variant, size, status) => {
        const isOpenForThis = isOpen;
        return (
            <>
                <div className='toggle-placement'>
                    {placement.map(p => (
                        <div
                            key={p}
                            onClick={() => togglePlacement(p)}
                            className={currentPlacement === p ? 'active' : ''}
                        >
                            {p}
                        </div>
                    ))}
                </div>
                {renderDropdown({
                    isOpenForThis,
                    containerClass: `tree-select-container ${variant} ${status} ${disabled ? 'disabled' : ''}`,
                    inputClass: `tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`,
                    onInputClick: toggleDropdown,
                    selectedContent: isPlaceholderVisible ? placeholder : selectedLabel,
                    arrowIcon: isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown'),
                    dropdownClass: `dropdown-placement ${currentPlacement}`,
                    disabledValues
                })}
            </>
        );
    };

    // Tree line dropdown
    const renderTreeLine = (variant, size, placement, status) => {
        const isOpenForThis = isOpen === CONSTANTS.TREE_LINE;
        return (
            <>
                <div className='tree-line-wrapper row row-10'>
                    <div className='tree-line col-4'>
                        <div className="btn btn-pill" id="showIcon">
                            <input type="checkbox" className="checkbox" />
                            <div className="knob"></div>
                            <div className="btn-bg">
                                <span className="toggle-label">showIcon</span>
                            </div>
                        </div>
                    </div>
                    <div className='tree-line col-4'>
                        <div className="btn btn-pill" id="treeLine" >
                            <input type="checkbox" className="checkbox" checked />
                            <div className="knob"></div>
                            <div className="btn-bg">
                                <span className="toggle-label">treeLine</span>
                            </div>
                        </div>
                    </div>
                    <div className='tree-line col-4'>
                        <div className="btn btn-pill" id="showLeafIcon">
                            <input type="checkbox" className="checkbox" />
                            <div className="knob"></div>
                            <div className="btn-bg">
                                <span className="toggle-label">showLeafIcon</span>
                            </div>
                        </div>
                    </div>
                </div>
                {renderDropdown({
                    isOpenForThis,
                    containerClass: `tree-select-container ${variant} ${status} ${disabled ? 'disabled' : ''}`,
                    inputClass: `tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`,
                    onInputClick: () => toggleDropdown(CONSTANTS.TREE_LINE),
                    selectedContent: isPlaceholderVisible ? placeholder : selectedLabel,
                    arrowIcon: isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown'),
                    dropdownClass: `dropdown-placement ${placement}`,
                    disabledValues
                })}
            </>
        );
    };

    // Array of render modes with their conditions and renderers
    const renderModes = [
        {
            condition: showStatus && Array.isArray(status),
            render: () => status.map((s, index) => (
                <div key={index}>
                    {renderShowStatus(s, size, placement, variant)}
                </div>
            ))
        },
        {
            condition: showAllVariant && Array.isArray(variant),
            render: () => variant.map((v, index) => (
                <div key={index}>
                    {renderVariant(v, size, placement, status)}
                </div>
            ))
        },
        {
            condition: prefix,
            render: () => renderAffixes(placement, size, variant, status),
        },
        {
            condition: showAllPlacement,
            render: () => renderPlacement(currentPlacement, variant, size, status),
        },
        {
            condition: treeLine,
            render: () => renderTreeLine(variant, size, placement, status),
        },
        {
            condition: true,
            render: () => renderVariant(variant, size, placement, status),
        },
    ];

    const renderContent = renderModes.find(mode => mode.condition).render();

    return (
        <div className='card-section'>
            <div className='card-body'>
                <p>{label}</p>
                {renderContent}
            </div>
        </div>
    );
};

export default TreeSelectBase;

TreeSelectBase.propTypes = treeSelectBasePropTypes;
