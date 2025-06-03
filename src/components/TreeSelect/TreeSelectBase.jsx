import React, { useState, useRef, useEffect, useMemo } from 'react'
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
import { baseConfig } from '../config/treeSelectProps'


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

    const [isOpen, setIsOpen] = useState(null);
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
    const renderIcon = (type) => {
        const icon = treeIcon[type];
        return icon ? <FontAwesomeIcon icon={icon} /> : null;
    };

    //function to toggle dropdown
    const toggleDropdown = (id) => { //id for which dropdown to open
        if (disabled) return;

        if (isOpen === id) {
            setIsOpen(null); // close if already open
        } else {
            if (treeDefaultExpandAll) { // if expand all is true
                const allParentValues = new Set();
                const findParents = (nodes) => {
                    nodes.forEach(node => {
                        if (node.children && node.children.length > 0) {
                            allParentValues.add(node.value); // add parent value
                            findParents(node.children); // find parent of children
                        }
                    });
                };
                findParents(treeDataSet); // find all parent values
                setExpandedNodes(allParentValues); // set expanded nodes
            } else {
                setExpandedNodes(new Set()); // reset expanded nodes
            }
            setIsOpen(id); // open the clicked dropdown
        }
    };


    const togglePlacement = (pos) => {
        setCurrentPlacement(pos);
    }

    const parentMap = useMemo(() => {
        const map = new Map();
        const buildMap = (nodes, parent = null) => {
            nodes.forEach(node => {
                if (parent) map.set(node.value, parent);
                if (node.children) buildMap(node.children, node);
            });
        };
        buildMap(treeDataSet);
        return map;
    }, [treeDataSet]);

    const handleSelect = (item) => {
        if (!multiple) {
            setSelected(item.value);
            setIsOpen(false);
            onChange?.(item.value);
            return;
        }

        const collectAllChildValues = (node) => {
            const values = [node.value];
            if (node.children) {
                node.children.forEach(child => {
                    values.push(...collectAllChildValues(child));
                });
            }
            return values;
        };

        if (treeCheckable) {
            //multiple & checkable
            const toggleWithChildren = (node) => {
                setSelected(prev => {
                    const selectedSet = new Set(prev);
                    const value = node.value;

                    if (selectedSet.has(value)) {
                        // Deselect node and children
                        const allValues = collectAllChildValues(node);
                        allValues.forEach(val => selectedSet.delete(val));
                    } else {
                        // Add node and children
                        const allValues = collectAllChildValues(node);
                        allValues.forEach(val => selectedSet.add(val));
                    }

                    // Upward sync: Check parents
                    let current = node;
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
                    } else {
                        setDisabledValues(new Set());
                    }
                    onChange?.(finalSelected);
                    return finalSelected;
                });
            };
            toggleWithChildren(item);
        } else {
            //if multiple but not checkable
            setSelected(prev => {
                const updated = prev.includes(item.value) // check if item is already selected
                    ? prev.filter(val => val !== item.value) // remove item
                    : [...prev, item.value]; // add item
                onChange?.(updated);
                return updated;
            });
        }
    };

    const collapseSelectedWithParents = (selectedValues, nodes) => {
        // Convert selected to Set for easier checking
        const selectedSet = new Set(selectedValues);

        const helper = (node) => {
            if (!node.children || node.children.length === 0) {
                // Leaf node, return if selected or not
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

        // Remove duplicates just in case
        return Array.from(new Set(collapsed));
    };


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


    const handleExpandCollapse = (value) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    //handle outside click
    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Flatten all levels to match selected values with their titles.
    const flattenData = (nodes) => {
        return nodes.flatMap(node => { // flatten - combination of map and flat, which gives a flat single array
            const children = node.children ? flattenData(node.children) : [];
            return [node, ...children]; // return node and children
        });
    };

    // if treeDataSet changes then flatten again 
    const flatData = useMemo(() => flattenData(treeDataSet), [treeDataSet]);


    // selected mmulitple or single
    const collapsedSelected = multiple && treeCheckable
        ? collapseSelectedWithParents(selected, treeDataSet)
        : selected;

    const selectedLabel = multiple // Multiple
        ? collapsedSelected.map(value => {
            const item = flatData.find(i => i.value === value); //why flatData find, becz flatData is already flattened(having children)
            return (
                <span key={value} className="selected-pill">
                    {item?.title}
                    <span
                        className="remove-pill ms-2"
                        onClick={(e) => {
                            e.stopPropagation(); // prevent dropdown toggle
                            if (item) {
                                handleSelect(item);  // Toggle selection properly
                            }
                        }}
                    >
                        ×
                    </span>
                </span>
            );
        })
        : flatData.find(item => item.value === selected)?.title || placeholder; // Find the selected item (not multiple, single) and display its title

    const isPlaceholderVisible =
        (!multiple && !selected) || (multiple && selected.length === 0);


    //variant type [borderless, filled, outlined, underlined]
    const renderVariant = (variantType, size, placement) => {
        const isOpenForThis = isOpen === variantType;
        return (
            <div
                ref={containerRef}
                key={variantType}
                className={`tree-select-container ${variantType} ${disabled ? 'disabled' : ''}`}
            >
                <div
                    className={`tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
                    onClick={() => toggleDropdown(variantType)}
                >
                    <div className="selected-content">
                        {isPlaceholderVisible ? placeholder : selectedLabel}
                    </div>
                    <span className="arrow font-icons">
                        {isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown')}
                    </span>
                </div>
                {isOpenForThis && (
                    <div className={`dropdown-placement ${placement}`}>
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
        )
    };

    //status type [ error, warning]
    const renderShowStatus = (statusType, size, placement, variant) => {
        const isOpenForThis = isOpen === statusType;
        return (
            <div
                ref={containerRef}
                key={statusType}
                className={`tree-select-container ${statusType} ${variant} ${disabled ? 'disabled' : ''}`}
            >
                <div
                    className={`tree-select-input  ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
                    onClick={() => toggleDropdown(statusType)}
                >
                    <div className="selected-content">
                        {isPlaceholderVisible ? placeholder : selectedLabel}
                    </div>
                    <span className="arrow font-icons">
                        {isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown')}
                    </span>
                </div>
                {isOpenForThis && (
                    <div className={`dropdown-placement ${placement}`}>
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
                            treeLine={treeLine}
                        />
                    </div>
                )}
            </div>
        )
    };

    // render prefix
    const renderAffixes = (placement, size, variant) => (
        <div
            ref={containerRef}
            className={`tree-select-container ${variant} ${disabled ? 'disabled' : ''}`}
        >
            <div
                className={`tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
                onClick={toggleDropdown}
            >
                <div className="selected-content">
                    {isPlaceholderVisible ? placeholder : selectedLabel}
                </div>
                <span className="arrow font-icons">
                    {isOpen ? renderIcon('faSearch') : renderIcon('faAngleDown')}
                </span>
            </div>

            {isOpen && (
                <div className={`dropdown-placement ${placement}`}>
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
                        treeLine={treeLine}
                    />
                </div>
            )}

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

    // placement type [topright, topleft, bottomleft, bottomright]
    const renderPlacement = (placementType, variant, size) => (
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
            <div
                ref={containerRef}
                key={placementType}
                className={`tree-select-container ${variant} ${disabled ? 'disabled' : ''}`}
            >
                <div
                    className={`tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
                    onClick={toggleDropdown}
                >
                    <div className="selected-content">
                        {isPlaceholderVisible ? placeholder : selectedLabel}
                    </div>
                    <span className="arrow font-icons">
                        {isOpen ? renderIcon('faSearch') : renderIcon('faAngleDown')}
                    </span>
                </div>
                {isOpen && (
                    <div className={`dropdown-placement ${currentPlacement}`}>
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
                            treeLine={treeLine}

                        />
                    </div>
                )}
            </div>
        </>
    )

    // tree line (show tree line)
    const renderTreeLine = (variant, size, placement) => {
        const isOpenForThis = isOpen === 'treeLine';
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
                < div
                    ref={containerRef}
                    className={`tree-select-container ${variant} ${disabled ? 'disabled' : ''}`
                    }
                >
                    <div
                        className={`tree-select-input ${size} ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
                        onClick={() => toggleDropdown('treeLine')}
                    >
                        <div className="selected-content">
                            {isPlaceholderVisible ? placeholder : selectedLabel}
                        </div>
                        <span className="arrow font-icons">
                            {isOpenForThis ? renderIcon('faSearch') : renderIcon('faAngleDown')}
                        </span>
                    </div>
                    {
                        isOpenForThis && (
                            <div className={`dropdown-placement ${placement}`}>
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
                        )
                    }

                </div >
            </>
        )
    }


    return (
        <div className='card-section'>
            <div className='card-body'>
                <p>{label}</p>
                {(showStatus) ? (
                    status.map((s) => renderShowStatus(s, size, placement, variant))
                ) : (showAllVariant) ? (
                    variant.map((v) => renderVariant(v, size, placement))
                ) : (prefix) ? (
                    renderAffixes(placement, size, variant)
                ) : (showAllPlacement) ? (
                    renderPlacement(currentPlacement, variant, size)
                ) : (treeLine) ? (
                    renderTreeLine(variant, size, placement)
                ) : (
                    renderVariant(variant, size, placement)
                )}
            </div>
        </div>
    );
};

export default TreeSelectBase;