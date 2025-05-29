import React, { useState, useRef, useEffect, useMemo } from 'react'
import TreeDropdown from './TreeDropdown'
import { treeData } from '../config/treeData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch, faCaretDown, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { baseConfig } from '../config/treeSelectProps'


const TreeSelectBase = ({ config = {}, label, data, showAllVariant = false, showStatus = false }) => {
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
    } = mergedConfig;

    const variant = ["borderless", "filled", "outlined", "underlined"];
    const defaultVariant = 'outlined';

    const status = ["error", "warning"];


    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(multiple ? [] : null);

    const treeDataSet = data || treeData.basic_selection;


    const treeIcon = {
        'faAngleDown': faAngleDown,
        'faSearch': faSearch,
        'faCaretDown': faCaretDown,
        'faFileImage': faFileImage,
    }

    const renderIcon = (type) => {
        const icon = treeIcon[type];
        return icon ? <FontAwesomeIcon icon={icon} /> : null;
    };


    const toggleDropdown = () => {
        if (!disabled) setIsOpen(prev => !prev);
    };


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

    const renderTreeSelectContainer = (variantType) => (
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
                />
            )}
        </div>
    );

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
                />
            )}
        </div>
    );


    return (
        <div className='col-lg-6 col-md-12 col-sm-12'>
            <div className='card-section'>
                <div className='card-body'>
                    <p>{label}</p>
                    {showStatus ? (
                        status.map((s) => renderShowStatus(s))
                    ) : showAllVariant ? (
                        variant.map((v) => renderTreeSelectContainer(v))
                    ) : (
                        renderTreeSelectContainer(defaultVariant)
                    )}
                </div>
            </div>
        </div>
    );
};

export default TreeSelectBase;
