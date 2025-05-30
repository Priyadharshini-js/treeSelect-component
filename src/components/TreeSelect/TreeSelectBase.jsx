import React, { useState, useRef, useEffect, useMemo } from 'react'
import TreeDropdown from './TreeDropdown'
import { treeData } from '../config/treeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faCaretDown, faCaretRight, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { baseConfig } from '../config/treeSelectProps'


const TreeSelectBase = ({ config = {}, label, data, showAllVariant = false, showStatus = false, showAllPlacement = false }) => {
    const containerRef = useRef(null);
    const mergedConfig = { ...baseConfig, ...config };
    const {
        placeholder,
        multiple,
        onChange,
        disabled,
        showSearch,
        allowClear,
        size,
        treeCheckable,
        treeDefaultExpandAll,
        prefix,
        placement,
        variant,
        status
    } = mergedConfig;

    const defaultVariant = 'outlined';
    const defaultPlacement = 'bottomLeft';


    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(multiple ? [] : null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const [currentPlacement, setCurrentPlacement] = useState(defaultPlacement);

    const treeDataSet = data || treeData.basic_selection;


    const treeIcon = {
        'faAngleDown': faAngleDown,
        'faSearch': faSearch,
        'faCaretDown': faCaretDown,
        'faCaretRight': faCaretRight,
        'faFileImage': faFileImage,
    }

    const renderIcon = (type) => {
        const icon = treeIcon[type];
        return icon ? <FontAwesomeIcon icon={icon} /> : null;
    };

    const toggleDropdown = () => {
        if (!disabled) {
            if (!isOpen) { // dropdown is about to open
                if (treeDefaultExpandAll) {
                    // expand all nodes - collect all parent node values
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
                    setExpandedNodes(new Set()); // collapse all nodes
                }
            }
            setIsOpen(prev => !prev);
        }
    };

    const togglePlacement = (pos) => {
        setCurrentPlacement(pos);
    }

    const handleSelect = (item) => {
        if (multiple) {
            setSelected(prev => {
                const updated = prev.includes(item.value)
                    ? prev.filter(val => val !== item.value)
                    : [...prev, item.value];
                onChange?.(updated);
                return updated;
            });
        } else {
            setSelected(item.value);
            setIsOpen(false);
            onChange?.(item.value);
        }
    };

    // const isExpanded = expandedNodes.has(item.value);

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

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Flatten all levels to match selected values with their titles, to retrieve all nested items for rendering selected labels and values.
    const flattenData = (nodes) => {
        return nodes.flatMap(node => {
            const children = node.children ? flattenData(node.children) : [];
            return [node, ...children];
        });
    };

    // const flatData = flattenData(treeDataSet);
    const flatData = useMemo(() => flattenData(treeDataSet), [treeDataSet]);

    const selectedLabel = multiple
        ? selected.map(value => {
            const item = flatData.find(i => i.value === value);
            return (
                <span key={value} className="selected-pill">
                    {item?.title}
                    <span className="remove-pill ms-2" onClick={(e) => {
                        e.stopPropagation(); // prevent dropdown from toggling
                        setSelected(prev => {
                            const updated = prev.filter(val => val !== item.value);
                            onChange?.(updated);
                            return updated;
                        });
                    }}>×</span>
                </span>
            )
        })
        : flatData.find(item => item.value === selected)?.title || placeholder;


    const isPlaceholderVisible =
        (!multiple && !selected) || (multiple && selected.length === 0);


    //variant type [borderless, filled, outlined, underlined]
    const renderVariant = (variantType) => (
        <div
            ref={containerRef}
            key={variantType}
            className={`tree-select-container ${variantType} ${disabled ? 'disabled' : ''}`}
        >
            <div
                className={`tree-select-input ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
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
                />
            )}

        </div>
    );

    //status type [ error, warning]
    const renderShowStatus = (statusType) => (
        <div
            ref={containerRef}
            key={statusType}
            className={`tree-select-container ${statusType} ${disabled ? 'disabled' : ''}`}
        >
            <div
                className={`tree-select-input ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
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

                />
            )}
        </div>
    );

    // prefix
    const renderAffixes = () => (
        <div
            ref={containerRef}
            className={`tree-select-container ${disabled ? 'disabled' : ''}`}
        >
            <div
                className={`tree-select-input ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
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
                />
            )}

            <input
                type="text"
                className="prefix-input mt-2 tree-select-input"
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
    const renderPlacement = (placementType) => (
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
                className={`tree-select-container ${disabled ? 'disabled' : ''}`}
            >
                <div
                    className={`tree-select-input w-25 ${isPlaceholderVisible ? 'placeholder-color' : ''}`}
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
                        />
                    </div>
                )}
            </div>
        </>
    )


    return (
        <div className='card-section'>
            <div className='card-body'>
                <p>{label}</p>
                {(showStatus) ? (
                    status.map((s) => renderShowStatus(s))
                ) : (showAllVariant) ? (
                    variant.map((v) => renderVariant(v))
                ) : (prefix) ? (
                    renderAffixes()
                ) : (showAllPlacement) ? (
                    renderPlacement()
                ) : (
                    renderVariant(defaultVariant)
                )}
            </div>
        </div>
    );
};

export default TreeSelectBase;
