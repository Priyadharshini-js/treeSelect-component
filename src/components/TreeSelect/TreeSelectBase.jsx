import React, { useState, useRef, useEffect } from 'react'
import TreeDropdown from './TreeDropdown'
import { treeData } from './config/treeData'

const TreeSelectBase = ({ placeholder = "Please select", multiple = false, disabled = false, onChange, label, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(multiple ? [] : null);
    const containerRef = useRef(null);
    // const data = treeData.basic_selection;

    const treeDataSet = data || treeData.basic_selection;


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

    // Flatten all levels to match selected values with their titles
    const flattenData = (nodes) => {
        return nodes.flatMap(node => {
            const children = node.children ? flattenData(node.children) : [];
            return [node, ...children];
        });
    };

    const flatData = flattenData(treeDataSet);

    const selectedLabel = multiple
        ? flatData.filter(item => selected.includes(item.value)).map(i => (typeof i.title === 'string' ? i.title : '')).join(', ')
        : flatData.find(item => item.value === selected)?.title || placeholder;

    return (
        <div className='col-lg-6 col-md-6 col-sm-12'>
            <div className='card-section'>
                <div className='card-body'>
                    <p>{label}</p>
                    <div ref={containerRef} className={`tree-select-container ${disabled ? 'disabled' : ''}`}>
                        <div className="tree-select-input" onClick={toggleDropdown}>
                            {selectedLabel || placeholder}
                            <span className="arrow">{isOpen ? '▲' : '▼'}</span>
                        </div>
                        {isOpen && (
                            <TreeDropdown
                                data={treeDataSet}
                                selected={selected}
                                onSelect={handleSelect}
                                multiple={multiple}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeSelectBase;
